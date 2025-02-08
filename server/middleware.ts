import type { Context } from "hono";
import type { Next } from "hono/types";
import type { HonoEnv } from "load-context";
import { redirect } from "react-router";
import { SessionCookie } from "~/cookie.server";
import { singleFetchRedirect } from "~/util/navigation/redirect";

type ContextType = Context<HonoEnv, never, {}>; 

export const authMiddleware = async (c: ContextType, next:Next) => {
    const url = new URL(c.req.url);
  
    // 認証が不要なページはスキップ
    if (!url.pathname.startsWith("/private")) {
      return next();
    }
  
    // クッキーからセッションデータを取得
    const userName = await SessionCookie(
      c.env.SESSION_COOKIE_SECRETS,
      c.env.APP_ENV === "production",
    ).parse(c.req.header("Cookie") ?? "");
    if (userName) {
      c.set("userName", userName);
      return next();
    }
  
    // 認証に失敗した場合はログイン画面へリダイレクト
    const redirectResponse = redirect("/login");
  
    // HTML要求ではない場合はfetchリクエストへのレスポンスを返す
    if (!c.req.header("Accept")?.includes("text/html")) {
      // シングルフェッチリクエストの場合はシングルフェッチのデータ形式で返す
      if (url.pathname.endsWith(".data")) {
        return singleFetchRedirect(redirectResponse);
      }
      return new Response("Unauthorized", { status: 401 });
    }
  
    return redirectResponse;
  }