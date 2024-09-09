import { sqliteTable, integer, text, index } from "drizzle-orm/sqlite-core";

export const channels = sqliteTable(
  "channels",
  {
    id: text("id").primaryKey().notNull(),
    is_blocked: integer("is_blocked"),
    is_blocking: integer("is_blocking"),
    unread_count: integer("unread_count"),
    last_read_at: integer("last_read_at", { mode: "timestamp_ms" }),
    last_message_at: integer("last_message_at", { mode: "timestamp_ms" }),
    last_delivered_at: integer("last_delivered_at", { mode: "timestamp_ms" }),
    updated_at: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    created_at: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    last_message: text("last_message"),
    members: text("members"),
    user: text("user"),
  },
  (table) => {
    return {
      lastMessageAtIdx: index("last_message_at_idx").on(table.last_message_at),
      lastUpdatedAtIdx: index("last_updated_idx").on(table.updated_at),
    };
  }
);

export const messages = sqliteTable(
  "messages",
  {
    id: text("id").primaryKey().notNull(),
    content: text("content").notNull(),
    cid: text("cid").notNull(),
    uid: text("uid").notNull(),
    status: text("status"),
    type: text("type"),
    asset_type: text("asset_type"),
    asset_url: text("asset_url"),
    asset_local_url: text("asset_local_url"),
    parent_id: text("parent_id"),
    deletion: text("deletion"),
    is_deleted: integer("is_deleted"),
    og_metadata: text("og_metadata"),
    reactions: text("reactions"),
    created_at: integer("created_at", { mode: "timestamp_ms" }).notNull(),
    updated_at: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
    dedup_id: text("dedup_id"),
    parent_message: text("parent_message"),
  },
  (table) => {
    return {
      cidIdx: index("cid_idx").on(table.cid),
      createdAtIdx: index("created_at_idx").on(table.created_at),
      statusIdx: index("status_idx").on(table.status),
    };
  }
);
