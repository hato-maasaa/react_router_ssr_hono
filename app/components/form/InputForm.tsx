import type { FieldMetadata } from "@conform-to/react";

import { Input } from "app/components/general/Input";
import { Text } from "app/components/general/Typography";
import { VStack } from "app/components/layout/VStack";

type InputFormProps = {
  placeholder: string;
  type?: "email" | "password" | "text";
  field: FieldMetadata<string| number>;
};

export const InputForm = ({ placeholder, type, field }: InputFormProps) => {
  return (
    <VStack gap={1}>
      <Input
        id={field.id}
        placeholder={placeholder}
        type={type}
        name={field.name}
        defaultValue={field.initialValue}
        aria-invalid={undefined}
        aria-describedby={undefined}
      />
      {field.errors?.map((error, index) => (
        <Text id={field.id} key={index} size="sm" color="destructive">
          * {error}
        </Text>
      ))}
    </VStack>
  );
};
