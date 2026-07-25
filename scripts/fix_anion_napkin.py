"""Find a distinct Anion Sanitary Napkin image on Lalabuy (not panty liner)."""
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/products/lalabuy/anion-napkin.jpg"

HOME = "https://www.lalabuystore.com/"


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", errors="ignore")


def normalize(url: str) -> str:
    url = url.replace("&amp;", "&")
    if url.startswith("/_next/image"):
        qs = urllib.parse.urlparse(url).query
        raw = urllib.parse.parse_qs(qs).get("url", [""])[0]
        url = urllib.parse.unquote(raw)
    return url.replace("!400x400", "!800x800")


html = fetch(HOME)
# Prefer contexts that mention sanitary napkin but NOT panty liner
candidates: list[tuple[int, str]] = []
for m in re.finditer(
    r'<img[^>]+(?:src|data-src)="([^"]+)"[^>]*>',
    html,
    flags=re.I,
):
    tag = m.group(0)
    src = m.group(1)
    start = max(0, m.start() - 350)
    end = min(len(html), m.end() + 350)
    ctx = re.sub(r"<[^>]+>", " ", html[start:end]).lower()
    if "sanitary" in ctx and "napkin" in ctx and "panty" not in ctx:
        candidates.append((ctx.count("sanitary") + ctx.count("napkin"), normalize(src)))

print("candidates", len(candidates))
if not candidates:
    raise SystemExit("No distinct sanitary napkin image found")

candidates.sort(reverse=True)
url = candidates[0][1]
print("using", url)
req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
with urllib.request.urlopen(req, timeout=40) as res:
    data = res.read()
OUT.write_bytes(data)
print("wrote", OUT, "bytes", len(data))
