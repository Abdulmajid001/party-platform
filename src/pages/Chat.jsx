import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Send } from "lucide-react";
import Avatar from "@/components/shared/Avatar";
import VerifiedBadge from "@/components/shared/VerifiedBadge";
import EmptyChat from "@/components/messages/EmptyChat";
import { useAuthStore } from "@/lib/auth";
import { useDataStore } from "@/data/store";
import { groupReplies, leaderReplies } from "@/data/mock";
import { cn, formatTime } from "@/lib/utils";

const EMPTY = [];

export default function Chat() {
  const { conversationId } = useParams();
  const user = useAuthStore((s) => s.user);
  const conversation = useDataStore((s) => s.conversations.find((c) => c.id === conversationId));
  const messages = useDataStore((s) => s.messages[conversationId]) || EMPTY;
  const sendMessage = useDataStore((s) => s.sendMessage);
  const markRead = useDataStore((s) => s.markRead);

  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const replyTimer = useRef(null);

  useEffect(() => {
    markRead(conversationId);
  }, [conversationId, markRead]);

  // Keep the newest message in view (re-run whenever a message arrives or typing starts/stops)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [messages.length, typing]);

  // The chat remounts per conversation (see Messages.jsx), so this only runs on leave
  useEffect(() => {
    return () => clearTimeout(replyTimer.current);
  }, []);

  if (!conversation) return <EmptyChat />;

  const isGroup = conversation.type === "group";

  // Demo only: simulates a reply. Remove once real-time messages come from the backend.
  const fakeReply = () => {
    setTyping(true);
    replyTimer.current = setTimeout(() => {
      const pool = isGroup ? groupReplies : leaderReplies;
      const senderName = isGroup
        ? conversation.memberNames[Math.floor(Math.random() * conversation.memberNames.length)]
        : conversation.name;
      sendMessage(conversationId, {
        id: `m${Date.now()}`,
        senderId: isGroup ? "member" : conversation.leaderId,
        senderName,
        text: pool[Math.floor(Math.random() * pool.length)],
        createdAt: new Date().toISOString(),
      });
      setTyping(false);
    }, 1600);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    const value = text.trim();
    if (!value) return;
    sendMessage(conversationId, {
      id: `m${Date.now()}`,
      senderId: "me",
      senderName: "You",
      text: value,
      createdAt: new Date().toISOString(),
    });
    setText("");
    clearTimeout(replyTimer.current);
    fakeReply();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) handleSend(e);
  };

  return (
    <>
      <header className="flex items-center gap-3 border-b border-rule px-4 py-3">
        <Link to="/messages" aria-label="Back to messages" className="rounded-full p-1.5 hover:bg-mist md:hidden">
          <ArrowLeft size={20} />
        </Link>
        <Avatar src={conversation.avatar} name={conversation.name} size={40} />
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-semibold">
            <span className="truncate">{conversation.name}</span>
            {conversation.verified && <VerifiedBadge />}
          </p>
          <p className="truncate text-xs text-muted">{conversation.subtitle}</p>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-mist/60 p-4">
        {messages.length === 0 && (
          <p className="pt-10 text-center text-sm text-muted">
            No messages yet. Introduce yourself and say what you need.
          </p>
        )}

        {messages.map((m) => {
          const mine = m.senderId === user?.id || m.senderId === "me";
          return (
            <motion.div
              key={m.id}
              className={cn("flex", mine ? "justify-end" : "justify-start")}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-3.5 py-2 sm:max-w-[65%]",
                  mine ? "rounded-br-md bg-leaf text-white" : "rounded-bl-md bg-white"
                )}
              >
                {isGroup && !mine && (
                  <p className="mb-0.5 text-xs font-semibold text-leaf">{m.senderName}</p>
                )}
                <p className="whitespace-pre-wrap break-words text-sm">{m.text}</p>
                <p className={cn("mt-1 text-right text-[11px]", mine ? "text-white/70" : "text-muted")}>
                  {formatTime(m.createdAt)}
                </p>
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {typing && (
            <motion.div
              className="flex"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3" aria-label="Typing">
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-muted"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-end gap-2 border-t border-rule p-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          maxLength={1000}
          aria-label="Type a message"
          placeholder="Type a message"
          className="max-h-32 min-h-10 flex-1 resize-none rounded-2xl bg-mist px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-leaf/20"
        />
        <motion.button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send message"
          whileTap={{ scale: 0.9 }}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-leaf text-white transition-opacity disabled:opacity-40"
        >
          <Send size={18} />
        </motion.button>
      </form>
    </>
  );
}
