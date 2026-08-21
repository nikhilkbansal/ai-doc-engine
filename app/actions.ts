"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { docs, webhookEvents } from "@/lib/schema";

export type ActionResult = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  success?: boolean;
  error?: string;
};

export type ActionState = ActionResult | null;

const Schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
});
export default async function createDocument(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };

  const result = Schema.safeParse(rawData);
  if (!result.success) {
    console.log("Validation errors:", result.error.issues);
    const errors: { title?: string[]; content?: string[] } = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as "title" | "content";
      if (!errors[field]) errors[field] = [];
      errors[field]!.push(issue.message);
    });
    return { errors };
  }

  const { title, content } = result.data;
  console.log("validated title and content", title, content);
  await db.insert(docs).values({
    id: crypto.randomUUID(),
    title: title,
    content: content,
    source: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
    isStale: false,
  });
  revalidatePath("/dashboard");
  return { success: true };
}

export async function createWebhookEventWithDoc(
  repositoryId: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionResult> {

    console.log('repositoryId:', repositoryId)
  console.log('title:', formData.get('title'))
  console.log('content:', formData.get('content'))
  const rawData = {
    title: formData.get("title"),
    content: formData.get("content"),
  };
  const result = Schema.safeParse(rawData);
  if (!result.success) {
    console.log("Validation errors:", result.error.issues);
    const errors: { title?: string[]; content?: string[] } = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as "title" | "content";
      if (!errors[field]) errors[field] = [];
      errors[field]!.push(issue.message);
    });
    return { errors };
  }

  const { title, content } = result.data;
console.log('before transaction', title, content)
  try {
    await db.transaction(async (tx) => {
        console.log('transaction started')

      const [event] = await tx
        .insert(webhookEvents)
        .values({
          id: crypto.randomUUID(),
          type: "pr_merged",
          repositoryId: repositoryId,
          createdAt: new Date(),
          eventProcessed: false,
          payload: {},
        })
        .returning();
      if (!event) throw new Error("Failed to insert webhook event");
      await tx.insert(docs).values({
        id: crypto.randomUUID(),
        title: title,
        content: content,
        source: "ai_generated",
        webHookEventId: event.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isStale: false,
      });
      console.log('doc inserted')
    });
    return { success: true };
  } catch (error) {
    console.log('transaction error:', error)
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
