import EventEmitter from "events";

import { Static, Type } from "@sinclair/typebox";
import { Client, Light } from "lifx-lan-client";

import { assert } from "./schemas";

type LifxOpts = {
  readonly debug: boolean;
  readonly lights: string[];
};

const LifxLightState = Type.Object({
  color: Type.Object({}),
  power: Type.Integer(),
  label: Type.String(),
});

type LifxLightState = Static<typeof LifxLightState>;

type WaveFormFunction = (
  hue: number,
  saturation: number,
  brightness: number,
  kelvin: number,
  transient: boolean,
  period: number,
  cycles: number,
  skewRatio: number,
  waveform: 0 | 1 | 2 | 3 | 4,
  callback: undefined | ((error: unknown) => void),
) => void;

export class LifxLight {
  private readonly light: Light;

  public constructor(light: Light) {
    this.light = light;
  }

  public getState = (): Promise<LifxLightState> =>
    new Promise((resolve, reject) => {
      this.light.getState((error: unknown, value: unknown) => {
        if (error) {
          reject(error);
        }
        try {
          assert(value, LifxLightState);
          resolve(value);
        } catch (error) {
          reject(error);
        }
      });
    });

  public setColor = (
    [h, s, b]: [h: number, s: number, b: number],
    period: number | null,
  ): void => {
    if (!period) {
      this.light.color(h, s * 100, b * 100, 3500, 0, undefined);
    } else {
      this.light.color(h, s * 100, 1, 3500, 0, undefined);
      ((this.light as unknown) as { waveform: WaveFormFunction }).waveform(
        h,
        s * 100,
        b * 100,
        3500,
        false,
        period,
        10e30,
        0.5,
        1,
        undefined,
      );
    }
    this.light.on(0, undefined);
  };

  public off = (): void => this.light.off(0, undefined);
}

export class Lifx {
  private client: Client & EventEmitter;
  private opts: LifxOpts;
  public constructor(opts: LifxOpts) {
    this.client = new Client() as Client & EventEmitter;
    this.opts = opts;
  }

  public init = async (): Promise<void> => {
    if (this.opts.debug) {
      this.client.on("light-new", (light) => {
        console.debug("light-new", light);
      });
    }
    await new Promise((resolve, reject) =>
      this.client.init(
        {
          debug: this.opts.debug,
          lights: this.opts.lights,
        },
        (error: unknown, value: unknown) =>
          error ? reject(error) : resolve(value),
      ),
    );
  };

  public getLight = (ipv4: string): LifxLight =>
    new LifxLight(this.client.light(ipv4));
}
