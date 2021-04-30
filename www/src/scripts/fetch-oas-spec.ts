import { promises } from "fs";
import { resolve } from "path";

import yargs from "yargs";
import fetch from "node-fetch";

const main = async (): Promise<void> => {
  const argv = yargs(process.argv.slice(2)).options({
    in: {
      type: `string`,
      demandOption: true,
    },
    out: {
      type: `string`,
      demandOption: true,
    },
  }).argv;

  const oas = await (await fetch(argv.in)).json();

  await promises.writeFile(
    resolve(process.cwd(), argv.out),
    JSON.stringify(oas, null, 2),
    {
      encoding: `utf-8`,
    },
  );
};

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
  });
} else {
  throw Error(`this should be the main module`);
}

export {};
