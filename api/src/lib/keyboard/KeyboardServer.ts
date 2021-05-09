import puppeteer from "puppeteer-extra";

import { findMyDevice } from "../chromium/Chromium";
import { Lifx } from "../Lifx";
import { ChromiumUser } from "../schemas/ChromiumUser";
import { Light } from "../schemas/Light";

export class KeyboardServer {
  private readonly lights: Light[];
  private readonly lifx: Lifx;
  private readonly chromium: {
    readonly executablePath?: string;
    readonly users: ChromiumUser[];
  };
  public constructor({
    lights,
    lifx,
    chromium,
  }: {
    readonly lights: Light[];
    readonly lifx: Lifx;
    readonly chromium: {
      readonly executablePath?: string;
      readonly users: ChromiumUser[];
    };
  }) {
    this.lights = lights;
    this.lifx = lifx;
    this.chromium = chromium;
  }
  public readonly onKeypress = async (key: string): Promise<void> => {
    console.log("input", key);
    if (key === "9") {
      for (const light of this.lights) {
        if (light.kind === "lifx") {
          const lifxLight = this.lifx.getLight(light.ipv4);
          lifxLight.off();
        }
      }
    }
    for (const user of this.chromium.users) {
      if (user.google && user.google.findMyDeviceKey === key) {
        const browser = await puppeteer.launch({
          headless: true,
          executablePath: this.chromium.executablePath,
        });
        try {
          console.log(`finding device of ${user.google.email}`);
          await findMyDevice(browser, user.google.email, user.google.password);
        } catch (error) {
          console.error(error);
        } finally {
          await browser.close();
        }
      }
    }
  };
}
