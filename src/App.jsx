import { useEffect } from "react";
import AppRoutes from "./routes";
import { useAuthStore } from "@/lib/auth";

export default function App() {
  const fetchUser = useAuthStore((s) => s.fetchUser);

  // Restore the session on first load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <AppRoutes />;
}
