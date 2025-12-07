import { mean, standardDeviation } from "simple-statistics";

export type PredictionResult = {
  score: number; // Z-Score
  label: string; // "Viral", "Average", etc.
  baselineAvg: number;
  stdDev: number;
};

export function calculateOutlierScore(history: number[], currentVal: number): PredictionResult {
  if (history.length < 2) {
    return { score: 0, label: "Insufficient Data", baselineAvg: currentVal, stdDev: 0 };
  }

  const avg = mean(history);
  const stdDev = standardDeviation(history);
  
  if (stdDev === 0) {
     return { score: 0, label: "Stable", baselineAvg: avg, stdDev: 0 };
  }

  const zScore = (currentVal - avg) / stdDev;

  let label = "Average Performance";
  if (zScore > 2.0) label = "🔥 VIRAL BREAKOUT";
  else if (zScore > 1.0) label = "📈 Overperformer";
  else if (zScore < -1.0) label = "📉 Underperformer";

  return {
    score: zScore,
    label,
    baselineAvg: avg,
    stdDev,
  };
}
