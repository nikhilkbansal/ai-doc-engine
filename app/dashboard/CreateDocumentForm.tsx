"use client";
import { useActionState } from "react";
import { ActionState } from "../actions";
import createDocument from "../actions";

export default function CreateDocumentForm() {
  const [state, formAction] = useActionState<ActionState, FormData>(
    createDocument,
    null,
  );
  return (
    <div>
      <form action={formAction}>
      <div>
        <input name="title" placeholder="enter title" />
        {state?.errors?.title && (
          <p style={{ color: "red" }}>{state.errors.title[0]}</p>
        )}
      </div>
      <div>
        <input name="content" placeholder="enter content" />
        {state?.errors?.content && (
          <p style={{ color: "red" }}>{state.errors.content[0]}</p>
        )}
      </div>
      <button type="submit"> Create </button>
      {state?.success && (<p style={{color: 'green'}}> created successfully</p>)}
      </form>
    </div>
  );
}
