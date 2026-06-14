// NEXORA — Guru page logic (extracted from inline <script> in guru/guru.html)
// Keep as plain browser JS.

(function () {
  const STUDENTS = [
    {id:1,name:'Arini Ramadhani',init:'AR',c:'#EEEDFE',tc:'#4a41b0',lv:8,pct:88,mapel:'Matematika',mood:'😊',streak:12,status:'Baik',xp:2840,note:'Konsisten dan berprestasi'},
    {id:2,name:'Dika Budiman',init:'DB',c:'#E1F5EE',tc:'#0a5e49',lv:5,pct:52,mapel:'IPA',mood:'😴',streak:3,status:'Pantau',xp:1450,note:'Motivasi mulai menurun'},
    {id:3,name:'Fara Nugraha',init:'FN',c:'#FAEEDA',tc:'#7c4700',lv:9,pct:95,mapel:'B. Indonesia',mood:'😊',streak:18,status:'Top',xp:3210,note:'Siswa terbaik kelas'},
    {id:4,name:'Rizky Setiawan',init:'RS',c:'#FCEBEB',tc:'#9b2626',lv:3,pct:31,mapel:'IPS',mood:'😑',streak:1,status:'Kritis',xp:780,note:'Perlu perhatian segera'},
    {id:5,name:'Maya Widiani',init:'MW',c:'#E6F1FB',tc:'#185FA5',lv:7,pct:76,mapel:'Matematika',mood:'😐',streak:9,status:'Aktif',xp:2180,note:'Perkembangan stabil'},
    {id:6,name:'Budi Prasetyo',init:'BP',c:'#EEEDFE',tc:'#4a41b0',lv:4,pct:44,mapel:'IPS',mood:'😑',streak:2,status:'Pantau',xp:1120,note:'Perlu motivasi tambahan'},
    {id:7,name:'Sinta Dewi',init:'SD',c:'#E1F5EE',tc:'#0a5e49',lv:8,pct:82,mapel:'IPA',mood:'😊',streak:14,status:'Baik',xp:2560,note:'Aktif dan konsisten'},
    {id:8,name:'Lina Marlina',init:'LM',c:'#FAEEDA',tc:'#7c4700',lv:4,pct:38,mapel:'Matematika',mood:'😴',streak:0,status:'Kritis',xp:950,note:'Streak 0, perlu intervensi'},
  ];

  const ACTIVITIES = [
    {icon:'ti-trophy',bg:'#EAF3DE',ic:'#2d6a0a',txt:'<b>Fara Nugraha</b> meraih badge "Bintang Bahasa" — streak 18 hari',tm:'2 mnt lalu'},
    {icon:'ti-player-play',bg:'#E6F1FB',ic:'#185FA5',txt:'<b>Arini</b> selesaikan misi NexWorld Matematika Pecahan',tm:'5 mnt lalu · +50 XP'},
    {icon:'ti-alert-triangle',bg:'#FAEEDA',ic:'#7c4700',txt:'<b>Rizky</b> memerlukan bantuan NexBot di IPS Bab 3',tm:'8 mnt lalu'},
    {icon:'ti-x-circle',bg:'#FCEBEB',ic:'#9b2626',txt:'<b>Dika</b> skor kuis NexFlix 45/100 — AI kirim rekomendasi',tm:'22 mnt lalu'},
    {icon:'ti-flame',bg:'#FAEEDA',ic:'#7c4700',txt:'<b>Maya</b> mempertahankan streak 9 hari',tm:'34 mnt lalu'},
  ];

  const LEADERBOARD=[
    {name:'Fara Nugraha',init:'FN',c:'#FAEEDA',tc:'#7c4700',xp:3210},
    {name:'Arini Ramadhani',init:'AR',c:'#EEEDFE',tc:'#4a41b0',xp:2840},
    {name:'Sinta Dewi',init:'SD',c:'#E1F5EE',tc:'#0a5e49',xp:2560},
    {name:'Maya Widiani',init:'MW',c:'#E6F1FB',tc:'#185FA5',xp:2180},
    {name:'Dika Budiman',init:'DB',c:'#E1F5EE',tc:'#0a5e49',xp:1450},
  ];

  const NEXCARDS=[
    {n:'Matematika',i:'ti-math-symbols',b:'#E6F1FB',t:'#185FA5',xp:'+50 XP',lk:false},
    {n:'IPA',i:'ti-flask',b:'#EAF3DE',t:'#2d6a0a',xp:'+40 XP',lk:false},
    {n:'IPS',i:'ti-world',b:'#FAEEDA',t:'#7c4700',xp:'+40 XP',lk:false},
    {n:'B.Indo',i:'ti-book',b:'#EEEDFE',t:'#4a41b0',xp:'+45 XP',lk:false},
    {n:'Streak 7',i:'ti-flame',b:'#FCEBEB',t:'#9b2626',xp:'+100 XP',lk:false},
    {n:'Juara',i:'ti-trophy',b:'#FAEEDA',t:'#7c4700',xp:'+150 XP',lk:false},
    {n:'Explorer',i:'ti-compass',b:'#E1F5EE',t:'#0a5e49',xp:'+60 XP',lk:false},
    {n:'Rare',i:'ti-diamond',b:'#EEEDFE',t:'#4a41b0',xp:'+200 XP',lk:true},
    {n:'???',i:'ti-lock',b:'#f0f2f8',t:'#9499b5',xp:'',lk:true},
    {n:'???',i:'ti-lock',b:'#f0f2f8',t:'#9499b5',xp:'',lk:true},
    {n:'???',i:'ti-lock',b:'#f0f2f8',t:'#9499b5',xp:'',lk:true},
    {n:'???',i:'ti-lock',b:'#f0f2f8',t:'#9499b5',xp:'',lk:true},
  ];

  const JURNAL=[
    {ortu:'Ayah Arini',anak:'Arini Ramadhani',tgl:'11 Jun 2026',dur:'45 mnt',isi:'Arini sangat antusias mengerjakan soal matematika mandiri malam ini. Selesai 2 bab tanpa diingatkan.'},
    {ortu:'Ibu Dika',anak:'Dika Budiman',tgl:'10 Jun 2026',dur:'20 mnt',isi:'Dika terlihat lelah tapi masih membuka aplikasi. Perlu motivasi ekstra untuk IPA minggu ini.'},
    {ortu:'Ayah Rizky',anak:'Rizky Setiawan',tgl:'9 Jun 2026',dur:'30 mnt',isi:'Rizky kesulitan IPS tapi berhasil menyelesaikan soal sendiri setelah NexBot membantu.'},
  ];

  const REKO=[
    {siswa:'Rizky Setiawan',mapel:'IPS',masalah:'Skor 31% Bab 3 — Sumber Daya Alam',saran:'Gunakan NexFlix Edu seri IPS Bab 3, lanjutkan scaffolding NexWorld level 2',pr:'Kritis'},
    {siswa:'Dika Budiman',mapel:'IPA',masalah:'Motivasi menurun, streak 3 hari',saran:'Aktifkan tantangan harian NexWorld reward ekstra, kirim notifikasi ke orang tua',pr:'Perhatian'},
    {siswa:'Lina Marlina',mapel:'Matematika',masalah:'Belum ketuntasan, streak 0',saran:'Sesi remedial via NexBot, sarankan video IPA bertema menarik untuk re-engagement',pr:'Kritis'},
  ];

  const AGENDA=[
    {tgl:'12 Jun',nama:'Ujian NexWorld Matematika Bab 5',tp:'Ujian',c:'#E6F1FB',t:'#185FA5'},
    {tgl:'14 Jun',nama:'Review mood learning mingguan',tp:'Monitoring',c:'#EAF3DE',t:'#2d6a0a'},
    {tgl:'17 Jun',nama:'Pengumpulan laporan ke orang tua',tp:'Laporan',c:'#FAEEDA',t:'#7c4700'},
    {tgl:'20 Jun',nama:'Ujian NexWorld IPA Bab 4',tp:'Ujian',c:'#E6F1FB',t:'#185FA5'},
    {tgl:'24 Jun',nama:'Rapat koordinasi tim NEXORA',tp:'Rapat',c:'#EEEDFE',t:'#4a41b0'},
    {tgl:'28 Jun',nama:'Akhir semester & evaluasi',tp:'Evaluasi',c:'#FCEBEB',t:'#9b2626'},
  ];

  const NEXBOT_LOG=[
    {s:'Rizky S.',q:'Pak, apa itu erosi tanah?',t:'08:32',ok:true},
    {s:'Maya W.',q:'Cara menghitung FPB dan KPK?',t:'09:14',ok:true},
    {s:'Arini R.',q:'Contoh teks eksplanasi bencana alam?',t:'09:41',ok:true},
    {s:'Dika B.',q:'Mengapa tumbuhan butuh fotosintesis?',t:'10:05',ok:true},
    {s:'Budi P.',q:'Apa yang dimaksud globalisasi?',t:'10:28',ok:false},
    {s:'Sinta D.',q:'Rumus luas trapesium?',t:'10:55',ok:true},
  ];

  const TITLES={
    dashboard:['Dashboard Guru','Jumat, 12 Juni 2026 · Kelas V-A · 30 siswa'],
    siswa:['Manajemen Siswa','Kelas V-A · 30 siswa terdaftar'],
    analitik:['Analitik Kelas','Tren dan statistik pembelajaran'],
    mood:['Mood Learning','Rekap kondisi emosional siswa'],
    nexcard:['NexCard','Galeri pencapaian dan koleksi kartu'],
    nexbot:['NexBot Log','Riwayat interaksi AI siswa'],
    laporan:['Laporan & Jurnal','Evaluasi pedagogi dan jurnal orang tua'],
    rekomendasi:['Rekomendasi AI','Saran personal berbasis analytics'],
    kalender:['Kalender Kelas','Agenda dan jadwal kegiatan V-A'],
    pengaturan:['Pengaturan','Konfigurasi akun dan preferensi'],
  };

  let initialized={};

  function showSec(id){
    document.querySelectorAll('.sec').forEach(e=>e.classList.remove('on'));
    document.getElementById('sec-'+id).classList.add('on');
    document.querySelectorAll('.sb-item').forEach(e=>e.classList.remove('on'));
    document.querySelector(`.sb-item[data-sec="${id}"]`).classList.add('on');
    const t=TITLES[id]||['',''];
    document.getElementById('pg-title').textContent=t[0];
    document.getElementById('pg-sub').textContent=t[1];
    if(!initialized[id]){initialized[id]=true;setTimeout(()=>initSec(id),60);}
    closeNotif();
  }

  function ptab(el){el.parentElement.querySelectorAll('.ptab').forEach(t=>t.classList.remove('on'));el.classList.add('on');}

  function initSec(id){
    if(id==='siswa') renderFullTable();
    if(id==='analitik') {initChart('ch-monthly');initChart('ch-radar');initChart('ch-4w');}
    if(id==='mood') {renderMoodDetail();initChart('ch-mood-h');}
    if(id==='nexcard') {renderNexcardGallery();renderTopCollector();initChart('ch-nexcard');}
    if(id==='nexbot') {renderNexbotLog();initChart('ch-nexbot');}
    if(id==='laporan') renderJurnal();
    if(id==='rekomendasi') renderReko();
    if(id==='kalender') {renderCalendar();renderAgenda();}
  }

  function pctColor(p){return p>=80?'#185FA5':p>=60?'#EF9F27':'#E24B4A'}
  function statusPill(s){const m={Top:'p-tp',Baik:'p-ok',Aktif:'p-ok',Pantau:'p-wn',Kritis:'p-bd'};return`<span class="pill ${m[s]||'p-in'}">${s}</span>`}

  function renderHomeSlist(){
    document.getElementById('home-slist').innerHTML=STUDENTS.slice(0,6).map(s=>`
      <div class="srow" onclick="openStudentModal(${s.id})">
        <div class="ava" style="background:${s.c};color:${s.tc}">${s.init}</div>
        <div class="si"><div class="sn">${s.name}</div><div class="sm">${s.mapel} · Level ${s.lv}</div></div>
        <div class="pcol">
          <div class="pbar"><div class="pfill" style="width:${s.pct}%;background:${pctColor(s.pct)}"></div></div>
          <div class="ppct">${s.pct}%</div>
        </div>
        ${statusPill(s.status)}
      </div>`).join('');
  }

  function renderFullTable(){
    document.getElementById('tbl-siswa').innerHTML=STUDENTS.map(s=>`
      <tr>
        <td><div style="display:flex;align-items:center;gap:10px">
          <div class="ava" style="background:${s.c};color:${s.tc};width:32px;height:32px;font-size:11px">${s.init}</div>
          <div><div style="font-size:12.5px;font-weight:600">${s.name}</div><div style="font-size:10.5px;color:var(--txt2)">${s.note}</div></div>
        </div></td>
        <td><span style="font-size:13px;font-weight:700;color:var(--purple)">Lv.${s.lv}</span></td>
        <td style="width:110px">
          <div class="pbar"><div class="pfill" style="width:${s.pct}%;background:${pctColor(s.pct)}"></div></div>
          <div style="font-size:10px;color:var(--txt3);text-align:right;margin-top:2px">${s.pct}%</div>
        </td>
        <td style="font-size:18px">${s.mood}</td>
        <td style="font-size:12px;font-weight:700;color:var(--amber)">${s.streak} 🔥</td>
        <td style="font-size:12px;font-weight:700;color:var(--navy)">${s.xp.toLocaleString()} XP</td>
        <td>${statusPill(s.status)}</td>
        <td style="text-align:center">
          <div style="display:flex;gap:5px;justify-content:center">
            <button class="btn btn-s" style="padding:5px 10px;font-size:11px" onclick="openStudentModal(${s.id})" title="Detail"><i class="ti ti-eye"></i></button>
            <button class="btn btn-s" style="padding:5px 10px;font-size:11px" title="Kirim Laporan"><i class="ti ti-send"></i></button>
            <button class="btn btn-s" style="padding:5px 10px;font-size:11px" title="NexBot"><i class="ti ti-robot"></i></button>
          </div>
        </td>
      </tr>`).join('');
  }

  function renderActivitiesFeed(){
    document.getElementById('live-feed').innerHTML=ACTIVITIES.map(a=>`
      <div class="ai">
        <div class="aico" style="background:${a.bg};color:${a.ic}"><i class="ti ${a.icon}"></i></div>
        <div class="abody"><div class="atxt">${a.txt}</div><div class="atm">${a.tm}</div></div>
      </div>`).join('');
  }

  function renderLeaderboard(){
    const icons=['🥇','🥈','🥉','4️⃣','5️⃣'];
    document.getElementById('lb-list').innerHTML=LEADERBOARD.map((s,i)=>`
      <div class="lbr">
        <div class="lbrank ${i<3?'r'+(i+1):''}">${icons[i]}</div>
        <div class="ava" style="background:${s.c};color:${s.tc};width:30px;height:30px;font-size:10.5px">${s.init}</div>
        <div style="font-size:12.5px;font-weight:600;flex:1">${s.name}</div>
        <div class="lbxp">${s.xp.toLocaleString()} XP</div>
      </div>`).join('');
  }

  function renderNexcardGallery(){
    document.getElementById('nexcard-gallery').innerHTML=NEXCARDS.map(c=>`
      <div class="ncrd ${c.lk?'ncrd-lck':''}" style="background:${c.b};border-color:${c.t}40">
        <i class="ti ${c.i}" style="color:${c.t}"></i>
        <div class="ncrd-n" style="color:${c.t}">${c.n}</div>
        ${c.xp?`<div class="ncrd-x" style="color:${c.t}">${c.xp}</div>`:''}
      </div>`).join('');
  }

  function renderTopCollector(){
    document.getElementById('top-collector').innerHTML=LEADERBOARD.slice(0,4).map((s,i)=>`
      <div class="lbr">
        <div style="font-size:12px;color:var(--txt3);width:18px;text-align:center;font-weight:700">${i+1}</div>
        <div class="ava" style="background:${s.c};color:${s.tc};width:28px;height:28px;font-size:10px">${s.init}</div>
        <div style="font-size:12.5px;font-weight:600;flex:1">${s.name}</div>
        <span class="pill p-tp">${Math.floor(s.xp/50)} kartu</span>
      </div>`).join('');
  }

  function renderNexbotLog(){
    document.getElementById('nexbot-log').innerHTML=NEXBOT_LOG.map(l=>`
      <div style="padding:11px 13px;background:var(--bg);border-radius:10px;border:1px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
          <span style="font-size:12px;font-weight:700;color:var(--navy)">${l.s}</span>
          <div style="display:flex;gap:6px;align-items:center">
            <span style="font-size:10px;color:var(--txt3)">${l.t}</span>
            <span class="pill ${l.ok?'p-ok':'p-wn'}">${l.ok?'Terjawab':'Eskalasi'}</span>
          </div>
        </div>
      <div style="font-size:12px;color:var(--txt2)">"${l.q}"</div>
      </div>`).join('');
  }

  function renderJurnal(){
    document.getElementById('jurnal-masuk').innerHTML=JURNAL.map(j=>`
      <div style="padding:13px;background:var(--bg);border-radius:12px;border-left:3px solid var(--blue)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
          <span style="font-size:12.5px;font-weight:700;color:var(--navy)">${j.ortu}</span>
          <span style="font-size:10px;color:var(--txt3)">${j.tgl} · ${j.dur}</span>
        </div>
        <div style="font-size:11px;color:var(--txt2);margin-bottom:4px">Re: ${j.anak}</div>
        <div style="font-size:12.5px;color:var(--txt);line-height:1.5">${j.isi}</div>
        <div style="display:flex;gap:6px;margin-top:10px">
          <button class="btn btn-s" style="font-size:11px;padding:5px 12px"><i class="ti ti-message-reply"></i>Balas</button>
          <button class="btn btn-s" style="font-size:11px;padding:5px 12px"><i class="ti ti-check"></i>Tandai Dibaca</button>
        </div>
      </div>`).join('');
  }

  function renderReko(){
    document.getElementById('reko-list').innerHTML=REKO.map(r=>`
      <div style="padding:16px;background:var(--bg);border-radius:12px;border:1px solid var(--border)">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px">
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--navy)">${r.siswa}</div>
            <div style="font-size:11.5px;color:var(--txt2);margin-top:2px">${r.mapel} — ${r.masalah}</div>
          </div>
          <span class="pill ${r.pr==='Kritis'?'p-bd':'p-wn'}">${r.pr}</span>
        </div>
        <div style="font-size:12.5px;color:var(--txt);background:var(--bg2);padding:10px 12px;border-radius:9px;border:1px solid var(--border);line-height:1.5">
          <i class="ti ti-bulb" style="color:var(--gold);margin-right:5px"></i>${r.saran}
        </div>
        <div style="display:flex;gap:8px;margin-top:11px">
          <button class="btn btn-s" style="flex:1;font-size:11.5px;padding:7px"><i class="ti ti-check"></i>Tandai Selesai</button>
          <button class="btn btn-p" style="flex:1;font-size:11.5px;padding:7px"><i class="ti ti-send"></i>Kirim ke Orang Tua</button>
        </div>
      </div>`).join('');
  }

  function renderCalendar(){
    const g=document.getElementById('cal-grid');
    const evDays=[12,14,17,20,24,28];
    let html='<div class="cald other"></div>';
    for(let i=1;i<=30;i++){
      const isT=i===12,isEv=evDays.includes(i);
      html+=`<div class="cald ${isT?'today':''} ${isEv&&!isT?'ev':''}">${i}</div>`;
    }
    g.innerHTML=html;
  }

  function renderAgenda(){
    document.getElementById('agenda-list').innerHTML=AGENDA.map(a=>`
      <div style="display:flex;align-items:center;gap:12px;padding:10px 13px;background:${a.c};border-radius:10px;border:1px solid ${a.t}20">
        <div style="width:38px;text-align:center;font-size:10.5px;font-weight:800;color:${a.t};flex-shrink:0">${a.tgl}</div>
        <div style="flex:1"><div style="font-size:12.5px;color:${a.t};font-weight:600">${a.nama}</div><div style="font-size:10px;color:${a.t};opacity:.7;margin-top:1px">${a.tp}</div></div>
        <button class="btn btn-s" style="padding:4px 9px;font-size:10.5px;color:${a.t};border-color:${a.t}40">Detail</button>
      </div>`).join('');
  }

  function renderMoodDetail(){
    const groups={
      '😊':{n:'Senang',list:['Fara Nugraha','Arini Ramadhani','Sinta Dewi']},
      '😐':{n:'Fokus',list:['Maya Widiani','Dika Budiman']},
      '😴':{n:'Lelah',list:['Lina Marlina']},
      '😑':{n:'Bosan',list:['Rizky Setiawan','Budi Prasetyo']},
    };
    const colors={'😊':['#EAF3DE','#2d6a0a'],'😐':['#E6F1FB','#185FA5'],'😴':['#FAEEDA','#7c4700'],'😑':['#FCEBEB','#9b2626']};
    document.getElementById('mood-detail-list').innerHTML=Object.entries(groups).map(([em,g])=>`
      <div style="margin-bottom:12px">
        <div style="font-size:12px;font-weight:700;color:var(--txt);margin-bottom:6px;display:flex;align-items:center;gap:6px">
          <span style="font-size:18px">${em}</span>${g.n}
          <span class="pill" style="background:${colors[em][0]};color:${colors[em][1]}">${g.list.length} siswa</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:5px">
          ${g.list.map(n=>`<span style="font-size:11px;padding:3px 9px;background:${colors[em][0]};color:${colors[em][1]};border-radius:20px;font-weight:500">${n}</span>`).join('')}
        </div>
      </div>`).join('');
  }

  // ─── MODAL ───
  function openStudentModal(id){
    const s=STUDENTS.find(x=>x.id===id);
    if(!s)return;
    document.getElementById('modal-title').innerHTML=`<div style="display:flex;align-items:center;gap:10px"><div class="ava" style="background:${s.c};color:${s.tc};width:36px;height:36px">${s.init}</div>${s.name}</div>`;
    document.getElementById('modal-body').innerHTML=`
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;margin-bottom:18px">
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:10px"><div style="font-size:20px;font-weight:800;color:var(--purple)">Lv.${s.lv}</div><div style="font-size:10.5px;color:var(--txt2);margin-top:2px">Level</div></div>
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:10px"><div style="font-size:20px;font-weight:800;color:var(--blue)">${s.pct}%</div><div style="font-size:10.5px;color:var(--txt2);margin-top:2px">Capaian</div></div>
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:10px"><div style="font-size:20px;font-weight:800;color:var(--amber)">${s.streak}🔥</div><div style="font-size:10.5px;color:var(--txt2);margin-top:2px">Streak</div></div>
        <div style="text-align:center;padding:12px;background:var(--bg);border-radius:10px"><div style="font-size:20px;font-weight:800;color:var(--navy)">${s.xp.toLocaleString()}</div><div style="font-size:10.5px;color:var(--txt2);margin-top:2px">XP</div></div>
      </div>
      <div style="margin-bottom:14px">
        <div style="font-size:12px;font-weight:700;color:var(--txt2);margin-bottom:8px">Penguasaan Kompetensi</div>
        ${['Matematika','IPA','IPS','B. Indonesia'].map((m,i)=>{const v=[88,72,55,90][i];return`
          <div class="prog-subject">
            <div class="prog-info">
              <div class="prog-name">${m}</div>
              <div class="prog-bar"><div class="prog-fill" style="width:${v}%;background:${pctColor(v)}"></div></div>
            </div>
            <div class="prog-pct">${v}%</div>
          </div>`}).join('')}
      </div>
      <div style="padding:13px;background:var(--bg);border-radius:10px;font-size:12.5px;color:var(--txt)"><b>Catatan Guru:</b> ${s.note}</div>
      <div style="display:flex;gap:8px;margin-top:16px">
        <button class="btn btn-s btn-full" onclick="closeModal()">Tutup</button>
        <button class="btn btn-p btn-full"><i class="ti ti-send"></i>Kirim Laporan</button>
      </div>`;
    document.getElementById('modal-ov').classList.add('show');
  }

  function closeModal(){document.getElementById('modal-ov').classList.remove('show')}

  // ─── NOTIF ───
  function toggleNotif(){document.getElementById('notif-panel').classList.toggle('show')}
  function closeNotif(){document.getElementById('notif-panel').classList.remove('show')}
  document.addEventListener('click',e=>{if(!e.target.closest('#notif-btn')&&!e.target.closest('#notif-panel'))closeNotif()});

  // ─── COUNTER ───
  function animCnt(id,target,suf='',dur=1200){
    const el=document.getElementById(id);if(!el)return;
    let s=0,steps=45,st=0;
    const tm=setInterval(()=>{st++;const v=Math.round(s+(target-s)*(st/steps));el.textContent=v+suf;if(st>=steps)clearInterval(tm);},dur/steps);
  }

  // ─── CHARTS ───
  const CHARTS = {};
  const FONT='Plus Jakarta Sans';
  const gridColor='rgba(0,0,0,0.04)';
  const tickFont={family:FONT,size:10};
  const legFont={family:FONT,size:11};

  function mkChart(id,cfg){
    if(CHARTS[id]){try{CHARTS[id].destroy();}catch(e){}}
    const el=document.getElementById(id);
    if(!el)return;
    CHARTS[id]=new Chart(el,cfg);
  }

  function initHomeCharts(){
    // Home charts used in `guru/guru.html`.
    // All canvas ids are verified there: ch-engage, ch-mood-d, ch-dist.
    mkChart('ch-engage',{type:'bar',data:{
      labels:['Sen','Sel','Rab','Kam','Jum','Sab','Min'],
      datasets:[
        {label:'Siswa Aktif',data:[22,27,19,28,30,12,5],backgroundColor:'#185FA5',borderRadius:7,borderSkipped:false},
        {label:'Misi Selesai',data:[18,24,15,25,28,8,3],backgroundColor:'#f5a623',borderRadius:7,borderSkipped:false},
      ]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:legFont}}},scales:{y:{grid:{color:gridColor},ticks:{font:tickFont}},x:{grid:{display:false},ticks:{font:{...tickFont,size:11}}}}}
    });

    mkChart('ch-mood-d',{type:'doughnut',data:{
      labels:['Senang','Fokus','Lelah','Bosan'],
      datasets:[{data:[14,8,5,3],backgroundColor:['#2d6a0a','#185FA5','#7c4700','#9b2626'],borderWidth:0,hoverOffset:4}]},
      options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{display:false}}}
    });

    mkChart('ch-dist',{type:'radar',data:{
      labels:['Matematika','IPA','IPS','B. Indo','Seni'],
      datasets:[{label:'Rata-rata',data:[74,69,62,82,77],borderColor:'#4a41b0',backgroundColor:'rgba(74,65,176,0.15)',pointBackgroundColor:'#4a41b0',pointRadius:5}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{ticks:{display:false,font:tickFont},grid:{color:'rgba(0,0,0,0.06)'},pointLabels:{font:{...tickFont,size:11,weight:'600'}}}}}
    });
  }


  function initChart(id){
    if(id==='ch-monthly') mkChart('ch-monthly',{type:'line',data:{
      labels:['Feb','Mar','Apr','Mei','Jun'],
      datasets:[
        {label:'Capaian (%)',data:[58,62,67,70,74],borderColor:'#185FA5',backgroundColor:'rgba(24,95,165,.1)',fill:true,tension:.4,pointRadius:5,pointBackgroundColor:'#185FA5'},
        {label:'Keterlibatan (%)',data:[65,70,72,78,85],borderColor:'#f5a623',backgroundColor:'rgba(245,166,35,.08)',fill:true,tension:.4,pointRadius:5,pointBackgroundColor:'#f5a623'},
      ]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:legFont}}},scales:{y:{grid:{color:gridColor},ticks:{font:tickFont}},x:{grid:{display:false},ticks:{font:tickFont}}}}
    });

    if(id==='ch-radar') mkChart('ch-radar',{type:'radar',data:{
      labels:['Matematika','IPA','IPS','B. Indo','Seni'],
      datasets:[{label:'Rata-rata',data:[74,69,62,82,77],borderColor:'#4a41b0',backgroundColor:'rgba(74,65,176,.15)',pointBackgroundColor:'#4a41b0',pointRadius:5}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{r:{ticks:{display:false},grid:{color:'rgba(0,0,0,0.06)'},pointLabels:{font:{...tickFont,size:11,weight:'600'}}}}}
    });

    if(id==='ch-4w') mkChart('ch-4w',{type:'line',data:{
      labels:['M1 Mei','M2 Mei','M3 Mei','M4 Mei','M1 Jun','M2 Jun'],
      datasets:[{label:'Keterlibatan (%)',data:[72,75,70,78,80,85],borderColor:'#0a5e49',backgroundColor:'rgba(10,94,73,.1)',fill:true,tension:.4,pointRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{font:legFont}}},scales:{y:{grid:{color:gridColor},ticks:{font:tickFont}},x:{grid:{display:false},ticks:{font:tickFont}}}}
    });

    if(id==='ch-mood-h') mkChart('ch-mood-h',{type:'bar',data:{
      labels:['Sen','Sel','Rab','Kam','Jum','Sab','Min'],
      datasets:[
        {label:'Senang',data:[10,14,11,15,14,5,3],backgroundColor:'#2d6a0a',borderRadius:4},
        {label:'Fokus',data:[8,6,9,7,8,4,2],backgroundColor:'#185FA5',borderRadius:4},
        {label:'Lelah',data:[5,4,6,3,5,2,1],backgroundColor:'#7c4700',borderRadius:4},
        {label:'Bosan',data:[7,6,4,5,3,1,0],backgroundColor:'#9b2626',borderRadius:4},
      ]},
      options:{responsive:true,maintainAspectRatio:false,scales:{y:{stacked:true,grid:{color:gridColor},ticks:{font:tickFont}},x:{stacked:true,grid:{display:false},ticks:{font:tickFont}}},plugins:{legend:{labels:{font:legFont}}}}
    });

    if(id==='ch-nexcard') mkChart('ch-nexcard',{type:'bar',data:{
      labels:['Matematika','IPA','IPS','B. Indo','Lainnya'],
      datasets:[{label:'Kartu',data:[412,318,245,198,74],backgroundColor:['#185FA5','#2d6a0a','#7c4700','#4a41b0','#0a5e49'],borderRadius:6}]},
      options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:gridColor},ticks:{font:tickFont}},y:{grid:{display:false},ticks:{font:tickFont}}}}
    });

    if(id==='ch-nexbot') mkChart('ch-nexbot',{type:'line',data:{
      labels:['Sen','Sel','Rab','Kam','Jum','Sab'],
      datasets:[{label:'Sesi NexBot',data:[32,45,38,52,48,20],borderColor:'#4a41b0',backgroundColor:'rgba(74,65,176,.1)',fill:true,tension:.4,pointRadius:4}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{grid:{color:gridColor},ticks:{font:tickFont}},x:{grid:{display:false},ticks:{font:tickFont}}}}
    });
  }

  // ─── LIVE FEED ───
  const LIVE_POOL=[
    {icon:'ti-player-play',bg:'#E6F1FB',ic:'#185FA5',txt:'<b>Sinta D.</b> memulai sesi NexFlix Edu IPA',tm:'Baru saja'},
    {icon:'ti-trophy',bg:'#EAF3DE',ic:'#2d6a0a',txt:'<b>Arini R.</b> naik ke Level 9!',tm:'Baru saja'},
    {icon:'ti-notebook',bg:'#EEEDFE',ic:'#4a41b0',txt:'<b>Ayah Dika</b> mengirim jurnal harian',tm:'Baru saja'},
    {icon:'ti-flame',bg:'#FAEEDA',ic:'#7c4700',txt:'<b>Maya W.</b> streak 10 hari!',tm:'Baru saja'},
    {icon:'ti-cards',bg:'#EAF3DE',ic:'#2d6a0a',txt:'<b>Fara N.</b> mendapatkan NexCard Matematika Rare',tm:'Baru saja'},
  ];
  let liIdx=0;
  function addLive(){
    const feed=document.getElementById('live-feed');if(!feed)return;
    const a=LIVE_POOL[liIdx%LIVE_POOL.length];liIdx++;
    const d=document.createElement('div');
    d.className='ai';
    d.innerHTML=`<div class="aico" style="background:${a.bg};color:${a.ic}"><i class="ti ${a.icon}"></i></div><div class="abody"><div class="atxt">${a.txt}</div><div class="atm">${a.tm}</div></div>`;
    feed.insertBefore(d,feed.firstChild);
    if(feed.children.length>5)feed.removeChild(feed.lastChild);
  }

  function init(){
    renderHomeSlist();
    renderActivitiesFeed();
    renderLeaderboard();
    animCnt('c-aktif',28);
    animCnt('c-capaian',74,'%');
    animCnt('c-nexcard',142);
    animCnt('c-perhatian',3);
    // banner values rely on dataset widths, let charts init after layout
    setTimeout(initHomeCharts,150);
    setInterval(addLive,7000);
    initialized['dashboard']=true;

    document.querySelectorAll('.sb-item').forEach(el=>{
      el.addEventListener('click',()=>showSec(el.dataset.sec));
    });
  }

  // expose some handlers used inline in HTML
  window.showSec = showSec;
  window.ptab = ptab;
  window.openStudentModal = openStudentModal;
  window.closeModal = closeModal;
  window.toggleNotif = toggleNotif;

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

