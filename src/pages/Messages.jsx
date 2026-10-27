import { Outlet, useMatch } from "react-router-dom";
import ConversationList from "@/components/messages/ConversationList";

export default function Messages() {
  const match = useMatch("/messages/:conversationId");
  const isOpen = Boolean(match);

  return (
    <div className="mx-auto flex h-[calc(100dvh-6.5rem)] max-w-6xl overflow-hidden rounded-2xl border border-rule bg-white md:h-[calc(100dvh-3rem)]">
      <aside
        className={`${isOpen ? "hidden md:flex" : "flex"} w-full shrink-0 flex-col border-r border-rule md:w-80`}
      >
        <ConversationList activeId={match?.params.conversationId} />
      </aside>
      <section className={`${isOpen ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col`}>
        <Outlet key={match?.params.conversationId} />
      </section>
    </div>
  );
}
