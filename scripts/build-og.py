"""Generate 1200x630 Open Graph images into public/og/. Run: python scripts/build-og.py

Prices are read from src/config/pricing.ts so the cards never drift from the site.
"""
import pathlib, re
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og"
OUT.mkdir(exist_ok=True)
SRC = ROOT / "assets" / "products-src"
LOGO = ROOT / "public" / "img" / "boostov-logo.webp"
BOLD = "C:/Windows/Fonts/segoeuib.ttf"
REG = "C:/Windows/Fonts/segoeui.ttf"
INK, BLUE, WHITE, MUTED = (11, 18, 32), (40, 100, 240), (255, 255, 255), (169, 180, 198)

pricing = (ROOT / "src" / "config" / "pricing.ts").read_text(encoding="utf-8")
num = lambda pattern: re.search(pattern, pricing, re.S).group(1)
connect_carte = num(r"connect:\s*\{\s*carte:\s*(\d+)")
kit5 = num(r"kit5:\s*\{[^}]*price:\s*(\d+)")

PAGES = {
    "home": ("Cartes et stands NFC pour commerces", f"Contact, avis Google et fidélité. Dès {connect_carte} DH.", "grow-stand.jpg"),
    "produits": ("Connect ou Grow ?", "Comparatif des cartes et stands NFC Boostov.", "connect-stand.jpg"),
    "stands": ("Stand NFC personnalisé", "Votre logo, vos couleurs, NFC + QR code.", "grow-stand-avis.jpg"),
    "revendeurs": ("Devenir revendeur NFC", f"Kits Boostov dès {kit5} DH. Réservé aux 18 ans et plus.", "kit-cards.jpg"),
    "faq": ("Questions fréquentes", "Prix, NFC ou QR, personnalisation.", "connect-stand.jpg"),
    "blog": ("Guides pour les commerces", "Avis Google, NFC et QR code.", "grow-stand-avis.jpg"),
    "blog-avis": ("Demander des avis Google dans les règles", "Guide Boostov", "grow-stand-avis.jpg"),
    "blog-nfc-qr": ("Carte NFC ou QR code ?", "Guide Boostov", "connect-stand.jpg"),
    "blog-lien-avis": ("Créer un lien d’avis Google", "Guide Boostov", "grow-stand.jpg"),
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


for name, (title, sub, photo) in PAGES.items():
    im = Image.new("RGB", (1200, 630), INK)
    glow = Image.new("RGB", (1200, 630), INK)
    ImageDraw.Draw(glow).ellipse((700, -300, 1500, 500), fill=BLUE)
    im = Image.blend(im, glow.filter(ImageFilter.GaussianBlur(160)), 0.55)

    # Product photo on the right, rounded.
    p = Image.open(SRC / photo).convert("RGB")
    pw, ph = 400, 500
    scale = max(pw / p.width, ph / p.height)
    p = p.resize((round(p.width * scale), round(p.height * scale)), Image.LANCZOS)
    p = p.crop(((p.width - pw) // 2, (p.height - ph) // 2, (p.width - pw) // 2 + pw, (p.height - ph) // 2 + ph))
    mask = Image.new("L", (pw, ph), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, pw, ph), 28, fill=255)
    im.paste(p, (740, 65), mask)
    if photo != "kit-cards.jpg":
        # Same honesty label as on the site: these photos are demo mockups.
        lf = ImageFont.truetype(BOLD, 18)
        label = "Visuel de démonstration"
        lw = ImageDraw.Draw(im).textlength(label, font=lf)
        ImageDraw.Draw(im).rounded_rectangle((756, 81, 756 + lw + 24, 81 + 32), 16, fill=(255, 255, 255))
        ImageDraw.Draw(im).text((768, 85), label, font=lf, fill=(95, 107, 122))

    d = ImageDraw.Draw(im)
    logo = Image.open(LOGO).convert("RGBA").resize((56, 56))
    im.paste(logo, (64, 64), logo)
    d.text((136, 70), "boostov", font=ImageFont.truetype(BOLD, 36), fill=WHITE)
    d.text((136 + d.textlength("boostov", font=ImageFont.truetype(BOLD, 36)), 70), ".ma", font=ImageFont.truetype(BOLD, 36), fill=(143, 176, 255))

    tf = ImageFont.truetype(BOLD, 62)
    lines = wrap(d, title, tf, 620)
    y = 330 - len(lines) * 36
    for line in lines:
        d.text((64, y), line, font=tf, fill=WHITE)
        y += 74
    d.text((64, y + 16), sub, font=ImageFont.truetype(REG, 30), fill=MUTED)
    d.text((64, 548), "Commande sur WhatsApp · Maroc", font=ImageFont.truetype(BOLD, 24), fill=(143, 176, 255))
    im.save(OUT / f"{name}.jpg", quality=85, optimize=True, progressive=True)

print(sorted(x.name for x in OUT.iterdir()))
