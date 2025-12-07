import { Hono } from 'hono';
import { calculateOutlierScore } from '../lib/analytics';
import { scoreContent } from '../lib/content-scorer';

const analytics = new Hono();

// Mock history for now
const MOCK_HISTORY = [1200, 1500, 1100, 1300, 1250, 1400, 1600, 1150, 1350, 1450];

analytics.post('/predict', async (c) => {
  const body = await c.req.json();
  const { title, type } = body;

  if (!title) {
    return c.json({ error: 'Title is required' }, 400);
  }

  // 1. Score the content based on heuristics (Title, etc.)
  const contentScore = scoreContent(title, type);

  // 2. Predict views based on score (Mock logic: higher score = higher multiplier of avg)
  // In reality, you'd use a regression model here.
  const avgViews = 1330; // derived from MOCK_HISTORY
  const predictedViews = Math.floor(avgViews * (contentScore.score / 50)); // 50 is "average" score

  // 3. Calculate Outlier Status for this prediction
  const outlierAnalysis = calculateOutlierScore(MOCK_HISTORY, predictedViews);

  return c.json({
    contentScore,
    predictedViews,
    outlierAnalysis
  });
});

export { analytics };
