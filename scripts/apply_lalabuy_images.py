import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
products_file = ROOT / "src" / "data" / "products.ts"
mapping = json.loads((ROOT / "public/products/lalabuy/mapping.json").read_text(encoding="utf-8"))
text = products_file.read_text(encoding="utf-8")

# Ensure mapping uses .jpg
mapping = {k: v.replace(".webp", ".jpg") for k, v in mapping.items()}

for pid, path in mapping.items():
    # Replace only within this product object (until next id or closing of array item)
    pattern = rf"(id: '{re.escape(pid)}',[\s\S]*?\n    image: )(?:'[^']+'|`[^`]+`)"
    text2, n = re.subn(pattern, rf"\1'{path}'", text, count=1)
    if n:
        text = text2
        print("OK", pid)
    else:
        print("MISS", pid)

# Fix anti-pigmenty if it got a wrong Lalabuy image
text = re.sub(
    r"(id: 'anti-pigmenty',[\s\S]*?\n    image: )(?:'[^']+'|`[^`]+`)",
    r"\1'/products/womens-wellness.png'",
    text,
    count=1,
)

# Drop unused E constant if present
text = text.replace("\nconst E = '/products/extracted'\n\n", "\n")

products_file.write_text(text, encoding="utf-8")
print("done")
