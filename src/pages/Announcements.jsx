import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Modal from "@/components/ui/Modal";
import Avatar from "@/components/shared/Avatar";
import PageHeader from "@/components/shared/PageHeader";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import { useAuthStore } from "@/lib/auth";
import { useDataStore } from "@/data/store";
import { photo } from "@/data/images";
import { AUDIENCES } from "@/lib/constants";
import { cn, timeAgo } from "@/lib/utils";

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function AudienceTag({ children }) {
  return (
    <span className="rounded-full bg-sun/25 px-2.5 py-0.5 text-xs font-semibold text-ink">
      {children}
    </span>
  );
}

export default function Announcements() {
  const user = useAuthStore((s) => s.user);
  const announcements = useDataStore((s) => s.announcements);
  const addAnnouncement = useDataStore((s) => s.addAnnouncement);
  const [filter, setFilter] = useState("All");
  const [composing, setComposing] = useState(false);

  const canPost = user?.role === "leader" || user?.role === "admin";
  const filtered = announcements.filter((a) => filter === "All" || a.audience === filter);
  const [featured, ...rest] = filtered;

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    addAnnouncement({
      id: `a${Date.now()}`,
      title: values.title,
      body: values.body,
      audience: values.audience,
      author: {
        id: user.id,
        name: user.name,
        title: user.partyRole,
        avatar: user.avatar,
        verified: user.verified,
      },
      createdAt: new Date().toISOString(),
      image: values.image || photo(`ann-${Date.now()}`, 1000, 650),
    });
    setComposing(false);
    setFilter("All");
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Announcements"
        subtitle="Updates from verified party leaders, sent to the right audience."
        action={
          canPost && (
            <Button onClick={() => setComposing(true)}>
              <Plus size={16} /> New announcement
            </Button>
          )
        }
      />

      <div className="mb-6 flex flex-wrap gap-1">
        {["All", ...AUDIENCES].map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setFilter(a)}
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              filter === a ? "text-white" : "text-muted hover:text-ink"
            )}
          >
            {filter === a && (
              <motion.span
                layoutId="announcement-filter"
                className="absolute inset-0 rounded-full bg-leaf"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{a}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-rule bg-white p-10 text-center text-muted">
          No announcements for this audience yet.
        </p>
      )}

      <motion.div key={filter} variants={list} initial="hidden" animate="show" className="space-y-4">
        {featured && (
          <motion.div variants={item}>
            <Link
              to={`/announcements/${featured.id}`}
              className="group relative block overflow-hidden rounded-3xl"
            >
              <img
                src={featured.image}
                alt=""
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                <AudienceTag>{featured.audience}</AudienceTag>
                <h2 className="mt-2 max-w-xl text-2xl font-bold leading-tight sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                  <Avatar src={featured.author.avatar} name={featured.author.name} size={24} />
                  {featured.author.name}
                  {featured.author.verified && <VerifiedBadge size={14} />}
                  <span>&middot; {timeAgo(featured.createdAt)}</span>
                </p>
              </div>
            </Link>
          </motion.div>
        )}

        {rest.map((a) => (
          <motion.div key={a.id} variants={item}>
            <Link
              to={`/announcements/${a.id}`}
              className="flex gap-4 rounded-2xl border border-rule bg-white p-3 transition-colors hover:border-leaf/40"
            >
              <img src={a.image} alt="" loading="lazy" className="h-24 w-28 shrink-0 rounded-xl object-cover sm:h-28 sm:w-40" />
              <div className="min-w-0 flex-1 py-1">
                <AudienceTag>{a.audience}</AudienceTag>
                <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug">{a.title}</h3>
                <p className="mt-1 hidden line-clamp-1 text-sm text-muted sm:block">{a.body}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <Avatar src={a.author.avatar} name={a.author.name} size={20} />
                  <span className="truncate">{a.author.name}</span>
                  {a.author.verified && <VerifiedBadge size={13} />}
                  <span>&middot; {timeAgo(a.createdAt)}</span>
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <Modal open={composing} onClose={() => setComposing(false)} title="New announcement">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" name="title" required maxLength={120} placeholder="What do members need to know?" />
          <Field as="select" label="Audience" name="audience" defaultValue="Ward">
            {AUDIENCES.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </Field>
          <Field as="textarea" label="Message" name="body" rows={5} required placeholder="Write the full announcement" />
          <Field label="Image URL (optional)" name="image" type="url" placeholder="https://..." />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setComposing(false)}>Cancel</Button>
            <Button type="submit">Post announcement</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
