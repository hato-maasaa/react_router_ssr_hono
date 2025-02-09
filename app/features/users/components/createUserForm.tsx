import { Form } from "react-router"
import { useCreateUser } from "../hooks/useCreateUser";
import { getFormProps, type SubmissionResult } from "@conform-to/react";
import { InputForm } from "~/app/components/form/InputForm";

type CreateUserFormProps = {
    lastResult?: SubmissionResult<string[]>;
};

export const CreateUserForm = ({ lastResult }: CreateUserFormProps) => {
    const [form, fields] = useCreateUser(lastResult);

    return (

    <Form method="post" {...getFormProps(form)} className="mt-5">
        <label>名前</label>
        <InputForm
            field={fields.name}
            placeholder="山田太郎"
            type="text"
        />

        <label>メールアドレス</label>
        <InputForm
            field={fields.email}
            placeholder="your-mail-adress@sample.com"
            type="email"
        />

        <label>年齢</label>
        <InputForm
            field={fields.age}
            placeholder="your-mail-adress@sample.com"
            type="email"
        />

        <button type="submit">登録</button>
    </Form>
    )
}