import { useEffect, useRef } from "react";

const AnimatedLine = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.transition = "stroke-dashoffset 1.5s ease-out";
          path.style.strokeDashoffset = "0";
          observer.unobserve(path);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-8 flex justify-center overflow-hidden">
      <svg width="400" height="40" viewBox="0 0 400 40" fill="none" className="w-full max-w-md">
        <path
          ref={pathRef}
          d="M0 20 Q50 5 100 20 T200 20 T300 20 T400 20"
          stroke="hsl(var(--primary-light))"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default AnimatedLine;
