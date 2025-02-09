import { Form, useActionData } from "react-router";
import type { Route } from "./+types/private";
import { apiClient } from "app/lib/apiClient";
import { createUserSchema } from "schemas/createUserSchema";
import { parseWithZod } from "@conform-to/zod";

export async function action({request}: Route.ActionArgs)  {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: createUserSchema});

  if (submission.status !== "success") {
    console.error("Failed to create user");
    return submission.reply();
  }

  const res = await apiClient.sample.$post({ form: { name: submission.value.name, email: submission.value.email, age: submission.value.age.toString() }});
  const { user } = await res.json();
  console.log(user);
}

export async function loader({ context }: Route.LoaderArgs) {
  const userRes = await apiClient.user[":id"].$get({ param: { id: "1" }});
  const { userID } = await userRes.json();

  const whetherRes = await apiClient.whether.$get({ query: { prefectureID: "1" }});
  const { whether } = await whetherRes.json();

  return { userName: context.hono.context.get("userName"), userID, whether };
}

export default function Private({ loaderData }: Route.ComponentProps) {
  const createUserResult = useActionData<typeof action>();

  return (
    <div className="p-5">
      <h1 className="mb-5 text-4xl">ダッシュボード</h1>
      <p>ようこそ、{loaderData.userName}さん</p>
      <p>ユーザーID: {loaderData.userID}</p>
      <p>天気ID: {loaderData.whether}</p>
      <Form method="post" className="mt-5">
        <label>名前</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" />
        <label>メールアドレス</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" />
        <label>年齢</label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="age" />

        <button type="submit">登録</button>
      </Form>
    </div>
  );
}