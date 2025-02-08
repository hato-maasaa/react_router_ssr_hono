import { Hono } from "hono";
import type { HonoEnv } from "../load-context";
import { authMiddleware } from "./middleware";

const app = new Hono<HonoEnv>();

app.use(authMiddleware);

const routes = app.get("/sample", (c) => {
   return  c.json({ message: "Hello, World!" });
});

export type AppType = typeof routes

export default app;