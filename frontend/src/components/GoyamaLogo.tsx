import logo from "@/assets/logo.png";

interface GoyamaLogoProps {
  className?: string;
  size?: "small" | "default" | "large" | "xl";
}

const GoyamaLogo = ({
  className = "",
  size = "default",
}: GoyamaLogoProps) => {
  const sizes = {
    small: "w-28",
    default: "w-40",
    large: "w-56",
    xl: "w-72",
  };

  return (
    <img
      src={logo}
      alt="Goyama Solar - Solar Manufacturing Company"
      className={`h-auto object-contain ${sizes[size]} ${className}`}
      loading="eager"
      draggable={false}
    />
  );
};

export default GoyamaLogo;