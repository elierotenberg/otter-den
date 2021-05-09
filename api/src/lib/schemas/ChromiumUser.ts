import { Static, Type } from "@sinclair/typebox";

export const ChromiumUser = Type.Object({
  userId: Type.String(),
  google: Type.Optional(
    Type.Object({
      email: Type.String(),
      password: Type.String(),
      findMyDeviceKey: Type.Optional(Type.String()),
    }),
  ),
});

export type ChromiumUser = Static<typeof ChromiumUser>;
