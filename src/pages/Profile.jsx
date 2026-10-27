import { motion } from "motion/react";
import { Mail, MapPin, Pencil, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/shared/Avatar";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import { useAuthStore } from "@/lib/auth";
import { ROLE_LABELS } from "@/lib/constants";
import { IMAGES } from "@/data/images";

export default function Profile() {
  const user = useAuthStore((s) => s.user);

  const stats = [
    { label: "Groups", value: user.groups },
    { label: "Connections", value: user.connections },
    { label: "Member since", value: user.memberSince },
  ];

  const details = [
    { icon: Mail, label: "Email", value: user.email },
    { icon: Phone, label: "Phone", value: user.phone },
    { icon: MapPin, label: "Location", value: `${user.ward}, ${user.state}` },
  ];

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-rule bg-white">
      <img src={IMAGES.cover} alt="" className="h-36 w-full object-cover sm:h-48" />

      <div className="px-5 pb-8 sm:px-8">
        <div className="-mt-12 flex items-end justify-between gap-4">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            <Avatar src={user.avatar} name={user.name} size={96} className="ring-4 ring-white" />
          </motion.div>
          <Button to="/profile/edit" variant="outline" size="sm">
            <Pencil size={14} /> Edit profile
          </Button>
        </div>

        <h1 className="mt-4 flex items-center gap-2 text-2xl font-bold tracking-tight">
          {user.name} {user.verified && <VerifiedBadge size={20} />}
        </h1>
        <p className="text-muted">
          {user.partyRole} &middot; {ROLE_LABELS[user.role]}
        </p>
        {!user.verified && (
          <p className="mt-3 inline-block rounded-full bg-sun/25 px-3 py-1 text-xs font-semibold">
            Verification not requested
          </p>
        )}

        <p className="mt-5 max-w-xl leading-relaxed">{user.bio}</p>

        <dl className="mt-8 grid grid-cols-3 divide-x divide-rule rounded-2xl border border-rule">
          {stats.map((s) => (
            <div key={s.label} className="p-4 text-center">
              <dt className="text-xs text-muted">{s.label}</dt>
              <dd className="mt-1 text-xl font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 space-y-4">
          {details.map(({ icon: Icon, label, value }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mist text-leaf">
                <Icon size={16} />
              </span>
              <div>
                <p className="text-xs text-muted">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
