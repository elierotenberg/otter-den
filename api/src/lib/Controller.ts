import { emitKeypressEvents } from "readline";

import { Config } from "./schemas/Config";
import { Lifx } from "./Lifx";
import { createHttpServer } from "./http/HttpServer";
import { KeyboardServer } from "./keyboard/KeyboardServer";

export const start = async (config: Config): Promise<void> => {
  console.log(
    config.lights.map((light) => (light.kind === "lifx" ? light.ipv4 : null)),
  );
  const lifx = new Lifx({
    debug: false,
    lights: config.lights
      .map((light) => (light.kind === "lifx" ? light.ipv4 : null))
      .filter((ipv4) => typeof ipv4 === "string") as string[],
  });

  await lifx.init();

  const http = createHttpServer({
    corsOrigins: config.http.corsOrigins,
    lights: config.lights,
    lifx,
    upSince: new Date(),
  });

  const keyboard = new KeyboardServer({ lights: config.lights, lifx });

  emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.on("keypress", (key: string) => {
    if (key === "\x03") {
      process.exit(0);
    }
    keyboard.onKeypress(key);
  });

  await http.listen(config.http.port, config.http.host);
};
