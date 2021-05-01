import { Static, Type } from "@sinclair/typebox";

export const Light = Type.Union([
  Type.Object({
    lightId: Type.String(),
    kind: Type.Literal("lifx"),
    ipv4: Type.String(),
  }),
]);

export type Light = Static<typeof Light>;
