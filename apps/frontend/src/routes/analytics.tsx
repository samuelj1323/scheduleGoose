import { createFileRoute } from "@tanstack/react-router";
import PerformancePredictor from "$lib/components/performance-predictor/performance-predictor";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <div>
      <h1>Analytics</h1>
      <PerformancePredictor />
    </div>
  );
}
