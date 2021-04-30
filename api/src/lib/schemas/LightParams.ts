import { Static, Type } from "@sinclair/typebox";

export const LightParams = Type.Object({
  lightId: Type.String(),
});

export type LightParams = Static<typeof LightParams>;
