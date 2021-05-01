import { FastifyInstance } from "fastify";
import { NotFound, BadRequest } from "http-errors";
import { Type } from "@sinclair/typebox";

import { assert } from "../schemas";
import { Ack } from "../schemas/Ack";
import { Light } from "../schemas/Light";
import { LightParams } from "../schemas/LightParams";
import { LightState } from "../schemas/LightState";
import { ServerInfo } from "../schemas/ServerInfo";
import { Lifx } from "../Lifx";

type RoutesParams = {
  readonly upSince: Date;
  readonly lights: Light[];
  readonly lifx: Lifx;
};

export const routes = ({ upSince, lights, lifx }: RoutesParams) => async (
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

  app.get(
    "/den/light",
    {
      schema: {
        response: {
          200: Type.Array(Light),
        },
      },
    },
    async (): Promise<Light[]> => lights,
  );

  app.get(
    "/den/light/:lightId/info",
    {
      schema: {
        params: LightParams,
      },
    },
    async ({ params }) => {
      try {
        assert(params, LightParams);
      } catch (error) {
        throw new BadRequest();
      }
      const { lightId } = params;
      const light = lights.find((light) => light.lightId === lightId);
      if (!light) {
        throw new NotFound();
      }
      if (light.kind === "lifx") {
        const lifxLight = lifx.getLight(light.ipv4);
        return {
          kind: "lifx",
          state: await lifxLight.getState(),
        };
      } else {
        throw new NotFound(`unknown light kind: ${light.kind}`);
      }
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
    async ({ params, body }): Promise<LightState> => {
      try {
        assert(params, LightParams);
        assert(body, LightState);
      } catch (error) {
        throw new BadRequest(error?.message);
      }
      const { lightId } = params;
      const { hex, brightness, period } = body;
      const light = lights.find((light) => light.lightId === lightId);
      if (!light) {
        throw new NotFound();
      }
      if (light.kind === "lifx") {
        const lifxLight = lifx.getLight(light.ipv4);
        lifxLight.setColor(hex, brightness, period);
        return body;
      } else {
        throw new NotFound(`unknown light kind: ${light.kind}`);
      }
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
    async ({ params }): Promise<Ack> => {
      try {
        assert(params, LightParams);
      } catch (error) {
        throw new BadRequest(error?.message);
      }
      const { lightId } = params;
      const light = lights.find((light) => light.lightId === lightId);
      if (!light) {
        throw new NotFound();
      }
      if (light.kind === "lifx") {
        const lifxLight = lifx.getLight(light.ipv4);
        lifxLight.off();
        return {
          ok: true,
        };
      } else {
        throw new NotFound(`unknown light kind: ${light.kind}`);
      }
    },
  );
};
