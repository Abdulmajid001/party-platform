import { cn } from "@/lib/utils";

export default function Avatar({ src, name = "", size = 40, className }) {
  const initials = name
    .replace(/^(Hon\.|Alhaji|Chief|Barr\.|Engr\.|Hajiya|Mrs\.)\s+/i, "")
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const style = { width: size, height: size };

  if (!src) {
    return (
      <span
        style={style}
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-leaf/10 text-sm font-semibold text-leaf",
          className
        )}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      loading="lazy"
      style={style}
      className={cn("shrink-0 rounded-full bg-mist object-cover", className)}
    />
  );
}
