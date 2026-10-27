import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

const variants = {
  primary: "bg-leaf text-white hover:bg-leaf-dark",
  sun: "bg-sun text-ink hover:brightness-95",
  outline: "border border-ink/20 text-ink hover:bg-ink/5",
  ghost: "text-ink hover:bg-ink/5",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  to,
  variant = "primary",
  size = "md",
  type = "button",
  className,
  children,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (to) {
    return (
      <MotionLink to={to} whileTap={{ scale: 0.97 }} className={classes} {...props}>
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button type={type} whileTap={{ scale: 0.97 }} className={classes} {...props}>
      {children}
    </motion.button>
  );
}
