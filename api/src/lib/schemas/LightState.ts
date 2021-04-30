import { Static, Type } from "@sinclair/typebox";

export const LightState = Type.Object({
  color: Type.String(),
});

export type LightState = Static<typeof LightState>;
