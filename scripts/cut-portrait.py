"""Cut the hero portrait out of its studio backdrop.

Usage:  python3 scripts/cut-portrait.py path/to/new-photo.jpg
Writes: src/assets/profile-cut.webp  (transparent background)

Works for a photo taken against a plain light backdrop. The backdrop is
found by flooding in from the top and upper side edges, so light areas
inside the subject (a white shirt, for example) are kept.
"""
import sys
from collections import deque
from PIL import Image, ImageFilter

src = sys.argv[1] if len(sys.argv) > 1 else 'src/assets/profile-photo.webp'
im = Image.open(src).convert('RGB')
if max(im.size) > 1600:
    im.thumbnail((1600, 1600), Image.LANCZOS)
W, H = im.size
px = im.load()
# backdrop colour: average of the top corners
samples = [px[x, y] for x in (4, W - 5) for y in (4, 12)]
br, bgc, bb = (sum(s[i] for s in samples) / len(samples) for i in range(3))

def is_bg(x, y):
    r, g, b = px[x, y]
    return abs(r - br) + abs(g - bgc) + abs(b - bb) < 70

seen = bytearray(W * H)
q = deque([(x, 0) for x in range(W)])
for y in range(int(H * 0.62)):
    q.append((0, y)); q.append((W - 1, y))
while q:
    x, y = q.popleft()
    if x < 0 or y < 0 or x >= W or y >= H:
        continue
    i = y * W + x
    if seen[i] or not is_bg(x, y):
        continue
    seen[i] = 1
    q.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

alpha = Image.frombytes('L', (W, H), bytes(0 if s else 255 for s in seen))
alpha = alpha.filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(1.6))
alpha = alpha.point(lambda v: max(0, min(255, int((v / 255 - 0.6) / 0.35 * 255))))
ap = alpha.load()
out = Image.new('RGBA', (W, H))
op = out.load()
for y in range(H):
    for x in range(W):
        r, g, b = px[x, y]
        a = ap[x, y]
        if 0 < a < 250:  # pull backdrop tint out of the edge pixels
            m = max(r, g)
            b = min(b, int(m * 1.05))
        op[x, y] = (r, g, b, a)
out.save('src/assets/profile-cut.webp', quality=92, method=6)
print('wrote src/assets/profile-cut.webp', out.size)
