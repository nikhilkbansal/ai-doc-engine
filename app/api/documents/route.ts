import { db } from "@/lib/db";
import { docs } from "@/lib/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const Schema = z.object({
  title: z.string().min(1, "title is required"),
  content: z.string().min(1, "content is required"),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const offSet = (page - 1) * limit;

  const allDocs = await db.select().from(docs).limit(limit).offset(offSet);

  return NextResponse.json({
    data: allDocs,
    page,
    limit,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const result = Schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({
      error: result.error.issues,
      status: 400,
    });
  }
  const [newDoc] = await db.insert(docs).values({
    id: crypto.randomUUID(),
    source: "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
    isStale: false,
    title: result.data.title,
    content: result.data.content,
  }).returning();

  return NextResponse.json(newDoc, {status: 201})
}