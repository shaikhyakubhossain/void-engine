export const GRID = {
  spacing: 24,
  radius: 1.5,
} as const;

export const PHYSICS = {
  spring: 0.08,
  damping: 0.92,
  mouseForce: 1.0,
  interactionRadius: 180,
  maxSpeed: 8,
} as const;

export const GLOW = {
  radius: 18,
  alpha: 0.9,
} as const;

export const COLORS = {
  particle: "#53d3ff",
  particleRgb: "83,211,255",
  secondary: "#7c5cff",

  particleInactiveAlpha: 0.15,
  particleActiveAlphaNegative: 0.3,
} as const;