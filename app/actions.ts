"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const Schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
});
export default async function createDocument(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const result = Schema.safeParse(rawData);
  if (!result.success) {
    console.log('Validation errors:', result.error.issues);
    return
  }

  const { title, content } = result.data;
  console.log("validated title and content", title, content);
  revalidatePath("/dashboard");
}
