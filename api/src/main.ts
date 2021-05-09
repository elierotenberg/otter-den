#!/bin/env node

import { readFromEnv } from "./lib/schemas/Config";
import { start } from "./lib/Controller";

const main = async (): Promise<void> => {
  const config = await readFromEnv();

  await start(config);
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  throw new Error("this should be the main module");
}
