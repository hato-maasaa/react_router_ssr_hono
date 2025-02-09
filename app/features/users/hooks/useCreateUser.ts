import { useForm, type SubmissionResult } from "@conform-to/react"
import { getZodConstraint, parseWithZod } from "@conform-to/zod"
import { createUserSchema } from "~/schemas/createUserSchema"

export const useCreateUser = (lastResult?: SubmissionResult<string[]>) => {
    return useForm({
        constraint: getZodConstraint(createUserSchema),
        lastResult,
        shouldValidate: "onSubmit",
        shouldRevalidate: "onInput",
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: createUserSchema });
        },
    })
}