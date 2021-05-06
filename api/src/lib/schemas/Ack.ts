import { Static, Type } from "@sinclair/typebox";

export const Ack = Type.Object({
  ok: Type.Literal(true),
});

export type Ack = Static<typeof Ack>;

export const ack: Ack = {
  ok: true,
};
