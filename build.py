#!/usr/bin/env python3
"""Bundle The Library of Ages into a single self-contained HTML file."""
import re, os

ROOT = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(ROOT, "index.html"), "r", encoding="utf-8") as f:
    html = f.read()

def inline(match):
    src = match.group(1)
    path = os.path.join(ROOT, src)
    with open(path, "r", encoding="utf-8") as f:
        js = f.read()
    # </script> inside JS strings would break the document; guard it
    js = js.replace("</script>", "<\\/script>")
    return "<script>\n" + js + "\n</script>"

out = re.sub(r'<script src="([^"]+)"></script>', inline, html)
os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
dest = os.path.join(ROOT, "dist", "library-of-ages.html")
with open(dest, "w", encoding="utf-8") as f:
    f.write(out)
print("wrote", dest, f"{os.path.getsize(dest)/1024:.0f} KB")
