import { Hono } from "hono";
import type { HonoEnv } from "../load-context";
import { authMiddleware } from "./middleware";

const app = new Hono<HonoEnv>();

app.use(authMiddleware);

export default app;