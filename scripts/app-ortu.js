(function(){
  // NOTE: app ini dipasang pada halaman ortu/*.html yang memakai <script src="../scripts/app-ortu.js">.
  // Halaman ortu/ortu.html saat ini masih memakai skrip inline (tidak memakai file ini).
  //
  // Porting fitur inti dashboard orang tua (hero + stat cards + chart mingguan/motivasi/durasi/xp + mood widget + kompetensi + aktivitas + rekomendasi + jurnal).
  // Catatan: beberapa halaman ortu lain (analitik/laporan) tetap menggunakan renderer lama berbasis simulasi.
  const state = {
    child: {
      name: 'Arini Ramadhani',
      init: 'AR',
      level: 8,
      xp: 2840,
      streak: 12,
      nexcard: 24,
      badge: 5,
      mood: '😊',
      className: 'V-A',
      semester: 'Semester 2',
      school: 'SDN NEXORA 1',
      year: '2025/2026'
    },
    charts: {
      weekly: {
        labels: ['Sen','Sel','Rab','Kam','Jum','Sab','Min'],
        durationMin: [35,42,20,50,42,15,8],
        missions: [2,3,1,4,3,1,0]
      },
      motivasi: {
        labels: ['Sen','Sel','Rab','Kam','Jum','Sab','Min'],
        motivasiPct: [80,85,70,90,88,60,50],
        partisipasiPct: [75,80,65,85,82,55,45]
      },
      durasi: {
        labels: ['Sen','Sel','Rab','Kam','Jum','Sab','Min'],
        durationMin: [35,42,20,50,42,15,8]
      },
      xp: {
        labels: ['M1 Mei','M2 Mei','M3 Mei','M4 Mei','M1 Jun','M2 Jun'],
        xp: [450,620,580,720,800,840]
      },
      mood2w: {
        labels: ['S','S','R','K','J','M1','M2','S','S','R','K','J','S','M'],
        senang: [1,0,0,1,1,1,0,1,1,0,1,1,0,0],
        fokus: [0,1,0,0,0,0,1,0,0,1,0,0,1,0],
        lelah: [0,0,1,0,0,0,0,0,0,0,0,0,0,1],
        bosan: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      },
      moodD: {
        labels: ['Senang','Fokus','Lelah','Bosan'],
        values: [8,3,2,1]
      }
    },
    competencies: [
      { key:'Matematika', pct:88, color:'#185FA5' },
      { key:'Bahasa Indonesia', pct:92, color:'#4a41b0' },
      { key:'IPA', pct:72, color:'#2d6a0a' },
      { key:'IPS', pct:65, color:'#7c4700' },
      { key:'Seni Budaya', pct:80, color:'#a0226e' }
    ],
    materi: [
      { n:'Matematika', i:'ti-books', b:'#E6F1FB', t:'#185FA5', pct:88, lv:'Level 8', kkm:70 },
      { n:'IPA', i:'ti-flask', b:'#EAF3DE', t:'#2d6a0a', pct:72, lv:'Level 6', kkm:70 },
      { n:'IPS', i:'ti-world', b:'#FAEEDA', t:'#7c4700', pct:65, lv:'Level 5', kkm:65 },
      { n:'B. Indonesia', i:'ti-book', b:'#EEEDFE', t:'#4a41b0', pct:92, lv:'Level 9', kkm:70 },
      { n:'Seni Budaya', i:'ti-palette', b:'#fce7f3', t:'#a0226e', pct:80, lv:'Level 7', kkm:65 }
    ],
    journal: [
      { date:'11 Jun 2026', dot:'#2d6a0a', text:'Arini sangat antusias mengerjakan soal matematika mandiri malam ini. Selesai 2 bab tanpa diingatkan sama sekali.' },
      { date:'10 Jun 2026', dot:'#185FA5', text:'Belajar bersama setelah makan malam. Meminta penjelasan tentang fotosintesis, kemudian mencatat sendiri di buku.' },
      { date:'9 Jun 2026', dot:'#7c4700', text:'Terlihat lelah setelah pulang sekolah. Hanya bisa belajar singkat, tetapi tetap membuka NexFlix sebelum tidur.' }
    ],
    activities: [
      { icon:'ti-trophy', bg:'#EAF3DE', ic:'#2d6a0a', text:'Arini meraih badge <b>"Bintang Bahasa"</b> — streak 18 hari', tm:'2 menit lalu' },
      { icon:'ti-player-play', bg:'#E6F1FB', ic:'#185FA5', text:'Arini menyelesaikan misi NexWorld <b>Matematika Pecahan</b>', tm:'5 menit lalu · +50 XP' },
      { icon:'ti-cards', bg:'#EEEDFE', ic:'#4a41b0', text:'Arini mendapatkan <b>NexCard IPA Baru</b>!', tm:'15 menit lalu' },
      { icon:'ti-flame', bg:'#FAEEDA', ic:'#7c4700', text:'Arini mempertahankan <b>streak 12 hari</b> berturut-turut', tm:'1 jam lalu' }
    ],
    notif: [
      { dot:'#f5a623', title:'Streak Arini 12 hari!', sub:'Pertahankan sesi singkat 10 menit hari ini.' },
      { dot:'#185FA5', title:'Laporan bulanan tersedia', sub:'Ringkasan dari Bu Sari sudah siap untuk dibaca.' },
      { dot:'#4a41b0', title:'Arini dapat 3 NexCard baru', sub:'Perluas motivasi dengan misi bertahap hari ini.' },
      { dot:'#7c4700', title:'Jurnal harian belum terisi', sub:'AI menyarankan isi jurnal 3 menit setelah sesi belajar.' }
    ],
    rekomendasi: [
      { kat:'Belajar', ico:'ti-player-play', bg:'var(--teal-lt)', tc:'var(--teal)', saran:'Dampingi Arini saat NexFlix Edu IPA Bab 4 hari ini — materi baru yang membutuhkan diskusi' },
      { kat:'Aktivitas', ico:'ti-run', bg:'var(--green-lt)', tc:'var(--green)', saran:'Setelah belajar, ajak Arini istirahat 20 menit sebelum sesi malam agar konsentrasi tetap optimal' },
      { kat:'Bacaan', ico:'ti-book', bg:'var(--purple-lt)', tc:'var(--purple)', saran:'Rekomendasikan: "Sains Seru untuk Anak SD" — selaras dengan IPA Bab 4 yang sedang dipelajari' },
      { kat:'Reward', ico:'ti-gift', bg:'var(--amber-lt)', tc:'var(--amber)', saran:'Arini hampir mencapai streak 14 hari! Berikan apresiasi kecil untuk mendorong konsistensi' }
    ],
    ringkasanOrtu: {
      summary: 'Rutinitas belajar Arini cukup konsisten dengan lonjakan motivasi di akhir pekan. Perlu penguatan pada IPA untuk menjaga kestabilan.',
      bullets: [
        'Durasi rata-rata: 42 menit/hari',
        'Level saat ini: 8 (naik bertahap)',
        'Kompetensi terlemah: IPA',
        'Tindak lanjut di rumah: sesi 3 langkah (pemantik → latihan → refleksi)'
      ]
    }
  };


  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

  function openModal(title, bodyHtml){
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = bodyHtml;
    $('#modalBackdrop').style.display = 'flex';
    $('#modalBackdrop').setAttribute('aria-hidden','false');
  }

  function closeModal(){
    $('#modalBackdrop').style.display = 'none';
    $('#modalBackdrop').setAttribute('aria-hidden','true');
  }

  function renderNotif(){
    const list = $('#notifList');
    if(!list) return;
    list.innerHTML = state.notif.map(n=>`
      <div class="notif-item">
        <div class="notif-badge" style="background:${n.dot}"></div>
        <div>
          <div class="notif-title">${n.title}</div>
          <div class="notif-sub">${n.sub}</div>
        </div>
      </div>
    `).join('');
  }

  let notifOpen = false;
  function toggleNotif(){
    notifOpen = !notifOpen;
    $('#notifDropdown')?.classList.toggle('show', notifOpen);
  }

  const CHARTS = {};
  function destroyChart(key){
    if(CHARTS[key]){ try{ CHARTS[key].destroy(); }catch(e){} delete CHARTS[key]; }
  }

  function renderChart(){
    const host = $('#chartBars');
    if(!host) return;

    // Canvas bar/line combo (Chart.js)
    host.innerHTML = `
      <div style="height:210px;position:relative">
        <canvas id="ch-weekly"></canvas>
      </div>
    `;

    const canvas = document.getElementById('ch-weekly');
    if(!canvas || !window.Chart) return;

    destroyChart('weekly');
    CHARTS['weekly'] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: state.charts.weekly.labels,
        datasets: [
          {
            label: 'Durasi Belajar (mnt)',
            data: state.charts.weekly.durationMin,
            backgroundColor: '#0a5e49',
            borderRadius: 8,
            yAxisID: 'y',
          },
          {
            label: 'Misi Selesai',
            data: state.charts.weekly.missions,
            backgroundColor: '#f5a623',
            borderRadius: 8,
            yAxisID: 'y1',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { family: 'Plus Jakarta Sans', size: 10 } } }
        },
        scales: {
          y: {
            grid: { color: 'rgba(0,0,0,0.04)' },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } },
          },
          y1: {
            position: 'right',
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } },
          },
          x: { grid: { display: false } }
        }
      }
    });
  }


  function renderDashboard(){
    const content = $('#content');
    if(!content) return;

    content.innerHTML = `
      <div class="stats-row">
      <div class="stat-icon green">Level</div>
        <div class="stat-card"><div class="stat-icon blue">⏱️</div><div class="stat-val">42 min</div><div class="stat-label">Durasi belajar hari ini</div><div class="stat-trend" style="color:#3B6D11;">Target: 30 menit ✓</div></div>
        <div class="stat-card"><div class="stat-icon amber">🧠</div><div class="stat-val">24</div><div class="stat-label">Konsistensi mingguan</div><div class="stat-trend" style="color:#854F0B;">+3 hari</div></div>
        <div class="stat-card"><div class="stat-icon purple">🔥</div><div class="stat-val">12 hari</div><div class="stat-label">Streak belajar</div><div class="stat-trend" style="color:#534AB7;">Konsisten!</div></div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title"><span>▤</span> Grafik motivasi & partisipasi</div>
            <div class="panel-link" id="refreshChart">Refresh</div>
          </div>
          <div class="chart-bars" id="chartBars"></div>

          <div style="margin-top:14px;border-top:1px solid var(--color-border-tertiary);padding-top:12px;">
            <div class="panel-title" style="margin-bottom:8px;"><span>📌</span> Penguasaan kompetensi</div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${state.competencies.map(c=>`
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--color-text-secondary);font-weight:900;margin-bottom:6px;"><span>${c.key}</span><span id="pct">${c.pct}%</span></div>
                  <div class="progress-bar"><div class="progress-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="panel">
          <div class="panel-header">
            <div class="panel-title"><span>✎</span> Jurnal perkembangan rumah</div>
            <div class="panel-link" id="addNote">+ Tambah catatan</div>
          </div>
          <div id="journalList" style="display:flex;flex-direction:column;gap:10px;margin-bottom:12px;"></div>
          <div style="border-top:1px solid var(--color-border-tertiary);padding-top:12px">
            <div class="panel-title" style="margin-bottom:8px;"><span>✨</span> Rekomendasi AI untuk di rumah</div>
            <div class="recommend" style="margin-top:0">
              <div class="list" id="recoList">
                <div style="padding:10px;background:#EEEDFE;border-radius:14px;color:#534AB7;font-weight:1000">📚 Baca buku cerita IPA anak sebelum tidur, 15 mnt</div>
                <div style="padding:10px;background:#EAF3DE;border-radius:14px;color:#3B6D11;font-weight:1000;margin-top:8px">🎮 Selesaikan misi NexWorld IPA hari Sabtu</div>
              </div>
            </div>
          </div>
          <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
            <button class="btn btn-primary" id="btnAsk">Minta saran belajar ↗</button>
            <button class="btn btn-ghost" id="btnNudge">Buat pengingat 10 menit</button>
          </div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:0">
        <div class="panel">
          <div class="panel-header"><div class="panel-title"><span>📣</span> Aktivitas singkat</div><div class="panel-link" id="viewAllActs">Lihat detail</div></div>
          <div id="activityList"></div>
        </div>
        <div class="panel">
          <div class="panel-header"><div class="panel-title"><span>⟡</span> Ringkasan orang tua</div><div class="panel-link" id="openLaporan">Lihat laporan</div></div>
          <div style="background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;padding:12px">
            <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Insight minggu ini</div>
            <div style="margin-top:6px;font-size:13px;color:var(--color-text-primary);font-weight:900;line-height:1.45">${state.laporan.summary}</div>
          </div>
          <div style="margin-top:12px;">
            <div class="panel-title" style="margin-bottom:8px;"><span>🧭</span> Mood & fokus</div>
            <div class="mood-chips">
              <div class="mood-chip focus">😐 Fokus · 10</div>
              <div class="mood-chip happy">😊 Senang · 12</div>
              <div class="mood-chip tired">😴 Lelah · 4</div>
            </div>
          </div>
        </div>
      </div>
    `;

    renderChart();

    $('#journalList').innerHTML = state.journal.map(j=>`
      <div style="padding:12px;background:var(--color-background-secondary);border-radius:var(--border-radius-md);border-left:3px solid ${j.dot}">
        <div style="font-size:10px;color:var(--color-text-secondary);font-weight:900">${j.date}</div>
        <div style="font-size:12px;color:var(--color-text-primary);font-weight:1000;margin-top:2px;line-height:1.45">${j.text}</div>
      </div>
    `).join('');

    $('#activityList').innerHTML = state.activities.map(a=>`
      <div class="activity-item">
        <div class="act-dot" style="background:${a.ic}"></div>
        <div>
          <div class="act-text">${a.text}</div>
          <div class="act-time">${a.tm}</div>
        </div>
      </div>
    `).join('');


    $('#refreshChart').addEventListener('click', ()=>renderChart(1));
    $('#addNote').addEventListener('click', ()=>openModal('Catatan Ditambahkan','<div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;font-weight:1000">Catatan rumah ditambahkan (simulasi).</div>'));
    $('#btnAsk').addEventListener('click', ()=>openModal('NexBot (simulasi)','<div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;font-weight:1000">Latihan IPA 7 menit bertahap + refleksi singkat 3 menit.</div>'));
    $('#btnNudge').addEventListener('click', ()=>alert('Simulasi: pengingat 10 menit berjalan.'));
    $('#viewAllActs').addEventListener('click', ()=>openModal('Detail Aktivitas', state.activities.map(a=>`<div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;margin-bottom:10px"><div style="font-weight:1000">${a.text}</div><div style="margin-top:6px;color:var(--color-text-secondary);font-weight:900;font-size:12px">${a.time}</div></div>`).join('')));
    $('#openLaporan').addEventListener('click', ()=>location.href='laporan.html');
  }

  function renderAnalitik(){
    const content = $('#content');
    if(!content) return;
    const base = state.charts?.weekly?.durationMin || [1,1,1,1,1,1,1];
    const avg = Math.round(base.reduce((a,b)=>a+b,0)/base.length);


    content.innerHTML = `
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon purple">📊</div><div class="stat-val">${avg}%</div><div class="stat-label">Tren partisipasi</div><div class="stat-trend" style="color:#534AB7;">Mingguan</div></div>
        <div class="stat-card"><div class="stat-icon green">🎯</div><div class="stat-val">IPA</div><div class="stat-label">Materi terlemah</div><div class="stat-trend" style="color:#3B6D11;">Butuh penguatan</div></div>
        <div class="stat-card"><div class="stat-icon amber">⏳</div><div class="stat-val">42</div><div class="stat-label">Durasi rata-rata</div><div class="stat-trend" style="color:#854F0B;">Per sesi</div></div>
        <div class="stat-card"><div class="stat-icon blue">🧠</div><div class="stat-val">3x</div><div class="stat-label">Saran rutinitas</div><div class="stat-trend" style="color:#185FA5;">Pemantik-Latihan-Refleksi</div></div>
      </div>

      <div class="grid-2">
        <div class="panel">
          <div class="panel-header"><div class="panel-title"><span>▤</span> Heatmap motivasi (simulasi)</div><div class="panel-link" id="analitikDetail">Detail</div></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${['Fokus','Senang','Lelah','Bosan'].map((t,i)=>`
              <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
                <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">${t}</div>
                <div style="margin-top:6px;font-size:18px;font-weight:1000;color:var(--color-text-primary)">${[10,12,4,2][i]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="panel">
          <div class="panel-header"><div class="panel-title"><span>▦</span> Kompetensi per mapel</div><div class="panel-link" id="reRenderCompetency">Refresh</div></div>
          <div style="display:flex;flex-direction:column;gap:12px" id="compList"></div>
        </div>
      </div>
    `;

    const renderComp = ()=>{
      $('#compList').innerHTML = state.competencies.map(c=>`
        <div>
          <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--color-text-secondary);font-weight:900;margin-bottom:6px;"><span>${c.key}</span><span>${c.pct}%</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${c.pct}%;background:${c.color}"></div></div>
        </div>
      `).join('');
    };

    renderComp();
    $('#reRenderCompetency').addEventListener('click', ()=>renderComp());
    $('#analitikDetail').addEventListener('click', ()=>openModal('Detail Analitik','<div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;font-weight:1000">Simulasi insight: fokus menurun saat sesi terlalu panjang. Solusi: pecah jadi 2 sesi singkat.</div>'));
  }

  function renderLaporan(){
    const content = $('#content');
    if(!content) return;
    const p = state.laporan;

    content.innerHTML = `
      <div class="stats-row">
        <div class="stat-card"><div class="stat-icon blue">🗓️</div><div class="stat-val">2</div><div class="stat-label">Periode laporan</div><div class="stat-trend"><span>↗</span> ${p.minggu}</div></div>
        <div class="stat-card"><div class="stat-icon green">✅</div><div class="stat-val">4</div><div class="stat-label">Insight utama</div><div class="stat-trend" style="color:#3B6D11;">Ringkas</div></div>
        <div class="stat-card"><div class="stat-icon amber">📄</div><div class="stat-val">PDF</div><div class="stat-label">Export (simulasi)</div><div class="stat-trend" style="color:#854F0B;">1 klik</div></div>
        <div class="stat-card"><div class="stat-icon purple">🧠</div><div class="stat-val">AI</div><div class="stat-label">Tindak lanjut</div><div class="stat-trend" style="color:#534AB7;">Actionable</div></div>
      </div>

      <div class="grid-2">
        <div class="panel" style="grid-column:1 / span 2">
          <div class="panel-header">
            <div class="panel-title"><span>≡</span> Laporan perkembangan anak</div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
              <button class="btn btn-primary" id="exportPdf">Export PDF</button>
              <button class="btn btn-ghost" id="sendSummary">Kirim ringkasan</button>
            </div>
          </div>

          <div style="background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;padding:12px">
            <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Ringkasan</div>
            <div style="margin-top:6px;font-size:13px;color:var(--color-text-primary);font-weight:900;line-height:1.45">${p.summary}</div>
          </div>

          <div style="margin-top:12px;display:flex;flex-direction:column;gap:10px">
            ${p.bullets.map(b=>`
              <div style="padding:10px 12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
                <div style="font-weight:1000;color:var(--color-text-primary)">${b}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    $('#exportPdf').addEventListener('click', ()=>alert('Simulasi: export PDF'));
    $('#sendSummary').addEventListener('click', ()=>alert('Simulasi: kirim ringkasan'));
  }

  function handleSearch(){
    const q = prompt('Cari (misal: IPA, jurnal, streak)') || '';
    const query = q.trim().toLowerCase();
    if(!query) return;

    const compHits = state.competencies.filter(c=>c.key.toLowerCase().includes(query));
    const journalHits = state.journal.filter(j=>j.text.toLowerCase().includes(query) || j.date.toLowerCase().includes(query));

    openModal('Hasil Pencarian', `
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
          <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Kompetensi (${compHits.length})</div>
          <div style="margin-top:8px">${compHits.length ? compHits.map(c=>`<div style="font-weight:1000;color:var(--color-text-primary)">${c.key}: ${c.pct}%</div>`).join('') : '<div style="color:var(--color-text-secondary);font-weight:900">Tidak ada</div>'}</div>
        </div>
        <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
          <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Jurnal (${journalHits.length})</div>
          <div style="margin-top:8px">${journalHits.length ? journalHits.map(j=>`<div style="font-weight:1000;color:var(--color-text-primary)">${j.date}<div style="margin-top:4px;font-size:12px;color:var(--color-text-secondary);font-weight:800">${j.text}</div></div>`).join('') : '<div style="color:var(--color-text-secondary);font-weight:900">Tidak ada</div>'}</div>
        </div>
      </div>
    `);
  }

  function mount(){
    $('#modalClose')?.addEventListener('click', closeModal);
    $('#modalBackdrop')?.addEventListener('click', (e)=>{ if(e.target.id==='modalBackdrop') closeModal(); });

    $('#searchBtn')?.addEventListener('click', handleSearch);

    $('#notifBtn')?.addEventListener('click', toggleNotif);
    document.addEventListener('click', (e)=>{
      const btn = $('#notifBtn');
      const dd = $('#notifDropdown');
      if(!btn || !dd) return;
      if(!btn.contains(e.target) && !dd.contains(e.target)){
        notifOpen = false;
        dd.classList.remove('show');
      }
    });

    renderNotif();
    const page = (window.NEXORA_PAGE || 'dashboard').toLowerCase();

    if(page==='analitik') return renderAnalitik();
    if(page==='laporan') return renderLaporan();
    return renderDashboard();
  }

  window.NEXORA_MOUNT = mount;
})();

