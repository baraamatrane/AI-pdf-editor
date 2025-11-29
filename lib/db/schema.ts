import {
  pgEnum,
  pgTable,
  serial,
  timestamp,
  text,
  integer,
} from "drizzle-orm/pg-core";

export const SystemUser = pgEnum("system_user", ["USER", "ADMIN"]);

export const chat = pgTable("chats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // Clerk user IDs are strings, store as text
  userId: text("user_id").notNull(),
  pdfUrl: text("pdf_url").notNull(),
});

export const message = pgTable("messages", {
  id: serial("id").primaryKey(),
  chatId: integer("chat_id")
    .references(() => chat.id)
    .notNull(),
  sender: SystemUser("sender").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
