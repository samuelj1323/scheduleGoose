import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { IContentCard } from '@schedulegoose/types'
import { db } from './db/index.js'
import { content, user } from './db/schema.js'
import { eq, desc } from 'drizzle-orm'
import { auth } from './auth.js'
import { analytics } from './routes/analytics.js'
import { publish } from './routes/publish.js'
import { thumbnail } from './routes/thumbnail.js'
import { importRoute } from './routes/import.js'

const app = new Hono()

app.use('/*', cors({
  origin: ["http://localhost:3000"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
}))

// Mount Better Auth handler
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

// Temporary: Create a default user if none exists (for dev simplicity until Auth is built)
// This ensures we always have a userId to attach to content
async function getOrCreateDefaultUser() {
  const existing = await db.select().from(user).limit(1);
  if (existing.length > 0) return existing[0];
  
  // NOTE: This will crash now because we removed the manual insertion logic for uuid
  // We need to provide a CUID or similar text ID, or rely on Better Auth to create users.
  // For now, let's create a placeholder user with a text ID.
  const [newUser] = await db.insert(user).values({
    id: 'default-dev-user',
    email: 'dev@schedulegoose.com',
    name: 'Developer Goose',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  return newUser;
}

// Define routes in a single chain to ensure AppType inference captures everything
const routes = app
  .get('/', (c) => {
    return c.json({ message: 'Schedule Goose API is running!' })
  })
  .get('/api/health', (c) => {
    return c.json({ status: 'ok' })
  })
  .route('/api/analytics', analytics)
  .route('/api/publish', publish)
  .route('/api/thumbnail', thumbnail)
  .route('/api/import', importRoute)
  .get('/api/content', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    
    // Join with user to get author name
    const result = await db.select({
      id: content.id,
      title: content.title,
      type: content.type,
      scheduledTime: content.scheduledTime,
      createdTime: content.createdTime,
      metadata: content.metadata,
      authorName: user.name,
    })
    .from(content)
    .leftJoin(user, eq(content.userId, user.id))
    .orderBy(desc(content.scheduledTime));

    // Map DB result back to IContentCard structure for frontend compatibility
    // This is a "temporary adapter" pattern until we update frontend types to match DB schema exactly
    const mappedContent = result.map(row => {
      const base = {
        id: row.id,
        status: (row as any).status, // Add status if available in schema/query
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
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    
    // Fallback to default user if no session (during dev)
    // In production we should require session: if (!session) return c.json({error: "Unauthorized"}, 401)
    let userId = session?.user.id;
    let userName = session?.user.name;

    if (!userId) {
       const defaultUser = await getOrCreateDefaultUser();
       userId = defaultUser.id;
       userName = defaultUser.name;
    }

    const body = await c.req.json() as any;

    // Extract metadata fields based on type
    const { title, type, scheduledTime, createdTime, ...metadataRest } = body;
    
    // We remove "author" and "subTitle" from top level if they exist in body, 
    // but they might need to go into metadata for now to preserve IContentCard shape
    
    const [newContent] = await db.insert(content).values({
      userId: userId!,
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
      author: userName
    }, 201);
  })

export type AppType = typeof routes

const port = 8787
// Restart trigger
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
