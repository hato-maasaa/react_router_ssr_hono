import { z } from "zod";

export const getWhetherSchema = z.object({
    prefectureID: z.string(),
});