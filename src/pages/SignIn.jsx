import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { useAuthStore } from "@/lib/auth";
import { IMAGES } from "@/data/images";

export default function SignIn() {
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/announcements";

  if (user) return <Navigate to={redirectTo} replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError("");
    setLoading(true);
    try {
      await login({ email: form.get("email"), password: form.get("password") });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "We could not sign you in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl lg:grid-cols-2">
      <motion.div
        className="flex items-center px-5 py-12 lg:px-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-muted">Sign in to see what your leaders have posted.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <Field label="Password" name="password" type="password" autoComplete="current-password" required placeholder="Your password" />
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted">
            New here?{" "}
            <Link to="/register" className="font-semibold text-leaf hover:underline">Register now</Link>
          </p>

          <p className="mt-8 rounded-xl bg-mist p-3 text-xs text-muted">
            Demo mode: use any email and password. Include &ldquo;leader&rdquo; or &ldquo;admin&rdquo;
            in the email (for example leader@test.com) to preview those roles.
          </p>
        </div>
      </motion.div>

      <div className="relative hidden lg:block">
        <img src={IMAGES.signIn} alt="Members at a community meeting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <p className="absolute bottom-10 left-10 right-10 text-2xl font-semibold text-white">
          &ldquo;I finally know what is happening in my ward before Saturday, not after.&rdquo;
        </p>
      </div>
    </div>
  );
}
