import fastify from "fastify";
import swagger from "fastify-swagger";
import cors from "fastify-cors";

import { routes } from "./routes";
import { Config } from "./schemas/Config";

export const start = async (config: Config): Promise<void> => {
  const app = fastify({
    logger: true,
  });

  app.register(cors, { origin: config.http.corsOrigins });

  app.register(swagger, {
    openapi: {},
    exposeRoute: true,
    routePrefix: "/oas",
  });

  app.register(routes({ upSince: new Date() }));

  await app.listen(config.http.port);
};
