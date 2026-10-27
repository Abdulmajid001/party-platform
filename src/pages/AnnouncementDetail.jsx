import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/shared/Avatar";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import { useAuthStore } from "@/lib/auth";
import { useDataStore } from "@/data/store";
import { formatDate } from "@/lib/utils";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const announcement = useDataStore((s) => s.announcements.find((a) => a.id === id));
  const startConversation = useDataStore((s) => s.startConversation);

  if (!announcement) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <h1 className="text-2xl font-bold">Announcement not found</h1>
        <Button to="/announcements" className="mt-6">Back to announcements</Button>
      </div>
    );
  }

  const { author } = announcement;
  const canMessage = author.id !== user?.id;

  const handleMessage = () => {
    const conversationId = startConversation(author);
    navigate(`/messages/${conversationId}`);
  };

  return (
    <motion.article
      className="mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link to="/announcements" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
        <ArrowLeft size={16} /> All announcements
      </Link>

      <img src={announcement.image} alt="" className="h-64 w-full rounded-3xl object-cover sm:h-80" />

      <div className="mt-6 flex items-center gap-2 text-sm text-muted">
        <span className="rounded-full bg-sun/25 px-2.5 py-0.5 text-xs font-semibold text-ink">
          {announcement.audience}
        </span>
        {formatDate(announcement.createdAt)}
      </div>

      <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {announcement.title}
      </h1>

      <div className="mt-6 space-y-4 text-lg leading-relaxed">
        {announcement.body.split("\n\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-rule bg-white p-4">
        <div className="flex items-center gap-3">
          <Avatar src={author.avatar} name={author.name} size={48} />
          <div>
            <p className="flex items-center gap-1 font-semibold">
              {author.name} {author.verified && <VerifiedBadge />}
            </p>
            <p className="text-sm text-muted">{author.title}</p>
          </div>
        </div>
        {canMessage && (
          <Button onClick={handleMessage}>
            <MessageSquare size={16} /> Message {author.name.split(" ").slice(-1)[0]}
          </Button>
        )}
      </div>
    </motion.article>
  );
}
