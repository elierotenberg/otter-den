import { Lifx } from "../Lifx";
import { Light } from "../schemas/Light";

export class KeyboardServer {
  private readonly lights: Light[];
  private readonly lifx: Lifx;
  public constructor({
    lights,
    lifx,
  }: {
    readonly lights: Light[];
    readonly lifx: Lifx;
  }) {
    this.lights = lights;
    this.lifx = lifx;
  }
  public readonly onKeypress = (key: string): void => {
    if (key === "9") {
      for (const light of this.lights) {
        if (light.kind === "lifx") {
          const lifxLight = this.lifx.getLight(light.ipv4);
          lifxLight.off();
        }
      }
    }
  };
}
