import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { useAuthStore } from "@/lib/auth";
import { NIGERIAN_STATES } from "@/lib/constants";
import { IMAGES } from "@/data/images";

export default function Register() {
  const user = useAuthStore((s) => s.user);
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/announcements" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    if (values.password.length < 8) {
      setError("Use a password with at least 8 characters.");
      return;
    }
    if (values.password !== values.confirm) {
      setError("The two passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await register({
        name: values.name,
        email: values.email,
        phone: values.phone,
        state: values.state,
        ward: values.ward,
        password: values.password,
        applyAsLeader: values.applyAsLeader === "on",
      });
      navigate("/announcements", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "We could not create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl lg:grid-cols-[1.1fr_1fr]">
      <motion.div
        className="flex items-center px-5 py-12 lg:px-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-muted">Tell us where you are so we can connect you to your ward.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2" label="Full name" name="name" autoComplete="name" required placeholder="Tiwa Balogun" />
            <Field label="Email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" required placeholder="0803 000 0000" />
            <Field as="select" label="State" name="state" required defaultValue="">
              <option value="" disabled>Select state</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Field>
            <Field label="Ward" name="ward" required placeholder="Ikeja Ward 3" />
            <Field label="Password" name="password" type="password" autoComplete="new-password" required placeholder="At least 8 characters" />
            <Field label="Confirm password" name="confirm" type="password" autoComplete="new-password" required placeholder="Repeat password" />

            <label className="flex items-start gap-2 text-sm sm:col-span-2">
              <input type="checkbox" name="applyAsLeader" className="mt-1 accent-leaf" />
              <span>I am a party leader or official and want to apply for a verified badge.</span>
            </label>
            <label className="flex items-start gap-2 text-sm sm:col-span-2">
              <input type="checkbox" name="consent" required className="mt-1 accent-leaf" />
              <span>
                I agree to the privacy policy and consent to my details being used to manage my
                party membership.
              </span>
            </label>

            {error && <p role="alert" className="text-sm text-red-600 sm:col-span-2">{error}</p>}

            <Button type="submit" size="lg" className="w-full sm:col-span-2" disabled={loading}>
              {loading ? "Creating account..." : "Register now"}
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted">
            Already registered?{" "}
            <Link to="/sign-in" className="font-semibold text-leaf hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>

      <div className="relative hidden lg:block">
        <img src={IMAGES.register} alt="Neighbours at a ward event" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <p className="absolute bottom-10 left-10 right-10 text-2xl font-semibold text-white">
          Your ward group is waiting for you.
        </p>
      </div>
    </div>
  );
}
