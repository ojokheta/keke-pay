import { Image, type ImageStyle, type StyleProp } from "react-native";

const SOURCE = require("../../assets/logo.png");
const ASPECT = 572 / 436;

interface LogoProps {
  height?: number;
  width?: number;
  className?: string;
}

export function Logo({ height, width, className }: LogoProps) {
  const h = height ?? (width ? width / ASPECT : 36);
  const w = width ?? h * ASPECT;
  const style: StyleProp<ImageStyle> = {
    height: h,
    width: w,
    resizeMode: "contain",
  };

  return (
    <Image
      source={SOURCE}
      style={style}
      className={className}
      accessibilityLabel="Kekepay"
    />
  );
}
