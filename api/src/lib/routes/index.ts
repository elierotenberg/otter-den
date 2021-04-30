import { FastifyInstance } from "fastify";

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
    async (): Promise<ServerInfo> => {
      return {
        up_since: upSince.toJSON(),
      };
    },
  );
};
