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
      className="relative h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
      aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
    >
      <span className="absolute inset-0 flex items-center justify-center">
        <FaCommentDots className="text-xl" />
      </span>

      <span className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />

      {hasUnread && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
