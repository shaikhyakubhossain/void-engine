import { GRID } from "./constants";
import type { Particle } from "./types";

export default function createParticle(x: number, y: number): Particle {
  return {
    x,
    y,

    originX: x,
    originY: y,

    vx: 0,
    vy: 0,

    radius: GRID.radius,
    brightness: 0,
  };
}
