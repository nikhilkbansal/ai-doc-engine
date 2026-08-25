import { db } from "@/lib/db";
import { docs } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const doc = await db.select().from(docs).where(eq(docs.id, id));
  if (!doc) {
  return NextResponse.json({ error: 'Document not found' }, { status: 404 })
}
  return NextResponse.json(doc, { status: 200 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const [updatedDoc] = await db
    .update(docs)
    .set({ title: body.title })
    .where(eq(docs.id, id))
    .returning();
  return NextResponse.json(updatedDoc, { status: 200 });
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await db.delete(docs).where(eq(docs.id, id));
  return NextResponse.json(null, { status: 204 });
}
