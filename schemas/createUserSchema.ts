import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().int().positive().min(18, {message: "未成年は登録できません"}),
});