import { Static, Type } from "@sinclair/typebox";

export enum LifxKind {
  Lifx = "lifx",
}

export const Light = Type.Object({
  lightId: Type.String(),
  label: Type.String(),
  kind: Type.Enum(LifxKind),
  ipv4: Type.String(),
});

export type Light = Static<typeof Light>;
