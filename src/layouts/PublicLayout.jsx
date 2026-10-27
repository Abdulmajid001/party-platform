import { Link, Outlet } from "react-router-dom";
import Button from "@/components/ui/Button";
import Logo from "@/components/shared/Logo";
import { useAuthStore } from "@/lib/auth";
import { APP_NAME } from "@/lib/constants";

const YEAR = new Date().getFullYear();

export default function PublicLayout() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-rule bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="flex items-center gap-2">
            {user ? (
              <Button to="/announcements" size="sm">Open app</Button>
            ) : (
              <>
                <Button to="/sign-in" variant="ghost" size="sm">Sign in</Button>
                <Button to="/register" size="sm">Register now</Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-ink text-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm">
          <p>&copy; {YEAR} {APP_NAME}. Built for party members and their leaders.</p>
          <nav className="flex gap-5">
            <Link to="/sign-in" className="hover:text-white">Sign in</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
            <a href="#privacy" className="hover:text-white">Privacy</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
