import { Hono } from "hono";
import type { HonoEnv } from "~/load-context";
import { authMiddleware } from "server/middleware";
import { zValidator } from "@hono/zod-validator";
import { getUserSchema } from "schemas/getUserSchema";
import { getWhetherSchema } from "schemas/getWhetherSchema";
import { createUserSchema } from "schemas/createUserSchema";

const app = new Hono<HonoEnv>();

app.use(authMiddleware);

const routes = app
    .post("/user/:id", zValidator("json", createUserSchema), zValidator("param", getUserSchema),  (c) => {
      const formData = c.req.valid("json");
      return c.json({ user: formData });
    })
    .post("/sample", (c) => {
        return c.json({ message: "Hello, World!" });
    })
    .get("/sample", (c) => {
        return  c.json({ message: "Hello, World!" });
    })
    .get("/user/:id", zValidator("param", getUserSchema), (c) => {
      return c.json({ userID: c.req.param("id") });
    })
    .get("/whether", zValidator("query", getWhetherSchema), (c) => {
      console.log("whether");
      return c.json({ whether: c.req.query("prefectureID") });
    });

export type AppType = typeof routes

export default app;