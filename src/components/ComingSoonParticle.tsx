import { useEffect, useRef } from "react";

const SPACING = 50;
const REVEAL_RADIUS = 200;
const CONNECT_DIST = 90;

const ComingSoonParticle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!container || !ctx) return;

    let animFrame = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let isInside = false;

    interface PNode { baseX: number; baseY: number; x: number; y: number; size: number; phase: number; floatSpeed: number; floatRadius: number; }
    let nodes: PNode[] = [];

    const build = (w: number, h: number) => {
      nodes = [];
      for (let c = 0; c <= Math.ceil(w / SPACING); c++) {
        for (let r = 0; r <= Math.ceil(h / SPACING); r++) {
          nodes.push({
            baseX: c * SPACING + (Math.random() - 0.5) * 18,
            baseY: r * SPACING + (Math.random() - 0.5) * 18,
            x: 0, y: 0,
            size: Math.random() * 1.8 + 1,
            phase: Math.random() * Math.PI * 2,
            floatSpeed: 0.2 + Math.random() * 0.3,
            floatRadius: 1.5 + Math.random() * 2.5,
          });
        }
      }
    };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(w, h);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      if (isInside) { mouseX = x; mouseY = y; } else { mouseX = -1000; mouseY = -1000; }
    };

    const onLeave = () => { isInside = false; mouseX = -1000; mouseY = -1000; };

    const animate = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const t = performance.now() * 0.001;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x = n.baseX + Math.sin(t * n.floatSpeed + n.phase) * n.floatRadius;
        n.y = n.baseY + Math.cos(t * n.floatSpeed * 0.7 + n.phase) * n.floatRadius;
      }

      if (isInside) {
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          const da = Math.hypot(a.x - mouseX, a.y - mouseY);
          if (da > REVEAL_RADIUS) continue;
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const db = Math.hypot(b.x - mouseX, b.y - mouseY);
            if (db > REVEAL_RADIUS) continue;
            const nd = Math.hypot(a.x - b.x, a.y - b.y);
            if (nd > CONNECT_DIST) continue;
            const alpha = (1 - nd / CONNECT_DIST) * (1 - Math.max(da, db) / REVEAL_RADIUS) * 0.4;
            if (alpha <= 0.01) continue;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6 + (1 - Math.max(da, db) / REVEAL_RADIUS) * 1.2;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const d = Math.hypot(n.x - mouseX, n.y - mouseY);
        const p = isInside && d < REVEAL_RADIUS ? 1 - d / REVEAL_RADIUS : 0;
        const size = n.size + p * 3;
        const opacity = 0.02 + p * 0.7;

        if (p > 0) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${0.06 * p})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();
      }

      animFrame = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", onLeave);
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", onLeave);
      ro.disconnect();
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
};

export default ComingSoonParticle;
