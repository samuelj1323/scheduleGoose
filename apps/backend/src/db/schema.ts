import { pgTable, uuid, varchar, timestamp, text, jsonb, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { IContentCard } from '@schedulegoose/types';

export const contentStatusEnum = pgEnum('content_status', ['draft', 'scheduled', 'published']);
export const contentTypeEnum = pgEnum('content_type', ['video', 'audio', 'image', 'text']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const content = pgTable('content', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  status: contentStatusEnum('status').default('draft').notNull(),
  scheduledTime: timestamp('scheduled_time').notNull(),
  createdTime: timestamp('created_time').defaultNow().notNull(),
  type: contentTypeEnum('type').notNull(),
  // Flexible metadata for different content types (matches IContentCard fields minus the common ones)
  metadata: jsonb('metadata').$type<Omit<IContentCard, 'title' | 'scheduledTime' | 'createdTime' | 'type'>>().notNull(),
});

