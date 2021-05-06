import fastify from "fastify";
import swagger from "fastify-swagger";
import cors from "fastify-cors";

import { routes } from "./routes";
import { Config } from "./schemas/Config";
import { Lifx } from "./Lifx";

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

  const app = fastify({
    logger: true,
  });

  app.register(cors, { origin: config.http.corsOrigins });

  app.register(swagger, {
    openapi: {},
    exposeRoute: true,
    routePrefix: "/oas",
  });

  app.register(routes({ upSince: new Date(), lights: config.lights, lifx }));

  await app.listen(config.http.port, config.http.host);
};
