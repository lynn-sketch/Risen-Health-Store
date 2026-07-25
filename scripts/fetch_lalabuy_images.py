"""Download clear product images from lalabuystore for matching Risen products only."""
from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "products" / "lalabuy"
OUT.mkdir(parents=True, exist_ok=True)

HOME = "https://www.lalabuystore.com/"

# Our product id -> keywords that appear in Lalabuy alt/title text
MATCHES: dict[str, list[str]] = {
    "gi-vital": ["gi vital"],
    "kuding-tea": ["kuding"],
    "alkaline-cup": ["alkaline cup"],
    "energy-bracelet": ["energy bracelet"],
    "longvigor": ["longvigor"],
    "cordyceps-coffee": ["codyceps coffee", "cordyceps coffee"],
    "detox-pack": ["detox pack", "wuqing detox"],
    "peptides": ["micro-molecule", "peptide"],
    "male-nouripad": ["men health care pad", "male", "men health"],
    "female-nouripad": ["nourishing health pad", "nourish"],
    "anion-napkin": ["anion sanitary"],
    "anion-liner": ["anion panty"],
    "toothpaste": ["herbal toothpaste", "toothpaste"],
    "immune-plus": ["immune+ capsules", "immune+"],
    "immune-vitale": ["immune vital"],
    "ginseng-cordyceps": ["ginseng cordyceps"],
    "cordyceps": ["cordyceps sinensis capsules"],
    "hypoglycemic": ["hypoglycemic capsules"],
    "vision-vitale": ["vision vitale"],
    "beta-carotene": ["b-carotene", "beta-carotene", "natural b-carotene"],
    "propolis-lecithin": ["propolis"],
    "calcium-powder": ["nutrient calcium powder", "calcium powder"],
    "calcium-iron-zinc": ["calcium iron zinc", "healthway calcium"],
}


def fetch(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; RisenHealthStore/1.0)"},
    )
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", errors="ignore")


def normalize_image_url(url: str) -> str:
    url = url.replace("&amp;", "&")
    if url.startswith("/_next/image"):
        qs = urllib.parse.urlparse(url).query
        raw = urllib.parse.parse_qs(qs).get("url", [""])[0]
        url = urllib.parse.unquote(raw)
    if url.startswith("//"):
        url = "https:" + url
    # Prefer larger size if CDN supports it
    url = url.replace("!400x400", "!800x800").replace("!500x500", "!800x800")
    return url


def download(url: str, dest: Path) -> None:
    url = normalize_image_url(url)
    if not url.startswith("http"):
        raise ValueError(f"unsupported url: {url}")
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; RisenHealthStore/1.0)"},
    )
    with urllib.request.urlopen(req, timeout=40) as res:
        dest.write_bytes(res.read())


def extract_pairs(html: str) -> list[tuple[str, str]]:
    """Return (alt_or_nearby_text, image_url) pairs."""
    pairs: list[tuple[str, str]] = []

    # img tags with alt
    for m in re.finditer(
        r'<img[^>]+(?:src|data-src)="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"[^>]*>',
        html,
        flags=re.I,
    ):
        tag = m.group(0)
        src = m.group(1)
        alt_m = re.search(r'alt="([^"]*)"', tag, flags=re.I)
        alt = alt_m.group(1) if alt_m else ""
        # Also grab surrounding text snippet
        start = max(0, m.start() - 250)
        end = min(len(html), m.end() + 250)
        context = re.sub(r"<[^>]+>", " ", html[start:end])
        context = re.sub(r"\s+", " ", context).strip()
        label = f"{alt} {context}".lower()
        pairs.append((label, src))

    # JSON-ish product blobs if present
    for m in re.finditer(
        r'"(?:name|title|alt)"\s*:\s*"([^"]+)"[^}]{0,400}"(?:image|img|src|thumbnail)"\s*:\s*"(https?://[^"]+)"',
        html,
        flags=re.I,
    ):
        pairs.append((m.group(1).lower(), m.group(2)))

    return pairs


def score(label: str, keywords: list[str]) -> int:
    best = 0
    for kw in keywords:
        if kw in label:
            best = max(best, len(kw))
    return best


def main() -> None:
    print("Fetching homepage…")
    html = fetch(HOME)
    pairs = extract_pairs(html)
    print(f"Found {len(pairs)} image contexts")

    # Try products listing pages if available
    for path in (
        "/norland-products-uganda",
        "/categories/supplements",
        "/categories/herbal-products",
    ):
        try:
            print(f"Fetching {path}…")
            more = fetch(HOME.rstrip("/") + path)
            pairs.extend(extract_pairs(more))
        except Exception as exc:  # noqa: BLE001
            print(f"  skip {path}: {exc}")

    chosen: dict[str, tuple[int, str]] = {}
    for label, src in pairs:
        if "faiusr.com" not in src and "iherb" in src:
            continue  # skip unrelated iHerb stock photos
        for pid, keywords in MATCHES.items():
            s = score(label, keywords)
            if s == 0:
                continue
            prev = chosen.get(pid)
            if not prev or s > prev[0]:
                chosen[pid] = (s, src)

    mapping: dict[str, str] = {}
    for pid, (_score, url) in sorted(chosen.items()):
        ext = ".webp" if ".webp" in url.lower() else ".jpg"
        dest = OUT / f"{pid}{ext}"
        try:
            download(url, dest)
            mapping[pid] = f"/products/lalabuy/{dest.name}"
            print(f"OK  {pid} <- {url[:80]}...")
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL {pid}: {exc}")

    (OUT / "mapping.json").write_text(json.dumps(mapping, indent=2), encoding="utf-8")
    print(f"\nDownloaded {len(mapping)} / {len(MATCHES)} matching products")
    missing = [pid for pid in MATCHES if pid not in mapping]
    if missing:
        print("Missing:", ", ".join(missing))


if __name__ == "__main__":
    main()
