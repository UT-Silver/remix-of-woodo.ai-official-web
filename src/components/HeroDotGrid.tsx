import { useEffect, useRef } from "react";

interface HeroDotGridProps {
  mouseX: number;
  mouseY: number;
  isInside: boolean;
}

// 4x4 grid + satellite dots, positions relative to pattern center
const GRID_SPACING = 38;
const GRID_NODES: { x: number; y: number }[] = [];

// 4x4 core grid
for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 4; col++) {
    GRID_NODES.push({
      x: (col - 1.5) * GRID_SPACING,
      y: (row - 1.5) * GRID_SPACING,
    });
  }
}

// Satellite dots around edges
const SATELLITES = [
  { x: -2.5 * GRID_SPACING, y: -0.5 * GRID_SPACING },
  { x: 2.5 * GRID_SPACING, y: 0.5 * GRID_SPACING },
  { x: -0.5 * GRID_SPACING, y: -2.5 * GRID_SPACING },
  { x: 0.5 * GRID_SPACING, y: 2.5 * GRID_SPACING },
];
GRID_NODES.push(...SATELLITES);

// Connections: indices of nodes to connect (horizontal, vertical, some diagonals)
const CONNECTIONS: [number, number][] = [];
for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 4; col++) {
    const i = row * 4 + col;
    if (col < 3) CONNECTIONS.push([i, i + 1]); // horizontal
    if (row < 3) CONNECTIONS.push([i, i + 4]); // vertical
  }
}
// Connect satellites to nearest grid nodes
CONNECTIONS.push([16, 4], [17, 11], [18, 1], [19, 14]);

const DOT_COLOR = "#E3EC31";
const DOT_RADIUS = 5;
const LINE_WIDTH = 2.5;
const MAX_ROTATION = (15 * Math.PI) / 180;

const HeroDotGrid = ({ mouseX, mouseY, isInside }: HeroDotGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    cx: 0,
    cy: 0,
    rotation: 0,
    prevMouseX: 0,
    prevMouseY: 0,
    defaultX: 0,
    defaultY: 0,
    initialized: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current.defaultX = w / 2;
      stateRef.current.defaultY = h / 2;
      if (!stateRef.current.initialized) {
        stateRef.current.cx = stateRef.current.defaultX;
        stateRef.current.cy = stateRef.current.defaultY;
        stateRef.current.initialized = true;
      }
    };

    const draw = () => {
      const s = stateRef.current;
      const w = container.clientWidth;
      const h = container.clientHeight;

      // Lerp position
      const targetX = isInside ? mouseX : s.defaultX;
      const targetY = isInside ? mouseY : s.defaultY;
      s.cx += (targetX - s.cx) * 0.08;
      s.cy += (targetY - s.cy) * 0.08;

      // Rotation based on mouse velocity direction
      const dx = mouseX - s.prevMouseX;
      const dy = mouseY - s.prevMouseY;
      const speed = Math.hypot(dx, dy);
      let targetRotation = 0;
      if (isInside && speed > 1) {
        targetRotation = Math.atan2(dy, dx) * 0.3;
        targetRotation = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, targetRotation));
      }
      s.rotation += (targetRotation - s.rotation) * 0.05;
      s.prevMouseX = mouseX;
      s.prevMouseY = mouseY;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(s.cx, s.cy);
      ctx.rotate(s.rotation);

      // Draw connections
      ctx.strokeStyle = DOT_COLOR;
      ctx.lineWidth = LINE_WIDTH;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.45;
      for (const [a, b] of CONNECTIONS) {
        ctx.beginPath();
        ctx.moveTo(GRID_NODES[a].x, GRID_NODES[a].y);
        ctx.lineTo(GRID_NODES[b].x, GRID_NODES[b].y);
        ctx.stroke();
      }

      // Draw dots
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = DOT_COLOR;
      for (const node of GRID_NODES) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mouseX, mouseY, isInside]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};

export default HeroDotGrid;
