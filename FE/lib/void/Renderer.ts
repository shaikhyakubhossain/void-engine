import createParticle from "./Particle";
import { COLORS, GRID, PHYSICS } from "./constants";
import type { Particle } from "./types";
import Mouse from "./Mouse";

export default class Renderer {
  private readonly ctx: CanvasRenderingContext2D;

  private readonly canvas: HTMLCanvasElement;

  private readonly mouse: Mouse;

  private particles: Particle[] = [];

  private activeParticles: Particle[] = [];

  private inactiveParticles: Particle[] = [];

  private animationFrame = 0;

  private readonly handleResize = () => {
    this.resize();
  };

  private loop = () => {
    this.update();
    this.draw();

    this.animationFrame = requestAnimationFrame(this.loop);
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.mouse = new Mouse(canvas);

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Unable to get 2D context.");
    }

    this.ctx = ctx;
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;

    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.createGrid();
  }

  private createGrid() {
    this.particles = [];

    for (let y = GRID.spacing / 2; y < window.innerHeight; y += GRID.spacing) {
      for (let x = GRID.spacing / 2; x < window.innerWidth; x += GRID.spacing) {
        this.particles.push(createParticle(x, y));
      }
    }
  }

  private clear() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  private drawParticles() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${COLORS.particleRgb}, ${COLORS.particleInactiveAlpha})`;
    this.ctx.shadowBlur = 0;

    for (const particle of this.inactiveParticles) {
      this.ctx.moveTo(particle.x + particle.radius, particle.y);

      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    }

    this.ctx.fill();

    for (const particle of this.activeParticles) {
      const alpha = 0.15 + particle.brightness * 0.85;

      const radius = particle.radius + particle.brightness * 1.5;

      this.ctx.fillStyle = `rgba(${COLORS.particleRgb}, ${alpha})`;

      this.ctx.shadowBlur = particle.brightness * 20;

      this.ctx.shadowColor = COLORS.particle;

      this.ctx.beginPath();

      this.ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);

      this.ctx.fill();
    }

    this.ctx.shadowBlur = 0;
  }

  private update() {
    this.activeParticles.length = 0;
    this.inactiveParticles.length = 0;

    const radius = PHYSICS.interactionRadius;
    const radiusSq = radius * radius;

    for (const particle of this.particles) {
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;

      const distSq = dx * dx + dy * dy;

      if (distSq < radiusSq) {
        const distance = Math.sqrt(distSq);

        particle.brightness =
          1 - distance / radius - COLORS.particleActiveAlphaNegative;

        if (this.mouse.inside && distance > 0.001) {
          const force = (1 - distance / radius) * PHYSICS.mouseForce;

          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      } else {
        particle.brightness = 0;
      }

      const springX = particle.originX - particle.x;
      const springY = particle.originY - particle.y;

      particle.vx += springX * PHYSICS.spring;
      particle.vy += springY * PHYSICS.spring;

      const maxSpeedSq = PHYSICS.maxSpeed * PHYSICS.maxSpeed;

      const speedSq = particle.vx * particle.vx + particle.vy * particle.vy;

      if (speedSq > maxSpeedSq) {
        const speed = Math.sqrt(speedSq);

        particle.vx = (particle.vx / speed) * PHYSICS.maxSpeed;

        particle.vy = (particle.vy / speed) * PHYSICS.maxSpeed;
      }

      particle.vx *= PHYSICS.damping;
      particle.vy *= PHYSICS.damping;

      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.brightness > 0.2) {
        this.activeParticles.push(particle);
      } else {
        this.inactiveParticles.push(particle);
      }
    }
  }

  public start() {
    this.resize();

    window.addEventListener("resize", this.handleResize);

    this.loop();
  }

  public destroy() {
    cancelAnimationFrame(this.animationFrame);

    window.removeEventListener("resize", this.handleResize);

    this.mouse.destroy();
  }

  draw() {
    this.clear();
    this.drawParticles();
  }
}
