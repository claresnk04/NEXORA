/* NEXORA — Guru workspace script
   Catatan: file ini harus valid JS di browser (bukan Node). 
   Implementasi: mount ke elemen yang ada di guru/* HTML.
*/
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    className: 'Kelas V-A',
    students: [
      { id: 'AR', name: 'Arini Ramadhani', mapel: 'Matematika', level: 8, prog: 88, tag: 'top', badge: { type: 'ok', text: 'Baik' }, ava: 'a', color: '#185FA5' },
      { id: 'DB', name: 'Dika Budiman', mapel: 'IPA', level: 5, prog: 52, tag: 'support', badge: { type: 'warn', text: 'Pantau' }, ava: 'b', color: '#EF9F27' },
      { id: 'FN', name: 'Fara Nugraha', mapel: 'Bahasa Indonesia', level: 9, prog: 95, tag: 'top', badge: { type: 'ok', text: 'Top' }, ava: 'c', color: '#639922' },
      { id: 'RS', name: 'Rizky Setiawan', mapel: 'IPS', level: 3, prog: 31, tag: 'support', badge: { type: 'crit', text: 'Kritis' }, ava: 'd', color: '#E24B4A' },
      { id: 'MW', name: 'Maya Widiani', mapel: 'Matematika', level: 7, prog: 76, tag: 'all', badge: { type: 'info', text: 'Aktif' }, ava: 'e', color: '#185FA5' },
    ],
    activities: [
      { dot: '#185FA5', text: 'Arini menyelesaikan misi NexWorld — Matematika Pecahan', time: '2 menit lalu · XP +50' },
      { dot: '#f5a623', text: 'Rizky membutuhkan bantuan pada materi IPS Bab 3', time: '8 menit lalu · NexBot diakses' },
      { dot: '#639922', text: 'Fara meraih badge "Bintang Bahasa" — streak 7 hari', time: '15 menit lalu' },
      { dot: '#E24B4A', text: 'Dika tidak menyelesaikan kuis NexFlix — skor 45/100', time: '22 menit lalu · Rekomendasi dikirim' },
    ],
    moods: [
      { cls: 'happy', emoji: '😊', text: 'Senang', count: 14 },
      { cls: 'focus', emoji: '😐', text: 'Fokus', count: 8 },
      { cls: 'tired', emoji: '😴', text: 'Lelah', count: 4 },
      { cls: 'bored', emoji: '😑', text: 'Bosan', count: 2 },
    ],
    nexcards: [
      { cls: 'math', icon: '➗', text: 'Matematika', locked: false },
      { cls: 'science', icon: '⚗️', text: 'IPA', locked: false },
      { cls: 'ips', icon: '🌍', text: 'IPS', locked: false },
      { cls: 'lang', icon: '📘', text: 'B. Indo', locked: false },
      { cls: 'locked', icon: '🔒', text: 'Terkunci', locked: true },
    ],
    notif: [
      { dot: '#f5a623', title: '2 siswa butuh penguatan hari ini', sub: 'RS & DB — skor di bawah target' },
      { dot: '#185FA5', title: 'Kelas mencapai progres 74%', sub: 'Rata-rata capaian naik +8%' },
      { dot: '#639922', title: 'Ada badge baru masuk', sub: 'FN: Bintang Bahasa · streak 7 hari' },
      { dot: '#E24B4A', title: 'Perlu cek aktivitas belajar', sub: 'Dika belum menyelesaikan kuis NexFlix' },
    ],
    chart: {
      labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
      base: [55, 70, 48, 75, 80, 35, 20],
    },
    analitik: {
      weeklyEngagement: {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        values: [55, 70, 48, 75, 80, 35, 20],
      },
      heatmap: [
        { day: 'Sen', mapel: 'Mat', v: 78 },
        { day: 'Sen', mapel: 'IPA', v: 66 },
        { day: 'Sel', mapel: 'Mat', v: 72 },
        { day: 'Sel', mapel: 'IPA', v: 81 },
        { day: 'Rab', mapel: 'Mat', v: 60 },
        { day: 'Rab', mapel: 'IPA', v: 74 },
        { day: 'Kam', mapel: 'Mat', v: 82 },
        { day: 'Kam', mapel: 'IPA', v: 79 },
      ],
      topLow: { top: 'Fara Nugraha', low: 'Rizky Setiawan', note: 'Sinyal: Kamis menunjukkan sesi lebih rendah untuk siswa low.' },
    },
    laporan: {
      minggu: 'Minggu ke-2 (Juni)',
      summary: 'Kelas menunjukkan progres stabil dengan dua titik penurunan motivasi di akhir minggu. Intervensi scaffolding disarankan untuk kelompok low.',
      bullets: [
        'Kehadiran stabil: 93% rata-rata',
        'Materi terlemah: IPS Bab 3',
        'Siswa low: RS & DB perlu penguatan konsep',
        'Tindak lanjut: kirim 3 paket latihan bertingkat',
      ],
    },
  };

  function animateCount(el) {
    const from = Number(el.dataset.from || 0);
    const to = Number(el.dataset.to || 0);
    const dur = 700;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = Math.round(from + (to - from) * t);
      el.textContent = v;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function openModal(title, bodyHtml) {
    $('#modalTitle') && ($('#modalTitle').textContent = title);
    $('#modalBody') && ($('#modalBody').innerHTML = bodyHtml);
    const back = $('#modalBackdrop');
    if (!back) return;
    back.style.display = 'flex';
    back.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const back = $('#modalBackdrop');
    if (!back) return;
    back.style.display = 'none';
    back.setAttribute('aria-hidden', 'true');
  }

  let notifOpen = false;
  function toggleNotif() {
    notifOpen = !notifOpen;
    $('#notifDropdown') && $('#notifDropdown').classList.toggle('show', notifOpen);
  }

  function renderNotif() {
    const list = $('#notifList');
    if (!list) return;
    list.innerHTML = state.notif
      .map(
        (n) => `
      <div class="notif-item">
        <div class="notif-badge" style="background:${n.dot}"></div>
        <div>
          <div class="notif-title">${n.title}</div>
          <div class="notif-sub">${n.sub}</div>
        </div>
      </div>
    `
      )
      .join('');
  }

  function renderStudents(filter = 'all') {
    const list = $('#studentList');
    if (!list) return;

    const students = state.students.filter((s) => {
      if (filter === 'all') return true;
      if (filter === 'support') return s.tag === 'support' || (s.tag === 'all' && s.prog < 60);
      if (filter === 'top') return s.tag === 'top' || s.prog >= 85;
      return true;
    });

    list.innerHTML = students
      .map(
        (s) => `
      <div class="student-row" role="button" tabindex="0" data-student-id="${s.id}" style="cursor:pointer">
        <div class="ava ${s.ava}">${s.id}</div>
        <div class="student-info">
          <div class="student-name">${s.name}</div>
          <div class="student-meta">${s.mapel} · Level ${s.level}</div>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar"><div class="progress-fill" style="width:${s.prog}%;background:${s.color}"></div></div>
          <div class="progress-pct">${s.prog}%</div>
        </div>
        <span class="badge ${s.badge.type}">${s.badge.text}</span>
      </div>
    `
      )
      .join('');

    $$('.student-row', list).forEach((row) => {
      row.addEventListener('click', () => {
        const st = state.students.find((x) => x.id === row.dataset.studentId);
        if (!st) return;
        openModal(
          'Detail Progres Siswa',
          `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
            <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Profil</div>
            <div style="margin-top:6px;font-size:16px;font-weight:1000;color:var(--color-text-primary)">${st.name}</div>
            <div style="margin-top:6px;font-size:13px;color:var(--color-text-secondary);font-weight:900">${st.mapel} · Level ${st.level}</div>
          </div>
          <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
            <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Progress</div>
            <div style="margin-top:8px;display:flex;align-items:center;gap:12px">
              <div style="font-size:28px;font-weight:1000;color:var(--color-text-primary)">${st.prog}%</div>
              <div style="flex:1">
                <div class="progress-bar"><div class="progress-fill" style="width:${st.prog}%;background:${st.color}"></div></div>
                <div style="margin-top:6px;font-size:12px;color:var(--color-text-secondary);font-weight:900">
                  Rekomendasi: ${st.tag === 'support' ? 'Scaffolding & cek pemahaman konsep' : 'Tantangan bertingkat & penguatan strategi'}
                </div>
              </div>
            </div>
          </div>
        </div>
      `
        );
      });
    });
  }

  function renderChart(variant = 0) {
    const bars = $('#chartBars');
    if (!bars) return;

    const heights = state.chart.base.map((h, i) => {
      const jitter = variant === 0 ? 0 : Math.round(Math.sin((i + 1) * (variant + 1)) * 6 + (Math.random() * 6 - 3));
      return Math.max(8, Math.round(h + jitter));
    });

    bars.innerHTML = state.chart.labels
      .map((lbl, i) => {
        const color = i === 3 ? '#f5a623' : '#185FA5';
        return `
        <div class="bar-wrap">
          <div class="bar" style="height:${heights[i]}px;background:${color}"></div>
          <div class="bar-lbl">${lbl}</div>
        </div>
      `;
      })
      .join('');

    $$('.bar', bars).forEach((el, idx) => {
      const target = heights[idx];
      el.style.height = '14px';
      requestAnimationFrame(() => {
        el.style.height = target + 'px';
      });
    });
  }

  function renderMood() {
    const el = $('#moodChips');
    if (!el) return;
    el.innerHTML = state.moods
      .map((m) => `<div class="mood-chip ${m.cls}">${m.emoji} ${m.text} · ${m.count} siswa</div>`)
      .join('');
  }

  function renderNexcards() {
    const el = $('#nexcardRow');
    if (!el) return;
    el.innerHTML = state.nexcards
      .map(
        (c) => `
      <div class="nexcard ${c.cls}" role="button" tabindex="0" data-nexcard-text="${c.text}" data-locked="${c.locked ? '1' : '0'}" ${c.locked ? 'aria-disabled="true"' : ''}>
        <i aria-hidden="true">${c.icon}</i>
        <div>${c.text}</div>
      </div>
    `
      )
      .join('');

    $$('.nexcard', el).forEach((card) => {
      card.addEventListener('click', () => {
        const locked = card.dataset.locked === '1';
        const text = card.dataset.nexcardText;
        if (locked) {
          openModal(
            'NexCard Terkunci',
            `<div style="padding:12px;background:var(--color-background-secondary);border-radius:14px;border:1px solid var(--color-border-tertiary)">NexCard <b>${text}</b> akan terbuka setelah target progres minggu ini tercapai.</div>`
          );
          return;
        }
        openModal(
          'NexCard Dipilih',
          `<div style="padding:12px;background:var(--color-background-secondary);border-radius:14px;border:1px solid var(--color-border-tertiary)">Guru memilih NexCard <b>${text}</b>. (Simulasi: akan memicu rekomendasi tugas bertingkat.)</div>`
        );
      });
    });
  }

  function renderActivity() {
    const el = $('#activityList');
    if (!el) return;
    el.innerHTML = state.activities
      .map(
        (a) => `
      <div class="activity-item">
        <div class="act-dot" style="background:${a.dot}"></div>
        <div>
          <div class="act-text">${a.text}</div>
          <div class="act-time">${a.time}</div>
        </div>
      </div>
    `
      )
      .join('');
  }

  function generateBotSummary(target = 'Dika') {
    const support = state.students.filter((s) => s.tag === 'support');
    const headline = support.length ? `${support.length} siswa perlu penguatan hari ini` : 'Semua siswa dalam kondisi stabil';
    return {
      summary: `Berdasarkan pola aktivitas, ${headline}. Fokus rekomendasi untuk <b>${target}</b> agar naik dari stagnasi ke konsistensi.`,
      recs: [
        'Kirim paket latihan bertingkat: 5 menit pemantik → 10 menit latihan inti → 3 menit refleksi',
        `Gunakan NexFlix Edu topik yang paling sering muncul error di ${target}`,
        'Variasikan bentuk soal (pilihan ganda → isian singkat) agar pemahaman lebih kokoh',
      ],
    };
  }

  function renderDashboard() {
    // render utama sudah ada di guru/guru.html (template). Kita hanya isi komponen yang punya id.
    renderNotif();
    renderStudents('all');
    renderActivity();
    renderMood();
    renderChart(0);
    renderNexcards();

    $$('.stat-val[data-animate="count"]').forEach(animateCount);

    // Tabs filter
    $$('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        $$('.tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        renderStudents(tab.dataset.filter);
      });
    });

    // Refresh chart
    $('#refreshChart')?.addEventListener('click', () => {
      renderChart(1);
      $('#page-sub') && ($('#page-sub').textContent = 'Jumat, 12 Juni 2026 · Update keterlibatan (1)');
    });

    // View all
    $('#viewAllProgress')?.addEventListener('click', () => {
      const body = `<div style="display:flex;flex-direction:column;gap:10px">${state.students
        .map(
          (s) => `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
          <div style="font-weight:1000">${s.name}</div>
          <div style="color:var(--color-text-secondary);font-weight:900">${s.mapel} · Level ${s.level}</div>
          <div style="font-weight:1000;color:${s.color}">${s.prog}%</div>
        </div>
      `
        )
        .join('')}</div>`;
      openModal('Semua Progres Siswa', body);
    });

    $('#viewAllLogs')?.addEventListener('click', () => {
      const body = `<div style="display:flex;flex-direction:column;gap:12px">${state.activities
        .map(
          (a) => `
        <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
          <div style="font-weight:1000;color:var(--color-text-primary)">${a.text}</div>
          <div style="margin-top:6px;font-size:12px;color:var(--color-text-secondary);font-weight:900">${a.time}</div>
        </div>
      `
        )
        .join('')}</div>`;
      openModal('Semua Log', body);
    });

    // Bot prompts (kalau ada di template)
    const botSummary = $('#botSummary');
    const botRecs = $('#botRecs');

    const btnPrompt = $('#btnPromptDika');
    const btnRefresh = $('#btnBotRefresh');

    function renderBot(target) {
      if (!botSummary || !botRecs) return;
      const res = generateBotSummary(target);
      botSummary.innerHTML = res.summary;
      botRecs.innerHTML = res.recs.map((r) => `<div>• ${r.replace(/^•\s*/, '')}</div>`).join('');
    }

    if (btnPrompt) {
      btnPrompt.addEventListener('click', () => {
        renderBot('Dika');
        openModal('NexBot: Rekomendasi', '<div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px;font-weight:1000">Simulasi rekomendasi NexBot sudah diperbarui di halaman.</div>');
      });
    }

    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        renderBot('kelompok stagnan');
      });
    }

    renderBot('Dika');

    // Search
    $('#searchBtn')?.addEventListener('click', () => {
      const q = prompt('Cari siswa / aktivitas / materi (misal: Arini, IPA, RS, IPS Bab)') || '';
      const query = q.trim().toLowerCase();
      if (!query) return;

      const hitStudents = state.students
        .filter((s) => (s.name + s.mapel).toLowerCase().includes(query))
        .slice(0, 5);
      const hitActs = state.activities.filter((a) => a.text.toLowerCase().includes(query)).slice(0, 5);

      const body = `
        <div style="display:flex;flex-direction:column;gap:12px">
          <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
            <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Siswa ditemukan (${hitStudents.length})</div>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
              ${hitStudents.length
                ? hitStudents.map((s) => `<div style="font-weight:1000;color:var(--color-text-primary)">${s.name}</div>`).join('')
                : '<div style="color:var(--color-text-secondary);font-weight:900">Tidak ada</div>'}
            </div>
          </div>
          <div style="padding:12px;background:var(--color-background-secondary);border:1px solid var(--color-border-tertiary);border-radius:14px">
            <div style="font-size:12px;color:var(--color-text-secondary);font-weight:900">Aktivitas ditemukan (${hitActs.length})</div>
            <div style="margin-top:8px;display:flex;flex-direction:column;gap:8px">
              ${hitActs.length
                ? hitActs.map((a) => `<div style="font-weight:1000;color:var(--color-text-primary)">${a.text}<div style="font-size:12px;color:var(--color-text-secondary);font-weight:900;margin-top:2px">${a.time}</div></div>`).join('')
                : '<div style="color:var(--color-text-secondary);font-weight:900">Tidak ada</div>'}
            </div>
          </div>
        </div>
      `;

      openModal('Hasil Pencarian', body);
    });

    $('#notifBtn')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') toggleNotif();
    });
  }

  function init() {
    // Only init if DOM looks like guru dashboard page
    if (!$('#content')) return;

    renderNotif();
    renderDashboard();

    // dropdown toggle
    $('#notifBtn')?.addEventListener('click', () => toggleNotif());

    document.addEventListener('click', (e) => {
      const btn = $('#notifBtn');
      const dd = $('#notifDropdown');
      if (!btn || !dd) return;
      if (!btn.contains(e.target) && !dd.contains(e.target)) {
        notifOpen = false;
        dd.classList.remove('show');
      }
    });

    // modal
    $('#modalClose')?.addEventListener('click', closeModal);
    $('#modalBackdrop')?.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'modalBackdrop') closeModal();
    });

    closeModal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

