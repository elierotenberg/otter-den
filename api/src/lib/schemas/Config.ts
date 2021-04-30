import { promises } from "fs";
import { join } from "path";

import { Static, Type } from "@sinclair/typebox";
import { load } from "js-yaml";

import { ajv } from ".";

const Config = Type.Object({
  http: Type.Object({
    host: Type.String(),
    port: Type.Integer(),
    corsOrigins: Type.Array(Type.String()),
  }),
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
  ajv.validate(Config, config);
  return config as Config;
};
