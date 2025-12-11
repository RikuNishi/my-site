const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.join(__dirname, 'data', 'nba.db'));

app.use(express.static(__dirname));

app.get('/api/games', (req, res) => {
  const date = req.query.date; // optional
  const params = [];
  let sql = `SELECT * FROM games`;
  if (date) {
    sql += ' WHERE game_date = ?';
    params.push(date);
  }
  sql += ' ORDER BY game_date DESC, id ASC';
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/leaders', (req, res) => {
  const gameId = req.query.game_id;
  if (!gameId) return res.status(400).json({ error: 'game_id is required' });
  db.all(`SELECT * FROM leaders WHERE game_id = ? ORDER BY category`, [gameId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
