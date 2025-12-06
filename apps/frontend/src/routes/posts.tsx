import { createFileRoute } from "@tanstack/react-router";
import ThumbnailGenerator from "$lib/components/thumbnail-generator/thumbnail-generator";

export const Route = createFileRoute("/posts")({
  component: Posts,
});

function Posts() {
  return (
    <div>
      <h1>Posts & Tools</h1>
      <ThumbnailGenerator />
    </div>
  );
}
