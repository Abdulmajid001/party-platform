import { Link } from "react-router-dom";
import { APP_NAME } from "@/lib/constants";

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2 font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-leaf text-base text-sun">R</span>
      <span className={light ? "text-white" : "text-ink"}>{APP_NAME}</span>
    </Link>
  );
}
