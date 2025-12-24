import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type Vec2 = { x: number; y: number };

type HeroMorphCanvasProps = {
  anchorRef?: RefObject<HTMLElement>;
};

const CYCLE_MS = 12000;
const MORPH_MS = 8000;
const REST_MS = 3000;
const SCATTER_OUT_MS = CYCLE_MS - MORPH_MS - REST_MS;
const SCATTER_TO_CIRCLE_MS = 3600;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

class Particle {
  pos: Vec2;
  prev: Vec2;
  vel: Vec2;
  acc: Vec2;
  maxSpeed: number;
  maxForce: number;
  size: number;

  constructor(x: number, y: number) {
    this.pos = { x, y };
    this.prev = { x, y };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.maxSpeed = randomInRange(0.9, 2.6);
    this.maxForce = randomInRange(0.03, 0.08);
    this.size = randomInRange(0.6, 2.1);
  }

  seek(target: Vec2, strength = 1) {
    const desiredX = target.x - this.pos.x;
    const desiredY = target.y - this.pos.y;
    const dist = Math.hypot(desiredX, desiredY) || 1;
    const speed = this.maxSpeed;
    const steerX = (desiredX / dist) * speed - this.vel.x;
    const steerY = (desiredY / dist) * speed - this.vel.y;
    const steerMag = Math.hypot(steerX, steerY) || 1;
    const limitedX = (steerX / steerMag) * this.maxForce * strength;
    const limitedY = (steerY / steerMag) * this.maxForce * strength;

    this.acc.x += limitedX;
    this.acc.y += limitedY;
  }

  update() {
    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;

    const speed = Math.hypot(this.vel.x, this.vel.y);
    if (speed > this.maxSpeed) {
      this.vel.x = (this.vel.x / speed) * this.maxSpeed;
      this.vel.y = (this.vel.y / speed) * this.maxSpeed;
    }

    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx: CanvasRenderingContext2D, alphaBoost = 1) {
    const speed = Math.hypot(this.vel.x, this.vel.y);
    const alpha = clamp(0.15 + (speed / (this.maxSpeed + 0.01)) * 0.45, 0.12, 0.65) * alphaBoost;
    const weight = clamp(this.size * (0.6 + speed * 0.25), 0.4, 2.4);

    ctx.strokeStyle = `rgba(252, 238, 216, ${alpha})`;
    ctx.lineWidth = weight;
    ctx.beginPath();
    ctx.moveTo(this.prev.x, this.prev.y);
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.stroke();

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  reset(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
    this.prev.x = x;
    this.prev.y = y;
    this.vel.x = 0;
    this.vel.y = 0;
    this.acc.x = 0;
    this.acc.y = 0;
  }
}

function getSquarePoint(angle: number, half: number): Vec2 {
  const t = (angle / (Math.PI * 2)) % 1;
  const side = t * 4;
  const sideIndex = Math.floor(side);
  const local = side - sideIndex;

  switch (sideIndex) {
    case 0:
      return { x: lerp(-half, half, local), y: -half };
    case 1:
      return { x: half, y: lerp(-half, half, local) };
    case 2:
      return { x: lerp(half, -half, local), y: half };
    default:
      return { x: -half, y: lerp(half, -half, local) };
  }
}

export function HeroMorphCanvas({ anchorRef }: HeroMorphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let center: Vec2 = { x: 0, y: 0 };
    let circleRadius = 0;
    let cubeHalf = 0;
    let scatterMin = 0;
    let scatterMax = 0;

    let particles: Particle[] = [];
    let scatterPositions: Vec2[] = [];
    let circlePositions: Vec2[] = [];
    let cubePositions: Vec2[] = [];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Track page visibility to pause animation when tab is hidden
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      // Resume animation when page becomes visible again
      if (isVisibleRef.current && !prefersReducedMotion && animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const buildPositions = () => {
      scatterPositions = [];
      circlePositions = [];
      cubePositions = [];

      for (let i = 0; i < particles.length; i += 1) {
        const angle = (i / particles.length) * Math.PI * 2;
        const radius = randomInRange(scatterMin, scatterMax);
        const jitter = randomInRange(-circleRadius * 0.08, circleRadius * 0.08);
        scatterPositions.push({
          x: center.x + Math.cos(angle) * radius + jitter,
          y: center.y + Math.sin(angle) * radius + jitter,
        });

        circlePositions.push({
          x: center.x + Math.cos(angle) * circleRadius,
          y: center.y + Math.sin(angle) * circleRadius,
        });

        const square = getSquarePoint(angle, cubeHalf);
        cubePositions.push({
          x: center.x + square.x,
          y: center.y + square.y,
        });
      }
    };

    const initParticles = (count: number) => {
      particles = [];
      for (let i = 0; i < count; i += 1) {
        particles.push(new Particle(center.x, center.y));
      }
      buildPositions();
      for (let i = 0; i < particles.length; i += 1) {
        const pos = scatterPositions[i];
        particles[i].reset(pos.x, pos.y);
      }
    };

    const updateLayout = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const anchorRect = anchorRef?.current?.getBoundingClientRect();
      if (anchorRect) {
        center = {
          x: anchorRect.left - rect.left + anchorRect.width / 2,
          y: anchorRect.top - rect.top + anchorRect.height / 2,
        };
      } else {
        center = { x: width / 2, y: height * 0.38 };
      }

      const minDim = Math.min(width, height);
      const anchorSize = anchorRect ? anchorRect.width : 0;
      circleRadius = Math.max(minDim * 0.3, anchorSize * 3.2);
      cubeHalf = Math.max(minDim * 0.1, anchorSize * 1.1);
      scatterMin = circleRadius * 0.9;
      scatterMax = circleRadius * 2.2;

      const desiredCount = width < 640 ? 520 : width < 1024 ? 800 : 1100;
      if (particles.length !== desiredCount) {
        initParticles(desiredCount);
      } else {
        buildPositions();
      }
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    window.addEventListener("resize", updateLayout);

    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(252, 238, 216, 0.35)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      const pointCount = 180;
      for (let i = 0; i < pointCount; i += 1) {
        const angle = (i / pointCount) * Math.PI * 2;
        const point = getSquarePoint(angle, cubeHalf * 1.1);
        const x = center.x + point.x;
        const y = center.y + point.y;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateLayout);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    const render = (time: number) => {
      // Pause animation when page is hidden to save resources
      if (!isVisibleRef.current) {
        animationFrame = 0;
        return;
      }

      const cycleTime = time % CYCLE_MS;
      ctx.clearRect(0, 0, width, height);

      const isMorphing = cycleTime <= MORPH_MS;
      const isResting = cycleTime > MORPH_MS && cycleTime <= MORPH_MS + REST_MS;
      const morphStrength = isMorphing ? 1 : isResting ? 0.8 : 0.9;
      const alphaBoost = isMorphing ? 1 : isResting ? 0.85 : 0.7;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        let target: Vec2;

        if (isResting) {
          const drift = Math.sin(time * 0.001 + i * 0.05) * 0.6;
          target = {
            x: cubePositions[i].x + drift,
            y: cubePositions[i].y + Math.cos(time * 0.001 + i * 0.04) * 0.6,
          };
        } else if (!isMorphing) {
          const progress = easeInOutCubic(
            (cycleTime - MORPH_MS - REST_MS) / SCATTER_OUT_MS
          );
          target = {
            x: lerp(cubePositions[i].x, scatterPositions[i].x, progress),
            y: lerp(cubePositions[i].y, scatterPositions[i].y, progress),
          };
        } else if (cycleTime < SCATTER_TO_CIRCLE_MS) {
          const progress = easeInOutCubic(cycleTime / SCATTER_TO_CIRCLE_MS);
          target = {
            x: lerp(scatterPositions[i].x, circlePositions[i].x, progress),
            y: lerp(scatterPositions[i].y, circlePositions[i].y, progress),
          };
        } else {
          const progress = easeInOutCubic((cycleTime - SCATTER_TO_CIRCLE_MS) / (MORPH_MS - SCATTER_TO_CIRCLE_MS));
          target = {
            x: lerp(circlePositions[i].x, cubePositions[i].x, progress),
            y: lerp(circlePositions[i].y, cubePositions[i].y, progress),
          };
        }

        p.seek(target, morphStrength);
        p.update();
        p.draw(ctx, alphaBoost);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [anchorRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
