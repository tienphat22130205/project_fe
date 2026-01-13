import { FaCommentDots } from 'react-icons/fa';

type Props = {
  isOpen: boolean;
  hasUnread: boolean;
  unreadCount: number;
  onToggle: () => void;
};

export default function ChatLauncherButton({ isOpen, hasUnread, unreadCount, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative flex items-center gap-3 bg-blue-600 text-white rounded-full px-5 py-3 shadow-xl focus:outline-none hover:opacity-95"
      aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
    >
      <span className="font-semibold">Chat</span>
      <span className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
        <FaCommentDots className="text-lg" />
      </span>

      <span className="absolute -left-1 bottom-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />

      {hasUnread && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
