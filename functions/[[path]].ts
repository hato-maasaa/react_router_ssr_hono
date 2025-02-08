// functions/[[path]].ts
import handle from "hono-react-router-adapter/cloudflare-pages";
import * as build from "../build/server";
import { getLoadContext } from "../load-context";
import server from "../server";

/**
 * Cloudflare Pages 用のエントリーポイント
 * こちらの設定をすることによって、Cloudflare Pages でのビルド時にエントリーポイントとして利用されます。
 */
export const onRequest = handle(build, server, { getLoadContext });