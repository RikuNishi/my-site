# NBA Today スコア & スタッツセンター

## 概要
このリポジトリは NBA スコアボード風の UI を備えたシングルページアプリです。  
Express + SQLite の API サーバーを同梱しており、ブラウザ側は `/api/games` や `/api/games/:id/stats` にアクセスしてスコアや詳細スタッツを取得します。

## セットアップ & 実行
1. 依存インストール  
   ```bash
   npm install
   ```
2. データベース初期化（必要なときのみ）  
   ```bash
   sqlite3 data/nba.db < data/init.sql
   ```
   - `data/init.sql` には `games` / `leaders` テーブル定義とサンプルデータの INSERT が含まれます。
   - 内容を更新した後は再度上記コマンドで `nba.db` を再生成してください。
3. サーバー起動  
   ```bash
   npm start
   # => http://localhost:3000
   ```
   - `server.js` が静的ファイル配信と API エンドポイントを兼ねています。
   - GitHub Pages のような静的ホスティングでは Express/SQLite を動かせないため、この構成のままではデプロイできません。必要に応じて Render/Vercel などの Node.js ランタイムにデプロイし、フロントの fetch 先 URL を合わせてください。

## データ構造
- `data/nba.db`
  - SQLite データベース本体。`games` テーブルにスコア・会場・日付、`leaders` テーブルに各試合の PTS/REB/AST リーダーを保持。
  - `/api/games` `/api/leaders` はこの DB を直接参照します。
- `data/init.sql`
  - 上記 DB を作り直すためのスクリプト。`PRAGMA`→`DROP TABLE`→`CREATE TABLE`→`INSERT` まで含むので、流し込むだけで同じ状態を再現できます。
- `data/player-stats.json`
  - `/api/games/:id/stats` 用の詳細スタッツ。各試合ごとにサマリーカード、チーム別プレイヤー行、ヘッドショット URL を記載しています。トップパフォーマーのサムネイルや詳細ビューはここから生成されます。

## ディレクトリ構成メモ
- `index.html` / `styles.css`: フロント UI とインタラクション。日付・ステータスフィルター、クリック展開カード、トップパフォーマーの表示などを担当。
- `server.js`: Express エントリーポイント。静的配信 + API（`/api/games`, `/api/leaders`, `/api/games/:id/stats`）。
- `AGENTS.md`: コントリビューター向けメモ（回答は日本語で、など）。
- `particles.js` などその他のファイルは現在 UI には読み込まれていません。

## デプロイに関する注意
- そのまま GitHub Pages に push しても API が存在しないため UI が動作しません。
- 外部に API をホストするか、完全静的な JSON 取得方式に改修する必要があります。

## メンテナンスヒント
- スコアやスタッツを更新するときは `data/init.sql` と `data/nba.db` の整合性を保ってください。
- 詳細スタッツ（プレイヤー・写真）を差し替える場合は `data/player-stats.json` を更新し、必要ならヘッドショット URL も `index.html` の `headshotOverrides` に追加してください。
