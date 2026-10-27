import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LogOut, Megaphone, MessageSquare, ShieldCheck, User } from "lucide-react";
import Avatar from "@/components/shared/Avatar";
import Logo from "@/components/shared/Logo";
import { useAuthStore } from "@/lib/auth";
import { useDataStore } from "@/data/store";
import { cn } from "@/lib/utils";

export default function DashboardLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const unread = useDataStore((s) => s.conversations.reduce((sum, c) => sum + c.unread, 0));
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/announcements", label: "Announcements", icon: Megaphone },
    { to: "/messages", label: "Messages", icon: MessageSquare, badge: unread },
    { to: "/profile", label: "Profile", icon: User },
    ...(user?.role === "admin" ? [{ to: "/admin", label: "Admin", icon: ShieldCheck }] : []),
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-mist">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-rule bg-white p-4 md:flex">
        <div className="px-2 py-2">
          <Logo />
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {links.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive ? "text-leaf" : "text-muted hover:text-ink"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-pill"
                      className="absolute inset-0 rounded-xl bg-leaf/10"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <Icon size={18} className="relative" />
                  <span className="relative flex-1">{label}</span>
                  {badge > 0 && (
                    <span className="relative grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1.5 text-xs font-bold text-ink">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 border-t border-rule pt-4">
          <Avatar src={user?.avatar} name={user?.name} size={40} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs capitalize text-muted">{user?.role}</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            aria-label="Sign out"
            className="rounded-full p-2 text-muted hover:bg-mist hover:text-ink"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Page content */}
      <motion.main
        key={location.pathname.split("/")[1]}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="p-4 pb-24 md:ml-64 md:p-6 md:pb-6"
      >
        <Outlet />
      </motion.main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-rule bg-white md:hidden">
        {links.map(({ to, label, icon: Icon, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "relative flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium",
                isActive ? "text-leaf" : "text-muted"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-bar"
                    className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-leaf"
                  />
                )}
                <span className="relative">
                  <Icon size={20} />
                  {badge > 0 && (
                    <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-sun px-1 text-[10px] font-bold text-ink">
                      {badge}
                    </span>
                  )}
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
