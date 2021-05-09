import fastify, { FastifyInstance } from "fastify";
import cors from "fastify-cors";
import swagger from "fastify-swagger";

import { Lifx } from "../Lifx";
import { Light } from "../schemas/Light";

import { routes } from "./routes";

export const createHttpServer = ({
  corsOrigins,
  lights,
  lifx,
}: {
  readonly corsOrigins: string[];
  readonly lights: Light[];
  readonly lifx: Lifx;
  readonly upSince: Date;
}): FastifyInstance => {
  const http = fastify({
    logger: true,
  });

  http.register(cors, { origin: corsOrigins });

  http.register(swagger, {
    openapi: {},
    exposeRoute: true,
    routePrefix: "/oas",
  });

  http.register(routes({ upSince: new Date(), lights, lifx }));
  return http;
};
