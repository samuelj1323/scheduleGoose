import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ message: 'Schedule Goose API is running!' })
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok' })
})

const port = 8787
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

