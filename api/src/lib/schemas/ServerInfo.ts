import { Static, Type } from "@sinclair/typebox";

export const ServerInfo = Type.Object({
  up_since: Type.String({ format: "date-time" }),
});

export type ServerInfo = Static<typeof ServerInfo>;
