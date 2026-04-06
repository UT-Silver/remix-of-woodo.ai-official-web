import { useRef, useState, ReactNode, CSSProperties } from "react";
import { Link } from "react-router-dom";

interface MagneticButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const MagneticButton = ({ to, children, className = "", style }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.15;
    const dy = (e.clientY - cy) * 0.15;
    setOffset({ x: Math.max(-4, Math.min(4, dx)), y: Math.max(-4, Math.min(4, dy)) });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <Link
      ref={ref}
      to={to}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </Link>
  );
};

export default MagneticButton;
