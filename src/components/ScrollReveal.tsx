import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "scaleIn" | "fadeOnly";
  duration?: number;
}

const ScrollReveal = ({ children, delay = 0, className = "", direction = "up", duration }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const dirClass =
    direction === "left" ? "scroll-reveal-left" :
    direction === "right" ? "scroll-reveal-right" :
    direction === "scaleIn" ? "scroll-reveal-scale" :
    direction === "fadeOnly" ? "scroll-reveal-fade" :
    "scroll-reveal";

  const style = duration ? { transitionDuration: `${duration}ms` } : undefined;

  return (
    <div ref={ref} className={`${dirClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
