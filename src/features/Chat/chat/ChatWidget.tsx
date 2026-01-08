import { useEffect, useMemo, useRef, useState } from 'react';
import ChatLauncherButton from './ChatLauncherButton';
import ChatPanel from './ChatPanel';
import type { ChatMessage } from './types';
import { createChatId } from './utils';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [input, setInput] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createChatId(),
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
      setIsOpen(false);
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [isOpen]);

  const handleToggle = () => setIsOpen((v) => !v);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: createChatId(),
        role: 'user',
        text: trimmed,
      },
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <ChatPanel
          panelRef={panelRef}
          subtitle={headerSubtitle}
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onClose={() => setIsOpen(false)}
        />
      )}

      <ChatLauncherButton
        isOpen={isOpen}
        hasUnread={hasUnread}
        unreadCount={unreadCount}
        onToggle={handleToggle}
      />
    </div>
  );
}
