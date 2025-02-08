このリポジトリはreact-routerとHonoを用いてフルスタックにシステム開発をすることができるようにしています。

cloudflare workerを利用することを前提として作成しています。

## プロジェクト構成
```
.
┗━ product/
    ├── server/ # API サーバー
    └── app/ # フロントエンド
```
## ツール
1. パッケージ管理ツール: npm

## セットアップ
#### インストール
```sh
npm install
```

#### 開発サーバーの構築
werietを用いて各プロジェクトの依存関係は管理しているので、rootディレクトリだけで問題ないです。
```sh
npm run dev
```

## アーキテクチャ
### API
APIは従来のREST APIではなくRPCを採用しています
APIコールの際は以下のように呼び出しをしてください

```sh
const getUser =  async (userID: string) => {
    const res = await apiClient.user.$get(userID);

    const user = res.json();

    return user
}
```
