"""
NEXBOARD — Layout Fix Script
Jalankan di folder yang sama dengan file HTML:
  python fix_layout.py
"""

import re

def fix_html(html):
    # 1. html,body
    html = html.replace(
        'html,body{height:100%;overflow:hidden}',
        'html,body{height:100%;overflow:hidden;min-width:0}'
    )

    # 2. body
    for old in [
        "body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--txt);display:flex}",
    ]:
        html = html.replace(old, old.replace('display:flex}', 'display:flex;min-width:0;overflow:hidden}'))

    # 3. .main — tambah width:0 (fix utama flex child melar)
    html = html.replace(
        '.main{flex:1;display:flex;flex-direction:column;height:100vh;overflow:hidden;min-width:0}',
        '.main{flex:1;display:flex;flex-direction:column;height:100vh;overflow:hidden;min-width:0;width:0}'
    )

    # 4. .content
    html = html.replace(
        '.content{flex:1;overflow-y:auto;padding:24px 28px}',
        '.content{flex:1;overflow-y:auto;padding:24px 28px;min-height:0}'
    )

    # 5. Semua grid
    for col in [
        '1fr 1fr', '1.6fr 1fr', '1fr 1fr 1fr', 'repeat(4,1fr)', 'repeat(4, 1fr)'
    ]:
        for gap in ['14px', '16px']:
            old = f'display:grid;grid-template-columns:{col};gap:{gap};margin-bottom'
            html = html.replace(old, old.replace(';margin-bottom', ';min-width:0;margin-bottom'))

    # 6. .sg stat grid
    html = html.replace(
        '.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}',
        '.sg{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px;min-width:0}'
    )

    # 7. .pnl
    html = html.replace(
        '.pnl{background:var(--bg2);border-radius:var(--r);border:1px solid var(--border);padding:20px;box-shadow:var(--sh)}',
        '.pnl{background:var(--bg2);border-radius:var(--r);border:1px solid var(--border);padding:20px;box-shadow:var(--sh);min-width:0;overflow:hidden}'
    )

    # 8. .sc stat card
    html = html.replace(
        '.sc{background:var(--bg2);border-radius:var(--r);border:1px solid var(--border);padding:18px 20px;box-shadow:var(--sh);transition:transform .2s,box-shadow .2s;cursor:default}',
        '.sc{background:var(--bg2);border-radius:var(--r);border:1px solid var(--border);padding:18px 20px;box-shadow:var(--sh);transition:transform .2s,box-shadow .2s;cursor:default;min-width:0}'
    )

    # 9. .sec
    html = html.replace('.sec{display:none;animation:fadeUp .25s ease}',
                        '.sec{display:none;animation:fadeUp .25s ease;min-width:0}')
    html = html.replace('.sec.on{display:block}',
                        '.sec.on{display:block;min-width:0}')

    # 10. .sb-nav
    html = html.replace(
        '.sb-nav{flex:1;overflow-y:auto;padding:10px 0}',
        '.sb-nav{flex:1;overflow-y:auto;padding:10px 0;min-height:0}'
    )

    # 11. .top-search
    html = html.replace(
        '.top-search{display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:7px 12px;width:220px}',
        '.top-search{display:flex;align-items:center;gap:8px;background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:7px 12px;width:220px;flex-shrink:0}'
    )

    # 12. NexCard grid
    for cols in ['repeat(6,1fr)', 'repeat(5,1fr)']:
        html = html.replace(
            f'.ncg{{display:grid;grid-template-columns:{cols};gap:10px}}',
            f'.ncg{{display:grid;grid-template-columns:{cols};gap:10px;min-width:0}}'
        )

    # 13. .ncrd
    html = html.replace(
        '.ncrd{aspect-ratio:3/4;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;border:1.5px solid transparent;transition:transform .2s,box-shadow .2s;padding:8px 4px}',
        '.ncrd{aspect-ratio:3/4;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;border:1.5px solid transparent;transition:transform .2s,box-shadow .2s;padding:8px 4px;min-width:0;overflow:hidden}'
    )

    # 14. Table layout fix
    html = html.replace(
        '.tbl{width:100%;border-collapse:collapse}',
        '.tbl{width:100%;border-collapse:collapse;table-layout:fixed}'
    )

    # 15. Wrap semua canvas chart dengan div container fixed height
    def wrap_canvas(m):
        cid = m.group(1)
        h   = m.group(2)
        return f'<div style="position:relative;height:{h}px;width:100%"><canvas id="{cid}"></canvas></div>'

    html = re.sub(
        r'<canvas id="(ch-[^"]+)" height="(\d+)"(?:\s+style="[^"]*")?></canvas>',
        wrap_canvas, html
    )

    # 16. Hero card (khusus ortu)
    if '.hero-card{' in html and 'min-width:0' not in html.split('.hero-card{')[1][:50]:
        html = html.replace('.hero-card{', '.hero-card{min-width:0;')

    # 17. Hero stats wrap (khusus ortu)
    html = html.replace(
        '.hero-stats{display:flex;gap:16px;margin-top:14px}',
        '.hero-stats{display:flex;gap:16px;margin-top:14px;flex-wrap:wrap}'
    )

    # 18. hstat flex-shrink (khusus ortu)
    html = html.replace(
        '.hstat{text-align:center;background:rgba(255,255,255,.12);border-radius:10px;padding:10px 16px;min-width:70px}',
        '.hstat{text-align:center;background:rgba(255,255,255,.12);border-radius:10px;padding:10px 16px;min-width:60px;flex-shrink:0}'
    )

    return html


# ── Proses kedua file ──────────────────────────────────────────
# Sesuaikan path dengan struktur folder NEXORA kamu
files = [
    'guru/guru.html',
    'ortu/ortu.html',
]

for fname in files:
    try:
        with open(fname, 'r', encoding='utf-8') as f:
            original = f.read()

        fixed = fix_html(original)

        with open(fname, 'w', encoding='utf-8') as f:
            f.write(fixed)

        # Verifikasi cepat
        canvas_wrapped   = len(re.findall(r'position:relative;height:\d+px', fixed))
        canvas_raw       = len(re.findall(r'<canvas id="ch-[^"]+" height="\d+"', fixed))
        main_fixed       = 'width:0}' in fixed
        pnl_fixed        = 'min-width:0;overflow:hidden}' in fixed

        print(f"\n✓ {fname}")
        print(f"  Canvas terwrap   : {canvas_wrapped} {'✓' if canvas_wrapped > 0 else '✗'}")
        print(f"  Canvas mentah    : {canvas_raw} {'✓' if canvas_raw == 0 else '✗ masih ada!'}")
        print(f"  .main width:0    : {'✓' if main_fixed else '✗'}")
        print(f"  .pnl overflow    : {'✓' if pnl_fixed else '✗'}")

    except FileNotFoundError:
        print(f"\n✗ {fname} — FILE TIDAK DITEMUKAN")
        print(f"  Pastikan file ada di folder yang sama dengan fix_layout.py")

print("\nSelesai! Buka di browser untuk cek hasilnya.")