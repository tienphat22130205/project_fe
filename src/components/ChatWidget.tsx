import { useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown, FaCommentDots, FaEllipsisV } from 'react-icons/fa';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timeLabel?: string;
};

function createId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      role: 'assistant',
      text: 'Chào quý khách đã đến với EasyTrip. Chúng tôi có thể trợ giúp điều gì cho bạn không?',
      timeLabel: 'now',
    },
  ]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const hasUnread = unreadCount > 0;

  const headerSubtitle = useMemo(() => 'Tư vấn dịch vụ', []);

  useEffect(() => {
    if (!isOpen) return;
    if (unreadCount > 0) setUnreadCount(0);
  }, [isOpen, unreadCount]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (panelRef.current.contains(e.target as Node)) return;
      // Click outside closes the panel (keeps UX simple)
      setIsOpen(false);
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isOpen]);

  const handleToggle = () => setIsOpen((v) => !v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: createId(),
        role: 'user',
        text: trimmed,
      },
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          ref={panelRef}
          className="mb-3 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl shadow-2xl border border-gray-200"
          role="dialog"
          aria-label="Chat"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center">
                <FaCommentDots className="text-lg" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-semibold leading-5 truncate">Xin chào quý khách</div>
                <div className="text-white/80 text-sm leading-4 truncate">{headerSubtitle}</div>
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
                onClick={() => setIsOpen(false)}
              >
                <FaChevronDown className="text-base" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="bg-gray-900 text-white">
            <div className="h-[420px] overflow-y-auto p-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === 'assistant' ? 'mb-4' : 'mb-4 flex justify-end'}>
                  {m.role === 'assistant' ? (
                    <div>
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                          <FaCommentDots className="text-sm" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="bg-gray-800 rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-6">
                            {m.text}
                          </div>
                          {m.timeLabel && (
                            <div className="text-xs text-white/50 mt-1">{m.timeLabel}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[85%]">
                      <div className="bg-blue-600 rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-6">
                        {m.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-gray-900 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Đặt câu hỏi tại đây"
                  className="flex-1 bg-transparent border border-white/15 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:opacity-95"
                >
                  Gửi
                </button>
              </form>

              <div className="text-center text-xs text-white/40 mt-2">Powered by EasyTrip</div>
            </div>
          </div>
        </div>
      )}

      {/* Floating pill */}
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex items-center gap-3 bg-blue-600 text-white rounded-full px-5 py-3 shadow-xl focus:outline-none"
        aria-label={isOpen ? 'Đóng chat' : 'Mở chat'}
      >
        <span className="font-semibold">Chat</span>
        <span className="h-8 w-8 rounded-full bg-white/15 flex items-center justify-center">
          <FaCommentDots className="text-lg" />
        </span>

        {/* Online dot */}
        <span className="absolute -left-1 bottom-1 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />

        {/* Unread badge */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
