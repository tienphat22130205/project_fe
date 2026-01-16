import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { chatStyles } from './styles';

type Props = {
  subtitle: string;
  onClose: () => void;
};

export default function ChatHeader({ subtitle, onClose }: Props) {
  return (
    <div className={chatStyles.header.root}>
      <div className={chatStyles.header.row}>
        <div className={chatStyles.header.iconWrap}>
          <FaCommentDots className={chatStyles.header.icon} />
        </div>

        <div className={chatStyles.header.textWrap}>
          <div className={chatStyles.header.title}>Tư vấn tour du lịch</div>
          <div className={chatStyles.header.subtitle}>{subtitle}</div>
        </div>
        <button
          type="button"
          className={chatStyles.header.close}
          aria-label="Đóng"
          onClick={onClose}
        >
          <FaTimes className={chatStyles.header.closeIcon} />
        </button>
      </div>
    </div>
  );
}
