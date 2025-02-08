# rr7-hono-for-cloudflare
react router v7(rr7)からssrに対応したので、rr7とhonoを用いてCloudflare Pagesにデプロイするためのテンプレートを作成しました

## feature
- 🤖 vitest is very fast 
- 🎉 TailwindCSS for styling
- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default

## セットアップ
### インストール
```sh
npm install
```
### devサーバー起動
```sh
npm run dev
```
### ビルド実行
```sh
npm run build
```

## デプロイ方法
ここは後で追加


## システム仕様
1. 認証形式
honoのmiddlewareを利用してユーザの認証をすることができる

2. Linkを用いたナビゲーションについて
```bash
<Link to="/private" reloadDocument>
```
のように[reloadDocument]を用いないナビゲーションが利用できないので注意をしてください
