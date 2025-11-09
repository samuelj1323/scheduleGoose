import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analytics")({
  component: Analytics,
});

function Analytics() {
  return <div>Hello "/analytics"!</div>;
}
