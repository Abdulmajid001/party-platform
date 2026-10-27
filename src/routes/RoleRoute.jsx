import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";

export default function RoleRoute({ allow = [] }) {
  const user = useAuthStore((s) => s.user);

  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/announcements" replace />;
  }

  return <Outlet />;
}
