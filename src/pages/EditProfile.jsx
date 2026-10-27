import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Avatar from "@/components/shared/Avatar";
import PageHeader from "@/components/shared/PageHeader";
import { useAuthStore } from "@/lib/auth";
import { NIGERIAN_STATES } from "@/lib/constants";

export default function EditProfile() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    setSaving(true);
    setError("");
    try {
      await updateProfile({ ...values, avatar: avatarUrl });
      navigate("/profile");
    } catch {
      setError("We could not save your changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Edit profile" subtitle="Keep your details current so leaders can reach you." />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-rule bg-white p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <Avatar src={avatarUrl} name={user.name} size={72} />
          <Field
            className="flex-1"
            label="Photo URL"
            name="avatarUrl"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="name" defaultValue={user.name} required />
          <Field label="Phone" name="phone" type="tel" defaultValue={user.phone} />
          <Field as="select" label="State" name="state" defaultValue={user.state}>
            {NIGERIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Field>
          <Field label="Ward" name="ward" defaultValue={user.ward} />
        </div>

        <Field as="textarea" label="Bio" name="bio" rows={4} maxLength={300} defaultValue={user.bio} />

        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => navigate("/profile")}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
        </div>
      </form>
    </div>
  );
}
