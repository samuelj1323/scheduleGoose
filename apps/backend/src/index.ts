import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { IContentCard } from '@schedulegoose/types'

const app = new Hono()

app.use('/*', cors())

const contentStore: IContentCard[] = [
  {
    type: "video",
    title: "Sample Video",
    subTitle: "Example of a video card",
    author: "John Doe",
    href: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://www.w3schools.com/html/pic_trulli.jpg",
    createdTime: new Date("2024-06-01T12:00:00Z"),
    scheduledTime: new Date("2024-06-05T09:00:00Z"),
  },
  {
    type: "audio",
    title: "Sample Audio",
    subTitle: "Example of an audio card",
    author: "Jane Smith",
    href: "https://www.w3schools.com/html/horse.mp3",
    thumbnail: "https://www.w3schools.com/html/img_girl.jpg",
    createdTime: new Date("2024-06-02T13:30:00Z"),
    scheduledTime: new Date("2024-06-05T14:30:00Z"),
  },
  {
    type: "image",
    title: "Sample Image",
    subTitle: "Example of an image card",
    author: "Bob Johnson",
    href: "https://www.w3schools.com/html/img_chania.jpg",
    createdTime: new Date("2024-06-03T15:00:00Z"),
    scheduledTime: new Date("2024-06-05T16:00:00Z"),
  },
  {
    type: "text",
    title: "Sample Text",
    subTitle: "Example of a text card",
    author: "Alice Williams",
    content: "This is a dummy text content for the text card example.",
    createdTime: new Date("2024-06-04T17:00:00Z"),
    scheduledTime: new Date("2024-06-06T08:00:00Z"),
  },
  {
    type: "video",
    title: "Another Video",
    subTitle: "Second video for same date",
    author: "John Doe",
    href: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://www.w3schools.com/html/pic_trulli.jpg",
    createdTime: new Date("2024-06-01T12:00:00Z"),
    scheduledTime: new Date("2024-06-06T10:00:00Z"),
  },
];

const routes = app
  .get('/', (c) => {
    return c.json({ message: 'Schedule Goose API is running!' })
  })
  .get('/api/health', (c) => {
    return c.json({ status: 'ok' })
  })
  .get('/api/content', (c) => {
    return c.json(contentStore)
  })
  .post('/api/content', async (c) => {
    const body = await c.req.json() as any;
    
    const newContent: IContentCard = {
      ...body,
      createdTime: new Date(body.createdTime),
      scheduledTime: new Date(body.scheduledTime),
    };

    contentStore.push(newContent);
    return c.json(newContent, 201);
  })

export type AppType = typeof routes

const port = 8787
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
