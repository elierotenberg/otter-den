import fastify from "fastify";
import swagger from "fastify-swagger";

import { routes } from "./routes";
import { TConfig } from "./schemas/Config";

export const start = async (config: TConfig): Promise<void> => {
  const app = fastify({
    logger: true,
  });

  app.register(swagger, {
    openapi: {},
    exposeRoute: true,
    routePrefix: "/oas",
  });

  app.register(routes({ upSince: new Date() }));

  await app.listen(config.http.port);
};
