"use client";

import { useActionState } from "react";
import { createWebhookEventWithDoc } from "../../actions";
import { ActionState } from "../../actions";

type Props = {
  repositoryId: string; // comes from the page via props
};

export default function CreateWebhookForm({ repositoryId }: Props) {
  const boundAction = createWebhookEventWithDoc.bind(null, repositoryId);
  const [state, formAction] = useActionState<ActionState, FormData>(
    boundAction,
    null,
  );
  return (
    <div>
      <form action={formAction}>
      <input name="title" placeholder="enter repository title" />
      {state?.errors?.title && (
        <p style={{ color: "red" }}>{state?.errors?.title[0]}</p>
      )}
      <input name="content" placeholder="enter repository content" />
      {state?.errors?.content && (
        <p style={{ color: "red" }}>{state?.errors?.content[0]}</p>
      )}
      <button type="submit"> Create </button>
      {state?.success && (
        <p style={{ color: "green" }}> created successfully</p>
      )}
      </form>
    </div>
  );
}
