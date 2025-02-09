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
    .get("/sample", (c) => {
        return  c.json({ message: "Hello, World!" });
    })
    .get("/user/:id", zValidator("param", getUserSchema), (c) => {
      return c.json({ userID: c.req.param("id") });
    })
    .get("/whether", zValidator("query", getWhetherSchema), (c) => {
      return c.json({ whether: c.req.query("prefectureID") });
    })
    .post("/sample", zValidator("form", createUserSchema),  (c) => {
      const formData = c.req.valid("form");
      console.log(typeof formData.age);
      return c.json({ user: formData });
    });

export type AppType = typeof routes

export default app;