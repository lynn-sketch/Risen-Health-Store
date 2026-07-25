"""Crop individual product photos from Norland brochure scans."""
from PIL import Image, ImageDraw
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "products" / "extracted"
OUT.mkdir(parents=True, exist_ok=True)

b1 = Image.open(ROOT / "public/products/brochure-1.png").convert("RGB")
b2 = Image.open(ROOT / "public/products/brochure-2.png").convert("RGB")

# Tighter photo-only crops (left, top, right, bottom)
CROPS_B1 = {
    # Left panel — product photos sit under green titles, left of bullets
    "hypoglycemic": (18, 38, 118, 115),
    "beta-carotene": (30, 135, 105, 205),
    "propolis-lecithin": (18, 228, 120, 300),
    "cordyceps": (22, 322, 115, 395),
    "calcium-iron-zinc": (18, 418, 120, 495),
    # Middle panel
    "healthy-way-herbal": (355, 38, 455, 115),
    "calcium-powder": (355, 135, 470, 210),
    "immune-plus": (355, 228, 465, 305),
    "ginseng-cordyceps": (365, 325, 455, 405),
    "longvigor": (355, 435, 475, 520),
}

CROPS_B2 = {
    # Left column product photos
    "detox-pack": (18, 105, 145, 195),
    "gi-vital": (18, 248, 128, 328),
    "peptides": (18, 388, 140, 468),
    "energy-bracelet": (30, 525, 140, 600),
    # Middle
    "cordyceps-coffee": (335, 38, 450, 118),
    "vision-vitale": (335, 165, 455, 242),
    "anion-liner": (335, 285, 455, 355),
    "anion-napkin": (335, 398, 460, 460),
    "kuding-tea": (335, 508, 455, 595),
    # Right — keep left of benefit text
    "female-nouripad": (660, 38, 770, 118),
    "male-nouripad": (660, 165, 770, 240),
    "toothpaste": (660, 285, 775, 360),
    "immune-vitale": (660, 405, 775, 475),
    "alkaline-cup": (655, 518, 760, 608),
}


def save_crop(img: Image.Image, box: tuple[int, int, int, int], name: str) -> None:
    l, t, r, b = box
    l = max(0, l)
    t = max(0, t)
    r = min(img.width, r)
    b = min(img.height, b)
    crop = img.crop((l, t, r, b))
    # Square-ish pad on cream for cleaner store cards
    side = max(crop.width, crop.height)
    canvas = Image.new("RGB", (side, side), (250, 248, 240))
    ox = (side - crop.width) // 2
    oy = (side - crop.height) // 2
    canvas.paste(crop, (ox, oy))
    canvas = canvas.resize((420, 420), Image.Resampling.LANCZOS)
    path = OUT / f"{name}.png"
    canvas.save(path, optimize=True)
    print(f"{name}: saved {path.name}")


for name, box in CROPS_B1.items():
    save_crop(b1, box, name)
for name, box in CROPS_B2.items():
    save_crop(b2, box, name)

# Debug overlays to retune if needed
for label, img, crops in (("b1", b1, CROPS_B1), ("b2", b2, CROPS_B2)):
    debug = img.copy()
    draw = ImageDraw.Draw(debug)
    for box in crops.values():
        draw.rectangle(box, outline=(225, 163, 42), width=2)
    debug.save(OUT / f"_debug_{label}.png")

print(f"Extracted {len(CROPS_B1) + len(CROPS_B2)} product images")
