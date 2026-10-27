import { BadgeCheck } from "lucide-react";

export default function VerifiedBadge({ size = 16 }) {
  return (
    <BadgeCheck
      size={size}
      aria-label="Verified leader"
      className="inline shrink-0 text-leaf"
    />
  );
}
