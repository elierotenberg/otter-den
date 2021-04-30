import { FastifyInstance } from "fastify";

import { ajv } from "../schemas";
import { Ack } from "../schemas/Ack";
import { LightParams } from "../schemas/LightParams";
import { LightState } from "../schemas/LightState";
import { ServerInfo } from "../schemas/ServerInfo";

type RoutesParams = {
  readonly upSince: Date;
};

export const routes = ({ upSince }: RoutesParams) => async (
  app: FastifyInstance,
): Promise<void> => {
  app.get(
    "/info",
    {
      schema: {
        response: {
          200: ServerInfo,
        },
      },
    },
    async () => {
      return {
        up_since: upSince.toJSON(),
      };
    },
  );

  app.post(
    "/den/light/:lightId",
    {
      schema: {
        params: LightParams,
        body: LightState,
        response: {
          200: LightState,
        },
      },
    },
    async (request): Promise<LightState> => {
      ajv.validate(request.params as Record<string, unknown>, LightParams);
      ajv.validate(request.body as Record<string, unknown>, LightState);
      const lightState = request.body as LightState;
      return lightState;
    },
  );

  app.delete(
    "/den/light/:lightId",
    {
      schema: {
        params: LightParams,
        response: {
          200: Ack,
        },
      },
    },
    async (): Promise<Ack> => {
      return {
        ok: true,
      };
    },
  );
};
