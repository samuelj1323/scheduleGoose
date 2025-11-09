import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Framework from "../lib/components/framework/framework";

const RootLayout = () => (
  <>
    <Framework />
    {import.meta.env.DEV && <TanStackRouterDevtools />}
  </>
);

export const Route = createRootRoute({ component: RootLayout });
