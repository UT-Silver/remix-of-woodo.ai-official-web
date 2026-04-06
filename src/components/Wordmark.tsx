import { Link } from "react-router-dom";

interface WordmarkProps {
  variant?: "light" | "dark" | "onGreen";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-7xl md:text-8xl lg:text-9xl",
};

const Wordmark = ({ variant = "light", size = "md" }: WordmarkProps) => {
  // 悟动 = green, woodo. = amber, ai = green
  // On green background (splash), use white for green parts
  const greenColor =
    variant === "onGreen" ? "#FFFFFF" :
    "#22C55E";

  const amberColor =
    variant === "onGreen" ? "#FEF9C3" :
    "#FBBF24";

  return (
    <Link to="/" className={`nav-logo font-bold tracking-tight ${sizeMap[size]} inline-block`} style={{ letterSpacing: "-1px" }}>
      <span style={{ color: greenColor }}>悟动 </span>
      <span style={{ color: amberColor, fontWeight: 700 }}>woodo.</span>
      <span style={{ color: greenColor, fontWeight: 700 }}>ai</span>
    </Link>
  );
};

export default Wordmark;
