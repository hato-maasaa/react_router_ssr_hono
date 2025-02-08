import { hc } from "hono/client";
import type { AppType } from "server";

/**
 * honoRPCを利用するための変数です
 * urlは環境に合わせて変更してください
 */
export const apiClient = hc<AppType>('http://localhost:5173/');
