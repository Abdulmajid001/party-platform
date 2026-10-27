import { MessageSquare } from "lucide-react";

export default function EmptyChat() {
  return (
    <div className="grid flex-1 place-items-center p-8 text-center">
      <div>
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-mist text-leaf">
          <MessageSquare size={24} />
        </span>
        <h2 className="text-lg font-semibold">Pick a conversation</h2>
        <p className="mt-1 max-w-xs text-sm text-muted">
          Choose a chat or group on the left, or message a leader from any announcement.
        </p>
      </div>
    </div>
  );
}
