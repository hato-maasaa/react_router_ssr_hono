import { hc } from "hono/client";
import type { AppType } from "server";

export const apiClient = hc<AppType>('http://localhost:5173/');
