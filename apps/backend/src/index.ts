import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { IContentCard } from '@schedulegoose/types'
import { db } from './db/index.js'
import { content, users } from './db/schema.js'
import { eq, desc } from 'drizzle-orm'

const app = new Hono()

app.use('/*', cors())

// Temporary: Create a default user if none exists (for dev simplicity until Auth is built)
// This ensures we always have a userId to attach to content
async function getOrCreateDefaultUser() {
  const existing = await db.select().from(users).limit(1);
  if (existing.length > 0) return existing[0];
  
  const [newUser] = await db.insert(users).values({
    email: 'dev@schedulegoose.com',
    name: 'Developer Goose',
  }).returning();
  return newUser;
}

const routes = app
  .get('/', (c) => {
    return c.json({ message: 'Schedule Goose API is running!' })
  })
  .get('/api/health', (c) => {
    return c.json({ status: 'ok' })
  })
  .get('/api/content', async (c) => {
    // Join with user to get author name
    const result = await db.select({
      id: content.id,
      title: content.title,
      type: content.type,
      scheduledTime: content.scheduledTime,
      createdTime: content.createdTime,
      metadata: content.metadata,
      authorName: users.name,
    })
    .from(content)
    .leftJoin(users, eq(content.userId, users.id))
    .orderBy(desc(content.scheduledTime));

    // Map DB result back to IContentCard structure for frontend compatibility
    // This is a "temporary adapter" pattern until we update frontend types to match DB schema exactly
    const mappedContent = result.map(row => {
      const base = {
        title: row.title,
        subTitle: (row.metadata as any).subTitle || '', // Fallback
        author: row.authorName || 'Unknown Goose',
        createdTime: row.createdTime,
        scheduledTime: row.scheduledTime,
      };

      // Spread metadata to reconstruct the union types (Video/Audio/Image/Text)
      return {
        ...base,
        type: row.type,
        ...row.metadata,
      } as unknown as IContentCard; 
    });

    return c.json(mappedContent)
  })
  .post('/api/content', async (c) => {
    const body = await c.req.json() as any;
    const defaultUser = await getOrCreateDefaultUser();

    // Extract metadata fields based on type
    const { title, type, scheduledTime, createdTime, ...metadataRest } = body;
    
    // We remove "author" and "subTitle" from top level if they exist in body, 
    // but they might need to go into metadata for now to preserve IContentCard shape
    
    const [newContent] = await db.insert(content).values({
      userId: defaultUser.id,
      title: title,
      type: type,
      status: 'scheduled', // Default to scheduled
      scheduledTime: new Date(scheduledTime),
      createdTime: new Date(createdTime || Date.now()),
      metadata: metadataRest,
    }).returning();

    // Return essentially what the frontend gave us to keep UI optimistic update happy
    // In a real app we'd return the exact DB shape
    return c.json({
      ...body,
      id: newContent.id, // Return real UUID
      author: defaultUser.name
    }, 201);
  })

export type AppType = typeof routes

const port = 8787
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
