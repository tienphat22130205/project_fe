import { FaChevronDown, FaCommentDots, FaEllipsisV } from 'react-icons/fa';

type Props = {
  subtitle: string;
  onClose: () => void;
};

export default function ChatHeader({ subtitle, onClose }: Props) {
  return (
    <div className="bg-blue-600 text-white px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center">
          <FaCommentDots className="text-lg" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="font-semibold leading-5 truncate">Xin chào quý khách</div>
          <div className="text-white/80 text-sm leading-4 truncate">{subtitle}</div>
        </div>

        <button
          type="button"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none"
          aria-label="Menu"
        >
          <FaEllipsisV className="text-base" />
        </button>
        <button
          type="button"
          className="p-2 rounded-md hover:bg-white/10 focus:outline-none"
          aria-label="Thu gọn"
          onClick={onClose}
        >
          <FaChevronDown className="text-base" />
        </button>
      </div>
    </div>
  );
}
