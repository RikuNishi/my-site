PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS leaders;
DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_date TEXT NOT NULL,
  home_team TEXT NOT NULL,
  away_team TEXT NOT NULL,
  home_score INTEGER NOT NULL,
  away_score INTEGER NOT NULL,
  venue TEXT,
  status TEXT DEFAULT '終了',
  source TEXT
);

CREATE TABLE leaders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_id INTEGER NOT NULL,
  category TEXT NOT NULL, -- PTS / REB / AST
  player TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- 2025-12-10
INSERT INTO games (game_date, home_team, away_team, home_score, away_score, venue, source)
VALUES
('2025-12-10','サンダー','サンズ',138,89,'Paycom Center','ESPN / NBA.com'),
('2025-12-10','レイカーズ','スパーズ',119,132,'Crypto.com Arena','Reuters / ESPN');

INSERT INTO leaders (game_id, category, player, value) VALUES
(1,'PTS','シェイ・ギルジャス＝アレクサンダー', '28'),
(1,'REB','チェット・ホルムグレン', '8'),
(1,'AST','シェイ・ギルジャス＝アレクサンダー', '8'),
(2,'PTS','ステフォン・キャッスル', '30'),
(2,'REB','ステフォン・キャッスル', '10'),
(2,'AST','ルカ・ドンチッチ', '8');

-- 2025-12-09
INSERT INTO games (game_date, home_team, away_team, home_score, away_score, venue, source)
VALUES
('2025-12-09','マジック','ヒート',117,108,'Kia Center','AP / ESPN'),
('2025-12-09','ラプターズ','ニックス',101,117,'Scotiabank Arena','ESPN');

INSERT INTO leaders (game_id, category, player, value) VALUES
(3,'PTS','デズモンド・ベイン', '37'),
(3,'REB','不明', '-'),
(3,'AST','不明', '-'),
(4,'PTS','ジェイレン・ブランソン', '35'),
(4,'REB','カール=アンソニー・タウンズ', '16'),
(4,'AST','不明', '-');
