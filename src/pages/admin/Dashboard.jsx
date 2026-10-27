import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/shared/Avatar";
import CountUp from "@/components/shared/CountUp";
import PageHeader from "@/components/shared/PageHeader";
import { useDataStore } from "@/data/store";
import { timeAgo } from "@/lib/utils";

export default function AdminDashboard() {
  const queue = useDataStore((s) => s.verificationQueue);
  const reports = useDataStore((s) => s.reports);
  const announcements = useDataStore((s) => s.announcements);
  const resolveVerification = useDataStore((s) => s.resolveVerification);
  const resolveReport = useDataStore((s) => s.resolveReport);

  const stats = [
    { label: "Members", value: 12480 },
    { label: "Verified leaders", value: 214 },
    { label: "Open reports", value: reports.length },
    { label: "Announcements", value: announcements.length },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Admin" subtitle="Verify leaders and keep the platform safe." />

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-rule bg-white p-4">
            <dt className="text-sm text-muted">{s.label}</dt>
            <dd className="mt-1 text-3xl font-bold">
              <CountUp to={s.value} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="mb-3 text-lg font-semibold">Verification requests</h2>
          <ul className="space-y-3">
            <AnimatePresence mode="popLayout">
              {queue.map((v) => (
                <motion.li
                  key={v.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="flex items-center gap-3 rounded-2xl border border-rule bg-white p-3"
                >
                  <Avatar src={v.avatar} name={v.name} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{v.name}</p>
                    <p className="truncate text-sm text-muted">{v.title}, {v.state}</p>
                    <p className="text-xs text-muted">Requested {timeAgo(v.submitted)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => resolveVerification(v.id)}
                    aria-label={`Reject ${v.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-rule text-muted hover:bg-red-50 hover:text-red-600"
                  >
                    <X size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => resolveVerification(v.id)}
                    aria-label={`Approve ${v.name}`}
                    className="grid h-9 w-9 place-items-center rounded-full bg-leaf text-white hover:bg-leaf-dark"
                  >
                    <Check size={16} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
            {queue.length === 0 && (
              <li className="rounded-2xl border border-dashed border-rule bg-white p-8 text-center text-sm text-muted">
                All caught up. No pending requests.
              </li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Reports</h2>
          <ul className="space-y-3">
            <AnimatePresence mode="popLayout">
              {reports.map((r) => (
                <motion.li
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  className="rounded-2xl border border-rule bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-muted">
                    <span className="rounded-full bg-mist px-2.5 py-0.5 font-semibold text-ink">{r.type}</span>
                    <span>{timeAgo(r.createdAt)}</span>
                  </div>
                  <p className="mt-2 font-semibold">{r.target}</p>
                  <p className="text-sm text-muted">{r.reason}</p>
                  <p className="mt-1 text-xs text-muted">Reported by {r.reportedBy}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => resolveReport(r.id)}>Dismiss</Button>
                    <Button size="sm" variant="danger" onClick={() => resolveReport(r.id)}>Remove content</Button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
            {reports.length === 0 && (
              <li className="rounded-2xl border border-dashed border-rule bg-white p-8 text-center text-sm text-muted">
                No open reports.
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
