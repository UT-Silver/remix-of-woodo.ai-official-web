import { useEffect, useRef } from "react";

interface ParticleNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  phase: number;
  floatSpeed: number;
  floatRadius: number;
  colorToken: string;
}

const SPACING = 56;
const REVEAL_RADIUS = 250;
const CONNECT_DIST = 110;

const HeroParticleReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || "ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    const ctx = canvas.getContext("2d");

    if (!container || !ctx) return;

    const WHITE_HSL = "0 0% 100%";

    let animationFrame = 0;
    let nodes: ParticleNode[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let isInside = false;

    const colorWithAlpha = (token: string, alpha: number) => `hsl(${token} / ${alpha})`;

    const buildNodes = (width: number, height: number) => {
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      nodes = [];

      for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
          nodes.push({
            baseX: col * SPACING + (Math.random() - 0.5) * 22,
            baseY: row * SPACING + (Math.random() - 0.5) * 22,
            x: 0,
            y: 0,
            size: Math.random() * 2 + 1.2,
            phase: Math.random() * Math.PI * 2,
            floatSpeed: 0.2 + Math.random() * 0.35,
            floatRadius: 1.5 + Math.random() * 3,
            colorToken: WHITE_HSL,
          });
        }
      }
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildNodes(width, height);
    };

    const resetMouse = () => {
      isInside = false;
      mouseX = -1000;
      mouseY = -1000;
    };

    const updateMouse = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;

      isInside = nextX >= 0 && nextX <= rect.width && nextY >= 0 && nextY <= rect.height;

      if (!isInside) {
        resetMouse();
        return;
      }

      mouseX = nextX;
      mouseY = nextY;
    };

    const drawGlow = (node: ParticleNode, size: number, intensity: number) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, size * 4.5, 0, Math.PI * 2);
      ctx.fillStyle = colorWithAlpha(node.colorToken, 0.08 * intensity);
      ctx.fill();

      if (intensity > 0.2) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha(node.colorToken, 0.16 * intensity);
        ctx.fill();
      }
    };

    const animate = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const time = performance.now() * 0.001;

      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x = node.baseX + Math.sin(time * node.floatSpeed + node.phase) * node.floatRadius;
        node.y = node.baseY + Math.cos(time * node.floatSpeed * 0.7 + node.phase) * node.floatRadius;
      }

      if (isInside) {
        for (let i = 0; i < nodes.length; i += 1) {
          const a = nodes[i];
          const distA = Math.hypot(a.x - mouseX, a.y - mouseY);
          if (distA > REVEAL_RADIUS) continue;

          for (let j = i + 1; j < nodes.length; j += 1) {
            const b = nodes[j];
            const distB = Math.hypot(b.x - mouseX, b.y - mouseY);
            if (distB > REVEAL_RADIUS) continue;

            const nodeDist = Math.hypot(a.x - b.x, a.y - b.y);
            if (nodeDist > CONNECT_DIST) continue;

            const proximity = 1 - nodeDist / CONNECT_DIST;
            const mouseProximity = 1 - Math.max(distA, distB) / REVEAL_RADIUS;
            const alpha = proximity * mouseProximity * 0.45;

            if (alpha <= 0.01) continue;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = colorWithAlpha(a.colorToken, alpha);
            ctx.lineWidth = 0.6 + mouseProximity * 1.6;
            ctx.stroke();
          }
        }
      }

      for (const node of nodes) {
        const distanceToMouse = Math.hypot(node.x - mouseX, node.y - mouseY);
        const revealProgress = isInside && distanceToMouse < REVEAL_RADIUS
          ? 1 - distanceToMouse / REVEAL_RADIUS
          : 0;

        const size = node.size + revealProgress * 4;
        const opacity = 0.02 + revealProgress * 0.82;

        if (revealProgress > 0) {
          drawGlow(node, size, revealProgress);
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = colorWithAlpha(node.colorToken, opacity);
        ctx.fill();
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("blur", resetMouse);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("blur", resetMouse);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
};

export default HeroParticleReveal;
