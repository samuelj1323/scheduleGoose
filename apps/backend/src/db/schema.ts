import { pgTable, uuid, varchar, timestamp, text, jsonb, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { IContentCard } from '@schedulegoose/types';

export const contentStatusEnum = pgEnum('content_status', ['draft', 'scheduled', 'published']);
export const contentTypeEnum = pgEnum('content_type', ['video', 'audio', 'image', 'text']);

export const user = pgTable('users', {
  id: text('id').primaryKey(), // Better Auth uses text IDs by default
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const content = pgTable('content', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  status: contentStatusEnum('status').default('draft').notNull(),
  scheduledTime: timestamp('scheduled_time').notNull(),
  createdTime: timestamp('created_time').defaultNow().notNull(),
  type: contentTypeEnum('type').notNull(),
  metadata: jsonb('metadata').$type<Omit<IContentCard, 'title' | 'scheduledTime' | 'createdTime' | 'type'>>().notNull(),
});

export const analyticsSnapshot = pgTable('analytics_snapshot', {
  id: uuid('id').defaultRandom().primaryKey(),
  contentId: uuid('content_id').references(() => content.id, { onDelete: 'cascade' }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metrics: jsonb('metrics').notNull(), // Flexible for different platforms
});
