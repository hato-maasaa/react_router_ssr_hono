import type { Context } from "hono";
import type { Next } from "hono/types";
import type { HonoEnv } from "load-context";
import { redirect } from "react-router";
import { SessionCookie } from "~/cookie.server";
import { singleFetchRedirect } from "~/util/navigation/redirect";

type ContextType = Context<HonoEnv, never, {}>; 

/**
 * 認証ミドルウェア
 */
export const authMiddleware = async (c: ContextType, next:Next) => {
    const url = new URL(c.req.url);
  
    if (!url.pathname.startsWith("/private")) {
      return next();
    }
  
    const userName = await SessionCookie(
      c.env.SESSION_COOKIE_SECRETS,
      c.env.APP_ENV === "production",
    ).parse(c.req.header("Cookie") ?? "");
    if (userName) {
      c.set("userName", userName);
      return next();
    }
  
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