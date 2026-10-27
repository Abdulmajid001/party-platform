import { create } from "zustand";
import {
  initialAnnouncements,
  initialConversations,
  initialMessages,
  initialQueue,
  initialReports,
} from "./mock";

// Local mock state. When your backend is ready, replace these actions with
// API calls (TanStack Query is already set up in routes/index.jsx).
export const useDataStore = create((set, get) => ({
  announcements: initialAnnouncements,
  conversations: initialConversations,
  messages: initialMessages,
  verificationQueue: initialQueue,
  reports: initialReports,

  addAnnouncement: (announcement) =>
    set((s) => ({ announcements: [announcement, ...s.announcements] })),

  sendMessage: (conversationId, message) =>
    set((s) => ({
      messages: {
        ...s.messages,
        [conversationId]: [...(s.messages[conversationId] || []), message],
      },
    })),

  markRead: (conversationId) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === conversationId && c.unread ? { ...c, unread: 0 } : c
      ),
    })),

  // Find (or create) a direct conversation with a leader and return its id
  startConversation: (leader) => {
    const existing = get().conversations.find((c) => c.leaderId === leader.id);
    if (existing) return existing.id;

    const id = `c-${leader.id}`;
    set((s) => ({
      conversations: [
        {
          id,
          type: "direct",
          name: leader.name,
          subtitle: leader.title,
          avatar: leader.avatar,
          verified: leader.verified,
          leaderId: leader.id,
          unread: 0,
        },
        ...s.conversations,
      ],
      messages: { ...s.messages, [id]: [] },
    }));
    return id;
  },

  resolveVerification: (id) =>
    set((s) => ({ verificationQueue: s.verificationQueue.filter((v) => v.id !== id) })),

  resolveReport: (id) =>
    set((s) => ({ reports: s.reports.filter((r) => r.id !== id) })),
}));
