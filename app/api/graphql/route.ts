import { db } from "@/lib/db";
import { docs } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { createSchema, createYoga } from "graphql-yoga";

const schema = createSchema({
  typeDefs: `
    type Document {
      id: String!
  source: String!
  createdAt: String!
  updatedAt: String!
  isStale: Boolean!
  repositoryId: String
  webHookEventId: String
  title: String!
  content: String!
    }

    type Query {
documents: [Document!]!
document(id: String!): Document
    }

    type Mutation {
    document(title: String!, content: String!): Document!
    }
    `,
  resolvers: {
    Query: {
      documents: async () => {
        return await db.select().from(docs);
      },
      document: async (_: unknown, { id }) => {
        const [doc] =  await db.select().from(docs).where(eq(docs.id, id));
        return doc ?? null;
      },
    },
    Mutation: {
      document: async (_: unknown, { title, content }) => {
        const [newDoc] = await db
          .insert(docs)
          .values({
            id: crypto.randomUUID(),
            title,
            content,
            source: "manual",
            createdAt: new Date(),
            updatedAt: new Date(),
            isStale: false,
          })
          .returning();
        return newDoc;
      },
    },
  },
});

const yoga = createYoga({ schema, graphqlEndpoint: '/api/graphql' })
export const GET = yoga;
export const POST = yoga;
