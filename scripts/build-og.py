"""Generate 1200x630 Open Graph images into public/og/. Run: python scripts/build-og.py

v7 style: black background, Boostov blue glow, gold price. Prices are read from
src/config/pricing.ts so the cards never drift from the site.
"""
import pathlib, re
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"
OUT.mkdir(exist_ok=True)
SRC = ROOT / "assets" / "products-src"
LOGO = ROOT / "public" / "boostov-logo.png"
DISPLAY = str(ROOT / "assets" / "fonts" / "bricolage-720.ttf")
BOLD = "C:/Windows/Fonts/segoeuib.ttf"
REG = "C:/Windows/Fonts/segoeui.ttf"
BG, BLUE, CYAN, NAVY, GOLD, WHITE, MUTED = (7, 9, 15), (0, 96, 248), (0, 180, 250), (12, 38, 88), (232, 181, 74), (242, 245, 250), (169, 179, 196)

pricing = (ROOT / "src" / "config" / "pricing.ts").read_text(encoding="utf-8")
num = lambda pattern: re.search(pattern, pricing, re.S).group(1)
grow = num(r"grow:\s*\{\s*stand:\s*(\d+)")
pro = num(r"pro:\s*\{\s*carte:\s*(\d+)")
connect_carte = num(r"connect:\s*\{\s*carte:\s*(\d+)")
kit5 = num(r"kit5:\s*\{[^}]*price:\s*(\d+)")

# name: (title, subtitle, gold line, visual)
PAGES = {
    "home": ("La tech qui fait grandir votre business.", "Un tap. Vos clients reviennent.", None, "screen"),
    "grow": ("Faites revenir vos clients, en un tap.", "Boostov Grow v2 · Stand fidélité", f"{grow} DH · Installation incluse", "screen"),
    "pro": ("Votre carte pro. Votre page à vous.", "Boostov Pro · Carte NFC", f"{pro} DH", "procard"),
    "connect": ("La page de votre commerce, en un tap.", "Boostov Connect · Carte ou stand", f"Dès {connect_carte} DH", "connect-card.png"),
    "revendeurs": ("Devenir revendeur NFC Boostov.", "Réservé aux 18 ans et plus.", f"Kits dès {kit5} DH", "kit-cards.jpg"),
    "faq": ("Questions fréquentes.", "Fidélité, cartes NFC, prix, commande.", None, "screen"),
    "blog": ("Guides pour les commerces.", "Fidélité, avis Google, NFC et QR code.", None, "screen"),
    "blog-avis": ("Demander des avis Google dans les règles.", "Guide Boostov", None, "screen"),
    "blog-nfc-qr": ("Carte NFC ou QR code ?", "Guide Boostov", None, "connect-card.png"),
    "blog-lien-avis": ("Créer un lien d’avis Google.", "Guide Boostov", None, "screen"),
}


def wrap(draw, text, font, width):
    lines, line = [], ""
    for word in text.split():
        test = f"{line} {word}".strip()
        if draw.textlength(test, font=font) <= width:
            line = test
        else:
            lines.append(line)
            line = word
    return lines + [line]


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, *img.size), radius, fill=255)
    return mask


def phone_with(im, shot, x, y, w):
    """Paste a screenshot inside a simple phone frame."""
    h = round(w * 19 / 9)
    frame = Image.new("RGB", (w, h), (24, 28, 38))
    pad = 12
    sw, sh = w - 2 * pad, h - 2 * pad
    s = shot.resize((sw, round(shot.height * sw / shot.width)), Image.LANCZOS).crop((0, 0, sw, sh))
    screen = Image.new("RGB", (sw, sh), (245, 242, 237))
    screen.paste(s, (0, 30))
    frame.paste(screen, (pad, pad), rounded(screen, 40))
    im.paste(frame, (x, y), rounded(frame, 50))
    ImageDraw.Draw(im).rounded_rectangle((x + w // 2 - 45, y + 24, x + w // 2 + 45, y + 48), 12, fill=(0, 0, 0))


for name, (title, sub, gold, visual) in PAGES.items():
    im = Image.new("RGB", (1200, 630), BG)
    glow = Image.new("RGB", (1200, 630), BG)
    gd = ImageDraw.Draw(glow)
    gd.ellipse((760, -120, 1320, 520), fill=BLUE)
    gd.ellipse((600, 300, 1000, 760), fill=NAVY)
    im = Image.blend(im, glow.filter(ImageFilter.GaussianBlur(150)), 0.6)

    if visual == "screen":
        phone_with(im, Image.open(SRC / "grow-v2-card.png").convert("RGB"), 840, 70, 250)
    elif visual == "procard":
        card = Image.new("RGBA", (420, 265), (0, 0, 0, 0))
        cd = ImageDraw.Draw(card)
        cd.rounded_rectangle((0, 0, 419, 264), 26, fill=(16, 17, 22, 255), outline=(60, 62, 70, 255), width=2)
        cd.text((36, 196), "Boostov", font=ImageFont.truetype(DISPLAY, 34), fill=GOLD)
        cd.ellipse((330, 36, 384, 90), outline=GOLD, width=4)
        card = card.rotate(-8, expand=True, resample=Image.BICUBIC)
        im.paste(card, (720, 170), card)
    else:
        p = Image.open(SRC / visual).convert("RGB")
        # Whole photo, never cropped (fit inside 400x480).
        scale = min(400 / p.width, 480 / p.height)
        p = p.resize((round(p.width * scale), round(p.height * scale)), Image.LANCZOS)
        im.paste(p, (960 - p.width // 2, 315 - p.height // 2), rounded(p, 28))

    d = ImageDraw.Draw(im)
    logo = Image.open(LOGO).convert("RGBA").resize((56, 56))
    tile = Image.new("RGB", (56, 56), (255, 255, 255))
    tile.paste(logo, (0, 0), logo)
    im.paste(tile, (64, 60), rounded(tile, 14))
    d.text((136, 62), "boostov", font=ImageFont.truetype(DISPLAY, 40), fill=WHITE)

    tf = ImageFont.truetype(DISPLAY, 64)
    lines = wrap(d, title, tf, 640)
    y = 300 - len(lines) * 36
    for line in lines:
        d.text((64, y), line, font=tf, fill=WHITE)
        y += 70
    d.text((64, y + 18), sub, font=ImageFont.truetype(REG, 30), fill=MUTED)
    if gold:
        gf = ImageFont.truetype(BOLD, 28)
        gw = d.textlength(gold, font=gf)
        d.rounded_rectangle((64, 520, 64 + gw + 44, 572), 26, fill=GOLD)
        d.text((86, 527), gold, font=gf, fill=BG)
    else:
        d.text((64, 530), "Commander sur WhatsApp · Agadir, Maroc", font=ImageFont.truetype(BOLD, 24), fill=GOLD)
    im.save(OUT / f"{name}.jpg", quality=85, optimize=True, progressive=True)

for old in ("produits", "stands"):
    (OUT / f"{old}.jpg").unlink(missing_ok=True)
print(sorted(x.name for x in OUT.iterdir()))
