import { promises } from "fs";
import { join } from "path";

import { Static, Type } from "@sinclair/typebox";
import { load } from "js-yaml";

import { Light } from "./Light";

import { assert } from ".";

const Config = Type.Object({
  http: Type.Object({
    host: Type.String(),
    port: Type.Integer(),
    corsOrigins: Type.Array(Type.String()),
  }),
  lights: Type.Array(Light),
});

export type Config = Static<typeof Config>;

export const readFromEnv = async (): Promise<Config> => {
  const config = load(
    await promises.readFile(
      join(
        __dirname,
        "..",
        "..",
        "..",
        "env",
        process.env.NODE_ENV ?? "development",
        "config.yml",
      ),
      { encoding: "utf-8" },
    ),
  );
  assert(config, Config);
  return config;
};
