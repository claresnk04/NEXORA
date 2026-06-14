"""
NEXBOARD — Responsive Fix Script
Membuat tampilan HP, Tablet, dan Laptop
Jalankan: python fix_responsive.py
"""

# ══════════════════════════════════════════
# CSS RESPONSIVE GURU
# ══════════════════════════════════════════
RESPONSIVE_GURU = """
/* ════════════════════════════════
   RESPONSIVE — NEXBOARD GURU
   HP < 768px | Tablet 768-1050px | Laptop 1050-1300px
   ════════════════════════════════ */

/* ── Laptop kecil (≤1300px) ── */
@media(max-width:1300px){
  .sg{grid-template-columns:repeat(2,1fr)}
  .g3{grid-template-columns:1fr}
  .g3c{grid-template-columns:1fr 1fr}
  .ncg{grid-template-columns:repeat(4,1fr)}
  .g4{grid-template-columns:repeat(2,1fr)}
}

/* ── Tablet (≤1050px) ── */
@media(max-width:1050px){
  :root{--sidebar-w:220px}
  .sb-sec,.sb-badge{display:none}
  .sb-item{padding:9px 14px;font-size:12px}
  .content{padding:16px 18px}
  .sg{grid-template-columns:repeat(2,1fr);gap:10px}
  .g2,.g3{grid-template-columns:1fr}
  .g4{grid-template-columns:repeat(2,1fr)}
  .top{padding:0 18px}
  .top-search{width:180px}
  .sc-val{font-size:22px}
  .tbl th:nth-child(4),.tbl td:nth-child(4),
  .tbl th:nth-child(5),.tbl td:nth-child(5),
  .tbl th:nth-child(6),.tbl td:nth-child(6){display:none}
}

/* ── HP (≤768px) ── */
@media(max-width:768px){
  /* Sembunyikan sidebar, tampilkan bottom nav */
  .sb{
    position:fixed;bottom:0;left:0;right:0;top:auto;
    width:100%!important;height:60px;
    flex-direction:row;z-index:100;
    border-top:1px solid rgba(255,255,255,.1);
    box-shadow:0 -4px 20px rgba(0,0,0,.2);
  }
  .sb-logo,.sb-nav .sb-sec,.sb-user,.sb-badge,
  .sb-name,.sb-sub,.sb-uname,.sb-urole{display:none!important}
  .sb-nav{
    flex-direction:row!important;
    display:flex!important;
    flex:1;overflow:hidden;padding:0;
    align-items:stretch;
  }
  .sb-item{
    flex:1;flex-direction:column;
    padding:6px 4px!important;gap:3px!important;
    border-left:none!important;
    border-top:3px solid transparent;
    justify-content:center;align-items:center;
    font-size:9px!important;
  }
  .sb-item i{font-size:20px!important;margin:0!important}
  .sb-item.on{
    border-left:none!important;
    border-top-color:var(--gold)!important;
    background:rgba(245,166,35,.13)!important;
  }
  /* Tampilkan label teks di bawah ikon */
  .sb-item::after{
    content:attr(data-label);
    font-size:9px;font-weight:600;
    color:rgba(255,255,255,.5);
    line-height:1;display:block;
  }
  .sb-item.on::after{color:var(--gold)}

  /* Main area: kasih padding bawah untuk bottom nav */
  .main{
    margin-left:0!important;
    height:calc(100vh - 60px)!important;
    width:100%!important;
  }
  html,body{overflow:hidden}

  /* Topbar */
  .top{padding:0 14px;height:52px}
  .top-title h1{font-size:14px}
  .top-title p{display:none}
  .top-search{display:none}

  /* Content */
  .content{padding:14px;padding-bottom:20px}

  /* Semua grid jadi 1 kolom */
  .sg,.g2,.g3,.g3c,.g4{
    grid-template-columns:1fr!important;
    gap:10px!important;
  }

  /* Stat cards horizontal scroll */
  .sg{
    display:flex!important;
    flex-direction:row!important;
    overflow-x:auto!important;
    gap:10px!important;
    padding-bottom:4px;
    scrollbar-width:none;
  }
  .sg::-webkit-scrollbar{display:none}
  .sc{min-width:160px;flex-shrink:0}
  .sc-val{font-size:22px}

  /* Panel */
  .pnl{padding:14px}

  /* NexCard gallery */
  .ncg{
    grid-template-columns:repeat(3,1fr)!important;
    gap:8px!important;
  }

  /* Tabel siswa — sembunyikan kolom kurang penting */
  .tbl th:nth-child(3),.tbl td:nth-child(3),
  .tbl th:nth-child(5),.tbl td:nth-child(5),
  .tbl th:nth-child(6),.tbl td:nth-child(6),
  .tbl th:nth-child(8),.tbl td:nth-child(8){display:none}
  .tbl th,.tbl td{padding:8px 6px;font-size:11px}

  /* Modal */
  .modal{width:95vw!important;max-height:90vh!important}

  /* NexBot panel */
  .nbh{padding:10px 12px}
  .nbt{font-size:12px}

  /* Page tabs */
  .ptabs{width:100%}
  .ptab{flex:1;text-align:center;padding:7px 8px;font-size:11px}

  /* Alert */
  .alert{font-size:11.5px;padding:9px 12px}

  /* Leaderboard XP badge */
  .lbxp{font-size:11px;padding:2px 7px}

  /* Notif panel */
  .notif-panel{width:calc(100vw - 28px)!important;right:14px!important}
}

/* ── HP kecil (≤480px) ── */
@media(max-width:480px){
  .sg{gap:8px}
  .sc{min-width:140px;padding:14px}
  .sc-val{font-size:20px}
  .ncg{grid-template-columns:repeat(2,1fr)!important}
  .content{padding:10px}
  .top-title h1{font-size:13px}
}
"""

# ══════════════════════════════════════════
# CSS RESPONSIVE ORANGTUA
# ══════════════════════════════════════════
RESPONSIVE_ORTU = """
/* ════════════════════════════════
   RESPONSIVE — NEXBOARD ORANG TUA
   HP < 768px | Tablet 768-1050px | Laptop 1050-1300px
   ════════════════════════════════ */

/* ── Laptop kecil (≤1300px) ── */
@media(max-width:1300px){
  .sg{grid-template-columns:repeat(2,1fr)}
  .g3{grid-template-columns:1fr}
  .g4{grid-template-columns:repeat(2,1fr)}
}

/* ── Tablet (≤1050px) ── */
@media(max-width:1050px){
  :root{--sb:200px}
  .child-sw{margin:10px 12px 0;padding:8px 10px}
  .child-name{font-size:11.5px}
  .sb-sec,.sb-badge{display:none}
  .sb-item{padding:9px 12px;font-size:12px}
  .content{padding:16px 18px}
  .sg{grid-template-columns:repeat(2,1fr);gap:10px}
  .g2,.g3{grid-template-columns:1fr}
  .g4{grid-template-columns:repeat(2,1fr)}
  .top{padding:0 18px}
  .top-search{width:170px}
  .hero-card{padding:18px 20px;gap:16px}
  .hero-name{font-size:17px}
  .hstat{padding:8px 12px;min-width:54px}
  .hstat-val{font-size:15px}
}

/* ── HP (≤768px) ── */
@media(max-width:768px){
  /* Bottom nav menggantikan sidebar */
  .sb{
    position:fixed;bottom:0;left:0;right:0;top:auto;
    width:100%!important;height:60px;
    flex-direction:row;z-index:100;
    border-top:1px solid rgba(255,255,255,.1);
    box-shadow:0 -4px 20px rgba(0,0,0,.2);
  }
  .sb-logo,.sb-nav .sb-sec,.sb-user,.sb-badge,
  .sb-name,.sb-sub,.sb-uname,.sb-urole,
  .child-sw,.child-name,.child-class,.child-arr{display:none!important}
  .sb-nav{
    flex-direction:row!important;display:flex!important;
    flex:1;overflow:hidden;padding:0;align-items:stretch;
  }
  .sb-item{
    flex:1;flex-direction:column;
    padding:6px 4px!important;gap:3px!important;
    border-left:none!important;border-top:3px solid transparent;
    justify-content:center;align-items:center;font-size:9px!important;
  }
  .sb-item i{font-size:20px!important;margin:0!important}
  .sb-item.on{
    border-left:none!important;border-top-color:var(--gold)!important;
    background:rgba(245,166,35,.13)!important;
  }
  .sb-item::after{
    content:attr(data-label);font-size:9px;font-weight:600;
    color:rgba(255,255,255,.5);line-height:1;display:block;
  }
  .sb-item.on::after{color:var(--gold)}

  .main{
    margin-left:0!important;
    height:calc(100vh - 60px)!important;
    width:100%!important;
  }

  /* Hero card responsif */
  .hero-card{
    padding:16px;flex-direction:column;gap:12px;
    border-radius:14px;
  }
  .hero-ava{width:52px;height:52px;font-size:18px}
  .hero-name{font-size:16px}
  .hero-meta{font-size:10.5px}
  .hero-stats{gap:8px;margin-top:10px;flex-wrap:wrap}
  .hstat{padding:7px 10px;min-width:52px}
  .hstat-val{font-size:14px}
  .hstat-lbl{font-size:8px}
  .hero-mood{font-size:36px!important;position:absolute;top:16px;right:16px}
  .hero-card{position:relative;overflow:hidden}

  /* Topbar */
  .top{padding:0 14px;height:52px}
  .top-title h1{font-size:14px}
  .top-title p{display:none}
  .top-search{display:none}

  /* Content */
  .content{padding:12px;padding-bottom:20px}

  /* Grid jadi 1 kolom */
  .sg,.g2,.g3,.g3c,.g4{grid-template-columns:1fr!important;gap:10px!important}

  /* Stat cards horizontal scroll */
  .sg{
    display:flex!important;flex-direction:row!important;
    overflow-x:auto!important;gap:10px!important;
    padding-bottom:4px;scrollbar-width:none;
  }
  .sg::-webkit-scrollbar{display:none}
  .sc{min-width:155px;flex-shrink:0}
  .sc-val{font-size:22px}

  /* Panel */
  .pnl{padding:14px}

  /* NexCard */
  .ncg{grid-template-columns:repeat(3,1fr)!important;gap:8px!important}

  /* Jurnal cards */
  .jcard{padding:11px}
  .jcard-txt{font-size:11.5px}

  /* Porto */
  .porto-card{padding:12px}

  /* AI bubble */
  .ai-bubble{flex-direction:column;gap:8px}

  /* Page tabs */
  .ptabs{width:100%;overflow-x:auto;flex-wrap:nowrap}
  .ptab{flex-shrink:0;padding:7px 12px;font-size:11px}

  /* Notif panel */
  .notif-panel{width:calc(100vw - 28px)!important;right:14px!important}

  /* Child modal */
  #child-modal>div{width:calc(100vw - 32px)!important}
}

/* ── HP kecil (≤480px) ── */
@media(max-width:480px){
  .hero-card{padding:14px}
  .hero-name{font-size:14px}
  .hstat{padding:6px 8px;min-width:46px}
  .hstat-val{font-size:13px}
  .hero-stats{gap:6px}
  .sc{min-width:140px;padding:12px}
  .ncg{grid-template-columns:repeat(2,1fr)!important}
  .content{padding:10px}
  .pnl{padding:12px}
  .top-title h1{font-size:13px}
}
"""

# ══════════════════════════════════════════
# JS TAMBAHAN — label bottom nav
# ══════════════════════════════════════════
JS_BOTTOM_NAV_GURU = """
// Tambah data-label ke sidebar items untuk bottom nav HP
(function(){
  const labels = {
    'dashboard':'Home','siswa':'Siswa','analitik':'Analitik',
    'mood':'Mood','nexcard':'Kartu','nexbot':'NexBot',
    'laporan':'Laporan','rekomendasi':'AI','kalender':'Kalender','pengaturan':'Atur'
  };
  document.querySelectorAll('.sb-item[data-sec]').forEach(el=>{
    const sec = el.dataset.sec;
    if(labels[sec]) el.setAttribute('data-label', labels[sec]);
  });
})();
"""

JS_BOTTOM_NAV_ORTU = """
// Tambah data-label ke sidebar items untuk bottom nav HP
(function(){
  const labels = {
    'overview':'Beranda','perkembangan':'Grafik','materi':'Materi',
    'mood':'Mood','nexcard':'Kartu','jurnal':'Jurnal',
    'portofolio':'Porto','observasi':'Obs','laporan':'Laporan',
    'rekomendasi':'AI','kalender':'Jadwal','pengaturan':'Atur'
  };
  document.querySelectorAll('.sb-item[data-sec]').forEach(el=>{
    const sec = el.dataset.sec;
    if(labels[sec]) el.setAttribute('data-label', labels[sec]);
  });
})();
"""

# ══════════════════════════════════════════
# PATCH FUNCTION
# ══════════════════════════════════════════
def patch_file(path, responsive_css, js_extra):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()

        # ── Hapus media query lama yang akan diganti ──
        import re

        # Hapus blok @media lama (1300px dan 1050px)
        html = re.sub(
            r'@media\(max-width:1300px\)\{[^}]+\}',
            '', html
        )
        html = re.sub(
            r'@media\(max-width:1050px\)\{[^}]+\}',
            '', html
        )

        # ── Sisipkan CSS responsive baru sebelum </style> pertama ──
        html = html.replace('</style>', responsive_css + '\n</style>', 1)

        # ── Fix: html,body jangan overflow:hidden di mobile ──
        html = html.replace(
            'html,body{height:100%;overflow:hidden;min-width:0}',
            'html,body{height:100%;overflow:hidden;min-width:0}'
        )

        # ── Fix body: tambah padding-bottom untuk bottom nav di mobile ──
        # Sisipkan di dalam </style> terakhir
        mobile_body_fix = """
@media(max-width:768px){
  body{overflow:hidden}
  .content{overflow-y:auto;-webkit-overflow-scrolling:touch}
}
"""
        html = html.replace('</style>', mobile_body_fix + '\n</style>', 1)

        # ── Tambah JS label bottom nav sebelum </script> terakhir ──
        # Cari </body> dan sisipkan sebelumnya
        html = html.replace('</body>', f'<script>{js_extra}</script>\n</body>')

        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)

        # Verifikasi
        has_768  = '@media(max-width:768px)' in html
        has_480  = '@media(max-width:480px)' in html
        has_1050 = '@media(max-width:1050px)' in html
        has_label = 'data-label' in html

        print(f"\n✓ {path}")
        print(f"  Breakpoint 768px (HP)     : {'✓' if has_768 else '✗'}")
        print(f"  Breakpoint 480px (HP kecil): {'✓' if has_480 else '✗'}")
        print(f"  Breakpoint 1050px (Tablet) : {'✓' if has_1050 else '✗'}")
        print(f"  Bottom nav label           : {'✓' if has_label else '✗'}")

    except FileNotFoundError:
        print(f"\n✗ {path} — FILE TIDAK DITEMUKAN")
        print(f"  Pastikan path sudah benar!")


# ══════════════════════════════════════════
# JALANKAN
# ══════════════════════════════════════════

# Sesuaikan path dengan struktur folder kamu
# Berdasarkan screenshot VS Code: guru/guru.html dan ortu/ortu.html
FILES = [
    ('guru/guru.html',   RESPONSIVE_GURU, JS_BOTTOM_NAV_GURU),
    ('ortu/ortu.html',   RESPONSIVE_ORTU, JS_BOTTOM_NAV_ORTU),
]

print("NEXBOARD — Responsive Fix")
print("=" * 40)

for path, css, js in FILES:
    patch_file(path, css, js)

print("\n" + "=" * 40)
print("Selesai! Test di browser:")
print("  HP     → F12 → Toggle Device (Ctrl+Shift+M)")
print("  Tablet → pilih iPad / 768px")
print("  HP     → pilih iPhone / 375px")