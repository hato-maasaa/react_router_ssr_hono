import { useActionData } from "react-router";
import type { Route } from "./+types/private";
import { apiClient } from "app/lib/apiClient";
import { createUserSchema } from "schemas/createUserSchema";
import { parseWithZod } from "@conform-to/zod";
import { CreateUserForm } from "../features/users/components/createUserForm";

/**
 * action関数を実行後、画面のレンダリングが行われるので
 * コンポーネント単位でレンダリングを行いたいときはuseActionDataを使う
 */
export async function action({request}: Route.ActionArgs)  {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: createUserSchema});

  if (submission.status !== "success") {
    return submission.reply();
  }

  // postリクエスト
  const res = await apiClient.user[":id"].$post({ json : { name: submission.value.name, email: submission.value.email, age: submission.value.age }, param: { id: "1" }});
  const { user } = await res.json();
  console.log("user:", user);
}

export async function loader({ context }: Route.LoaderArgs) {
  // paramを使ったgetリクエスト
  const userRes = await apiClient.user[":id"].$get({ param: { id: "1" }});
  const { userID } = await userRes.json();

  // queryを使ったgetリクエスト
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
      <CreateUserForm lastResult={createUserResult} />
    </div>
  );
}