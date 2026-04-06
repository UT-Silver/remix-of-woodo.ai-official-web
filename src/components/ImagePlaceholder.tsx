import { Camera } from "lucide-react";

interface ImagePlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  variant?: "green" | "blue" | "neutral";
  className?: string;
  circle?: boolean;
  aspectRatio?: string;
}

const variantColors = {
  green: "bg-primary-lightest border-primary-light",
  blue: "bg-secondary-lightest border-secondary-light",
  neutral: "bg-muted border-border",
};

const ImagePlaceholder = ({
  label = "Image",
  variant = "neutral",
  className = "",
  circle = false,
  aspectRatio,
}: ImagePlaceholderProps) => {
  return (
    <div
      className={`${variantColors[variant]} border-2 border-dashed flex flex-col items-center justify-center gap-2 ${
        circle ? "rounded-full" : "rounded-2xl"
      } ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Camera className="w-6 h-6 text-muted-foreground opacity-40" />
      <span className="text-xs text-muted-foreground opacity-60">{label}</span>
    </div>
  );
};

export default ImagePlaceholder;
