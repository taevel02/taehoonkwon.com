/// <reference types="vite/client" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="@remix-run/node" />

declare module "virtual:remix/server-build" {
  import type { ServerBuild } from "@remix-run/node";
  export const routes: ServerBuild["routes"];
}
