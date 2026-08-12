import { db } from "@/lib/db";
import { docs } from "@/lib/schema";
import { eq } from 'drizzle-orm';


type PageProps = {
    params: Promise<{id : string}>
}

export default async function pageParams ({ params } : PageProps ){
    const {id} = await params;
    const doc  = await db.select().from(docs).where(eq(docs.id, id))
    const foundDoc = doc[0]
    return (<h1>{foundDoc ? foundDoc.title : 'DOC not found'}</h1>)
}