import { Static, Type } from "@sinclair/typebox";

export const LightState = Type.Object({
  hsl: Type.Object({
    h: Type.Number(),
    s: Type.Number(),
    l: Type.Number(),
  }),
  period: Type.Optional(Type.Integer({ minimum: 100 })),
});

export type LightState = Static<typeof LightState>;
