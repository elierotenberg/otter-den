import { Static, Type } from "@sinclair/typebox";

export const Ack = Type.Object({
  ok: Type.Boolean(),
});

export type Ack = Static<typeof Ack>;
