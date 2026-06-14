-- NEXORA Database Schema (MySQL / phpMyAdmin)
-- Catatan: jalankan di phpMyAdmin -> Import -> file ini.

CREATE DATABASE IF NOT EXISTS nexora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nexora;

-- =========================
-- 1) USERS (ortu & guru)
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  role ENUM('ortu','guru') NOT NULL,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) UNIQUE,
  phone VARCHAR(40),
  password_hash VARCHAR(255),
  school VARCHAR(160),
  class_name VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- 2) SCHOOLS / CLASSES
-- =========================
CREATE TABLE IF NOT EXISTS classes (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  school VARCHAR(160) NOT NULL,
  class_name VARCHAR(80) NOT NULL,
  semester VARCHAR(40) DEFAULT 'Semester 1',
  academic_year VARCHAR(20) DEFAULT '2025/2026',
  UNIQUE KEY uniq_school_class (school, class_name)
) ENGINE=InnoDB;

-- =========================
-- 3) CHILDREN / SISWA
-- =========================
CREATE TABLE IF NOT EXISTS children (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  class_id BIGINT UNSIGNED NOT NULL,
  ortu_user_id BIGINT UNSIGNED,
  guru_user_id BIGINT UNSIGNED,
  name VARCHAR(120) NOT NULL,
  init VARCHAR(10),
  gender ENUM('M','F','X') DEFAULT 'X',
  birthday DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_children_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_children_ortu FOREIGN KEY (ortu_user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_children_guru FOREIGN KEY (guru_user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE KEY uniq_child_class_init (class_id, init)
) ENGINE=InnoDB;

-- =========================
-- 4) MAPEL
-- =========================
CREATE TABLE IF NOT EXISTS mapels (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  icon VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_mapel_name (name)
) ENGINE=InnoDB;

-- =========================
-- 5) MATERI
-- =========================
CREATE TABLE IF NOT EXISTS materias (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  mapel_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(160) NOT NULL,
  level_label VARCHAR(40),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_materias_mapel FOREIGN KEY (mapel_id) REFERENCES mapels(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 6) MATERI & PROGRES (per anak per mapel)
-- =========================
CREATE TABLE IF NOT EXISTS child_progress (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  mapel_id BIGINT UNSIGNED NOT NULL,
  pct DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  xp INT UNSIGNED NOT NULL DEFAULT 0,
  streak INT UNSIGNED NOT NULL DEFAULT 0,
  last_studied_at DATE,
  kkm INT UNSIGNED NOT NULL DEFAULT 70,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cp_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cp_mapel FOREIGN KEY (mapel_id) REFERENCES mapels(id) ON DELETE RESTRICT ON UPDATE CASCADE,
  UNIQUE KEY uniq_child_mapel (child_id, mapel_id)
) ENGINE=InnoDB;

-- =========================
-- 7) JURNAL (ortu -> anak)
-- =========================
CREATE TABLE IF NOT EXISTS journals (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  ortu_user_id BIGINT UNSIGNED,
  journal_date DATE NOT NULL,
  mood ENUM('happy','focus','tired','bored','other') DEFAULT 'other',
  duration_min INT UNSIGNED,
  kondisi TEXT,
  notes TEXT,
  kegiatan TEXT,
  portfolio_ref VARCHAR(160),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_journal_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_journal_ortu FOREIGN KEY (ortu_user_id) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
  UNIQUE KEY uniq_journal_child_date (child_id, journal_date)
) ENGINE=InnoDB;

-- =========================
-- 8) PORTOFOLIO
-- =========================
CREATE TABLE IF NOT EXISTS portfolios (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  mapel_id BIGINT UNSIGNED,
  name VARCHAR(160) NOT NULL,
  description TEXT,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_port_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_port_mapel FOREIGN KEY (mapel_id) REFERENCES mapels(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 9) LAPORAN GURU
-- =========================
CREATE TABLE IF NOT EXISTS teacher_reports (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  guru_user_id BIGINT UNSIGNED NOT NULL,
  report_period VARCHAR(40) NOT NULL,
  summary TEXT,
  eval_text TEXT,
  study_style ENUM('Visual','Auditory','Kinestetik','Reading/Writing','Other') DEFAULT 'Other',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_tr_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_tr_guru FOREIGN KEY (guru_user_id) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 10) REKOMENDASI (bagian laporan)
-- =========================
CREATE TABLE IF NOT EXISTS teacher_report_recos (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  teacher_report_id BIGINT UNSIGNED NOT NULL,
  category ENUM('Belajar','Aktivitas','Bacaan','Reward','Other') DEFAULT 'Other',
  icon VARCHAR(80),
  suggestion TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_trr_report FOREIGN KEY (teacher_report_id) REFERENCES teacher_reports(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 11) NexCard + anak memilikinya
-- =========================
CREATE TABLE IF NOT EXISTS nexcards (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  mapel_id BIGINT UNSIGNED,
  icon VARCHAR(80),
  color_hint VARCHAR(40),
  is_new TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_card_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS child_nexcards (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  nexcards_id BIGINT UNSIGNED NOT NULL,
  earned_at DATE NOT NULL,
  source VARCHAR(40) DEFAULT 'system',
  UNIQUE KEY uniq_child_card (child_id, nexcards_id),
  CONSTRAINT fk_cnc_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_cnc_card FOREIGN KEY (nexcards_id) REFERENCES nexcards(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 12) MOOD (rekap)
-- =========================
CREATE TABLE IF NOT EXISTS moods (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  mood_date DATE NOT NULL,
  mood ENUM('happy','focus','tired','bored','other') DEFAULT 'other',
  score INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_mood_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uniq_mood_child_date (child_id, mood_date)
) ENGINE=InnoDB;

-- =========================
-- 13) AKTIVITAS
-- =========================
CREATE TABLE IF NOT EXISTS activities (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  child_id BIGINT UNSIGNED NOT NULL,
  activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activity_type ENUM('study','mission','badge','nexcard','system','other') DEFAULT 'other',
  title VARCHAR(160) NOT NULL,
  detail TEXT,
  xp_delta INT,
  duration_min INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_act_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================
-- 14) NOTIF
-- =========================
CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  child_id BIGINT UNSIGNED,
  notif_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type ENUM('achievement','report','mood','jurnal','system','other') DEFAULT 'other',
  title VARCHAR(200) NOT NULL,
  body TEXT,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_notif_child FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE SET NULL ON UPDATE CASCADE,
  KEY idx_notif_user_read (user_id, is_read)
) ENGINE=InnoDB;

-- =========================
-- 15) AGENDA / KALENDAR
-- =========================
CREATE TABLE IF NOT EXISTS events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  class_id BIGINT UNSIGNED NOT NULL,
  event_date DATE NOT NULL,
  title VARCHAR(160) NOT NULL,
  event_type ENUM('Ujian','Belajar','Tugas','Acara','Other') DEFAULT 'Other',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_events_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE KEY uniq_class_date_title (class_id, event_date, title)
) ENGINE=InnoDB;

-- =========================
-- Indexes tambahan
-- =========================
CREATE INDEX IF NOT EXISTS idx_children_class ON children(class_id);
CREATE INDEX IF NOT EXISTS idx_progress_child ON child_progress(child_id);
CREATE INDEX IF NOT EXISTS idx_journal_child_date ON journals(child_id, journal_date);
CREATE INDEX IF NOT EXISTS idx_activity_child_time ON activities(child_id, activity_at);

-- =========================
-- Minimal seed contoh (opsional)
-- =========================
-- Biarkan kosong kalau kamu mau isi manual.
-- =========================

