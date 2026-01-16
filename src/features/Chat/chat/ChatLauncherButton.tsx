import { FaCommentDots } from 'react-icons/fa';
import { chatStyles } from './styles';

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
      className={chatStyles.launcher.button}
      aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
    >
      <span className={chatStyles.launcher.iconWrap}>
        <FaCommentDots className="text-xl" />
      </span>

      <span className={chatStyles.launcher.onlineDot} />

      {hasUnread && (
        <span className={chatStyles.launcher.unreadBadge}>
          {unreadCount}
        </span>
      )}
    </button>
  );
}
