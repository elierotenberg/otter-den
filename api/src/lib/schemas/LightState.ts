import { Static, Type } from "@sinclair/typebox";

export const LightState = Type.Object({
  hex: Type.String({ pattern: "^#(?:[0-9a-fA-F]{3}){1,2}$" }),
  brightness: Type.Union([
    Type.Null(),
    Type.Integer({ minimum: 0, maximum: 100 }),
  ]),
  period: Type.Union([Type.Null(), Type.Integer({ minimum: 100 })]),
});

export type LightState = Static<typeof LightState>;
