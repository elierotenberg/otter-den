#!/bin/env node

import yargs from "yargs";

import { readFromEnv } from "./lib/schemas/Config";
import { serve } from "./lib/Controller";

const main = async (): Promise<void> => {
  const config = await readFromEnv();

  const argv = yargs.argv;

  const [command] = argv._;

  if (command === "serve") {
    await serve(config);
  } else {
    throw new Error(`unknown command: ${command}`);
  }
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  throw new Error("this should be the main module");
}
