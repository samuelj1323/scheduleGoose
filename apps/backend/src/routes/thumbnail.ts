import { Hono } from 'hono';

const thumbnail = new Hono()
  .post('/generate', async (c) => {
  const body = await c.req.json();
  const { title, style = 'modern' } = body;

  if (!title) {
    return c.json({ error: 'Title is required' }, 400);
  }

  // Mock AI Generation Delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock: Return a placeholder image based on title keywords
  // In production, you'd call DALL-E 3 here.
  
  let imageUrl = `https://placehold.co/1280x720/252f3f/ffffff?text=${encodeURIComponent(title)}`;
  
  if (style === 'vlog') {
      imageUrl = `https://placehold.co/1280x720/ff0000/ffffff?text=${encodeURIComponent(title + " (VLOG)")}`;
  } else if (style === 'minimal') {
      imageUrl = `https://placehold.co/1280x720/ffffff/000000?text=${encodeURIComponent(title)}`;
  }

  return c.json({ 
    success: true, 
    imageUrl: imageUrl,
    promptUsed: `A high quality YouTube thumbnail for a video titled "${title}", style: ${style}`
  });
});

export { thumbnail };

