import {
  pgTable,
  text,
  boolean,
  timestamp,
  real,
  jsonb,
  vector,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password"),
  provider: text("provider", { enum: ["github", "bitbucket"] }).notNull(),
});

export const integrations = pgTable("integrations", {
  id: text("id").primaryKey(),
  token: text("token").notNull(),
  refreshToken: text("refreshToken").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  provider: text("provider", { enum: ["github", "bitbucket"] }).notNull(),
  workspaceId: text("workspaceId").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  active: boolean("active").notNull(),
});

export const repositories = pgTable("repositories", {
  id: text("id").primaryKey(),
  fullName: text("fullName").notNull(),
  url: text("url").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  integrationId: text("integrationId")
    .references(() => integrations.id)
    .notNull(),
  createdAt: timestamp("createdAt").notNull(),
  active: boolean("active").notNull(),
});

export const webhookEvents = pgTable("webhook_events", {
  id: text("id").primaryKey(),
  type: text("type", { enum: ["pr_merged", "push", "pr_created"] }).notNull(),
  repositoryId: text("repositoryId")
    .notNull()
    .references(() => repositories.id),
  createdAt: timestamp("createdAt").notNull(),
  eventProcessed: boolean("eventProcessed").notNull(),
  payload: jsonb("payload").notNull(),
});

export const docs = pgTable("docs", {
  id: text("id").primaryKey(),
  webHookEventId: text("webHookEventId").references(() => webhookEvents.id),
  source: text("source", { enum: ["ai_generated", "manual"] }).notNull(),
  repositoryId: text("repositoryId").references(() => repositories.id),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  isStale: boolean("isStale").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

export const embeddings = pgTable("embeddings", {
  id: text("id").primaryKey(),
  docId: text("docId")
    .notNull()
    .references(() => docs.id),
  createdAt: timestamp("createdAt").notNull(),
  vector: vector("vector", { dimensions: 1536 }),
});
