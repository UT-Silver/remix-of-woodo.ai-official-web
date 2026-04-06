import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.closest("a, button, [role='button'], .card-hover, .cursor-pointer")) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 12}px, ${pos.current.y - 12}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    animate();

    document.documentElement.style.cursor = "none";
    const style = document.createElement("style");
    style.textContent = "a,button,[role='button'],.card-hover,.cursor-pointer{cursor:none !important;}";
    document.head.appendChild(style);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
      style.remove();
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[200] pointer-events-none hidden md:block"
      style={{
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: hovering ? "2px solid hsl(var(--primary))" : "1.5px solid hsl(var(--muted-foreground))",
        background: hovering ? "hsla(var(--primary), 0.08)" : "transparent",
        transition: "border 0.2s, background 0.2s, width 0.2s, height 0.2s",
      }}
    />
  );
};

export default CustomCursor;
