import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import Avatar from "@/components/shared/Avatar";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import { useDataStore } from "@/data/store";
import { cn, timeAgo } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All" },
  { id: "direct", label: "Direct" },
  { id: "group", label: "Groups" },
];

export default function ConversationList({ activeId }) {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const conversations = useDataStore((s) => s.conversations);
  const messages = useDataStore((s) => s.messages);

  const items = conversations
    .map((c) => {
      const list = messages[c.id] || [];
      return { ...c, last: list[list.length - 1] };
    })
    .filter((c) => (tab === "all" ? true : c.type === tab))
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.last?.createdAt || 0) - new Date(a.last?.createdAt || 0));

  return (
    <>
      <div className="border-b border-rule p-4">
        <h1 className="mb-3 text-xl font-bold tracking-tight">Messages</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search chats"
            aria-label="Search chats"
            className="w-full rounded-full bg-mist py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-leaf/20"
          />
        </div>
        <div className="mt-3 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative rounded-full px-3.5 py-1 text-sm font-medium transition-colors",
                tab === t.id ? "text-white" : "text-muted hover:text-ink"
              )}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="conversation-tab"
                  className="absolute inset-0 rounded-full bg-leaf"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {items.length === 0 && (
          <li className="p-6 text-center text-sm text-muted">No chats found.</li>
        )}
        {items.map((c, i) => (
          <motion.li
            key={c.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to={`/messages/${c.id}`}
              className={cn(
                "flex items-center gap-3 border-b border-rule/60 px-4 py-3 transition-colors hover:bg-mist",
                activeId === c.id && "bg-mist"
              )}
            >
              <Avatar src={c.avatar} name={c.name} size={44} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-1 font-semibold">
                    <span className="truncate">{c.name}</span>
                    {c.verified && <VerifiedBadge size={15} />}
                  </p>
                  {c.last && (
                    <span className="shrink-0 text-xs text-muted">{timeAgo(c.last.createdAt)}</span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm text-muted">
                    {c.last ? c.last.text : "Say hello"}
                  </p>
                  {c.unread > 0 && (
                    <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-sun px-1.5 text-xs font-bold text-ink">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
