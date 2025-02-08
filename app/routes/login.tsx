import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";

export async function action({
  request,
  context: { sessionCookie },
}: Route.ActionArgs) {
  const formData = await request.formData();

  return redirect("/private", {
    headers: {
      "Set-Cookie": await sessionCookie.serialize(
        formData.get("username") as string,
      ),
    },
  }) as Response;
}

export default function Login() {
  return (
    <div className="p-5">
      <Form method="post" className="flex w-fit flex-col gap-4">
        <input
          name="username"
          type="text"
          className="grow"
          placeholder="ユーザー名"
          required
        />

        <button type="submit" className="btn btn-neutral">
          ログイン
        </button>
      </Form>
    </div>
  );
}