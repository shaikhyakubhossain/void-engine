import styles from "./Skeleton.module.scss";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  circle?: boolean;
  animated?: boolean;
  className?: string;
}

export default function Skeleton({
  width = "100%",
  height = "20px",
  borderRadius = "6px",
  circle = false,
  animated = true,
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${
        animated ? styles.animated : ""
      } ${className}`}
      style={{
        width,
        height,
        borderRadius: circle ? "50%" : borderRadius,
      }}
      aria-hidden="true"
    />
  );
}