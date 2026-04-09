import { useEffect, useRef } from "react";

interface Node {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  size: number;
  color: { r: number; g: number; b: number };
  phase: number;
  floatSpeed: number;
  floatRadius: number;
}

const COLORS = [
  { r: 34, g: 197, b: 94 },
  { r: 56, g: 189, b: 248 },
  { r: 251, g: 191, b: 36 },
];

const SPACING = 55;
const MOUSE_RADIUS = 250;
const CONNECT_DIST = 100;

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const initNodes = () => {
      nodes = [];
      const W = canvas.width;
      const H = canvas.height;
      const cols = Math.ceil(W / SPACING) + 2;
      const rows = Math.ceil(H / SPACING) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          nodes.push({
            baseX: i * SPACING + (Math.random() - 0.5) * 20,
            baseY: j * SPACING + (Math.random() - 0.5) * 20,
            x: 0,
            y: 0,
            size: Math.random() * 2.5 + 1.5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            phase: Math.random() * Math.PI * 2,
            floatSpeed: 0.2 + Math.random() * 0.3,
            floatRadius: 1.5 + Math.random() * 2.5,
          });
        }
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Cache dark section rects
    let darkRects: DOMRect[] = [];
    let lastRectCheck = 0;

    const refreshDarkRects = () => {
      const selectors = '.bg-slate-dark, .dark-section-glow, .bg-cta-green';
      darkRects = Array.from(document.querySelectorAll(selectors)).map(el => el.getBoundingClientRect());
      lastRectCheck = Date.now();
    };

    const isInDarkZone = (x: number, y: number) => {
      for (const r of darkRects) {
        if (y >= r.top && y <= r.bottom && x >= r.left && x <= r.right) return true;
      }
      return false;
    };

    const isMouseInDarkZone = () => isInDarkZone(mouseX, mouseY);

    const animate = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const time = Date.now() * 0.001;

      // Refresh dark section positions every 500ms
      if (Date.now() - lastRectCheck > 500) refreshDarkRects();

      // Update positions
      for (const node of nodes) {
        node.x = node.baseX + Math.sin(time * node.floatSpeed + node.phase) * node.floatRadius;
        node.y = node.baseY + Math.cos(time * node.floatSpeed * 0.7 + node.phase) * node.floatRadius;
      }

      // Only draw connections & enhanced particles when mouse is in a dark zone
      const mouseInDark = isMouseInDarkZone();

      if (mouseInDark) {
        // Draw connections (only near mouse, only in dark zones)
        const mouseRadiusOuter = MOUSE_RADIUS * 1.3;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          if (!isInDarkZone(a.x, a.y)) continue;
          const dma = Math.sqrt((a.x - mouseX) ** 2 + (a.y - mouseY) ** 2);
          if (dma > mouseRadiusOuter) continue;

          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            if (!isInDarkZone(b.x, b.y)) continue;
            const dmb = Math.sqrt((b.x - mouseX) ** 2 + (b.y - mouseY) ** 2);
            if (dmb > mouseRadiusOuter) continue;

            const dx = a.x - b.x, dy = a.y - b.y;
            const nodeDist = Math.sqrt(dx * dx + dy * dy);

            if (nodeDist < CONNECT_DIST) {
              const np = 1 - nodeDist / CONNECT_DIST;
              const mp = 1 - Math.max(dma, dmb) / mouseRadiusOuter;
              const alpha = np * mp * 0.35;

              if (alpha > 0.01) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(134, 239, 172, ${alpha})`;
                ctx.lineWidth = 0.5 + mp * 1;
                ctx.stroke();
              }
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const dm = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2);
        const isDark = isInDarkZone(node.x, node.y);

        // In light zones at z-15 (above main content), skip rendering entirely
        if (!isDark) {
          // Draw very faint dots only (these will be hidden behind main content anyway at z-5 behavior)
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.04)`;
          ctx.fill();
          continue;
        }

        let opacity = 0.55;
        let size = node.size * 1.3;

        if (dm < MOUSE_RADIUS && mouseInDark) {
          const p = 1 - dm / MOUSE_RADIUS;
          opacity = 0.55 + p * 0.6;
          size = node.size + p * 3;

          if (p > 0.3) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, size * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${0.06 * p * 2.5})`;
            ctx.fill();
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, width: "100vw", height: "100vh" }}
    />
  );
};

export default ParticleBackground;
