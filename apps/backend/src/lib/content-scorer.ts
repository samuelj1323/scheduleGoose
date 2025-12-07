type ContentType = 'video' | 'audio' | 'image' | 'text';

export type ContentScoreResult = {
  score: number; // 0-100
  tips: string[];
};

export function scoreContent(title: string, type: ContentType): ContentScoreResult {
  let score = 50; // Start at average
  const tips: string[] = [];

  const lowerTitle = title.toLowerCase();
  const length = title.length;

  // --- Universal Rules ---
  
  // Length check
  if (length < 15) {
    score -= 10;
    tips.push("Title is too short. Add more context.");
  } else if (length > 60 && type === 'video') {
    score -= 5;
    tips.push("Title might get truncated on mobile.");
  } else if (length >= 30 && length <= 60) {
    score += 5;
    tips.push("Optimal title length.");
  }

  // Power Words / Hooks
  if (lowerTitle.includes("how to") || lowerTitle.includes("guide") || lowerTitle.includes("tutorial")) {
    score += 10;
    tips.push("Contains educational hook ('How to', 'Guide').");
  }
  
  if (/\d+/.test(title)) { // Contains a number
    score += 5;
    tips.push("Numbers in titles often increase CTR.");
  }

  if (lowerTitle.includes("secret") || lowerTitle.includes("never") || lowerTitle.includes("stop")) {
    score += 5;
    tips.push("Contains curiosity gap words.");
  }

  // --- Type Specific Rules ---

  if (type === 'video') {
    if (title.includes("!")) {
      score += 2; // Slight boost for excitement
    }
    if (title === title.toUpperCase() && length > 5) {
      score -= 10;
      tips.push("Avoid ALL CAPS. It looks spammy.");
    }
  }

  // Clamp score 0-100
  return {
    score: Math.max(0, Math.min(100, score)),
    tips,
  };
}

