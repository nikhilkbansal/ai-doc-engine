
import { db } from "@/lib/db";
import { docs } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

export async function getActiveDocs () {
  return await db
    .select()
    .from(docs)
    .where(eq(docs.isStale, false))
    .orderBy(desc(docs.createdAt))
    .limit(10);
}