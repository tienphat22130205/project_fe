import { useEffect, useMemo, useRef, useState } from 'react';
import ChatLauncherButton from './ChatLauncherButton';
import ChatPanel from './ChatPanel';
import type { ChatMessage } from './types';
import { createChatId } from './utils';

function formatTimeLabel(date = new Date()) {
  try {
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  } catch {
    return 'now';
  }
}

function getBotReply(userText: string) {
  const text = userText.trim().toLowerCase();

  if (!text) return 'Bạn có thể gửi lại câu hỏi cụ thể hơn giúp mình nhé.';

  if (/(xin chào|chào|hello|hi)\b/.test(text)) {
    return 'Chào bạn! Bạn muốn tư vấn tour, dịch vụ hay đặt booking ạ?';
  }

  if (/(tour|du lịch|tours)/.test(text)) {
    return 'Bạn cho mình biết điểm đến + ngày đi dự kiến + số người để mình gợi ý tour phù hợp nhé.';
  }

  if (/(giá|bao nhiêu|chi phí|cost|price)/.test(text)) {
    return 'Bạn đang quan tâm dịch vụ/tour nào ạ? Gửi giúp mình tên tour hoặc link trang để mình tư vấn rõ hơn.';
  }

  if (/(đặt|booking|giữ chỗ|đặt tour|đặt vé)/.test(text)) {
    return 'Ok ạ. Bạn cho mình ngày đi + số người + số điện thoại liên hệ, mình sẽ hỗ trợ đặt chỗ.';
  }

  if (/(thanh toán|payment|chuyển khoản|trả góp)/.test(text)) {
    return 'Về thanh toán: bạn có thể xem mục Payment Info trên website. Nếu cần, bạn cho mình biết bạn muốn thanh toán theo cách nào để mình hướng dẫn.';
  }

  return 'Mình đã nhận được. Bạn mô tả thêm yêu cầu (điểm đến / thời gian / ngân sách) để mình hỗ trợ nhanh nhất nhé.';
}

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
  const isOpenRef = useRef(isOpen);
  const botReplyTimeoutRef = useRef<number | null>(null);

  const hasUnread = unreadCount > 0;
  const headerSubtitle = useMemo(() => 'Tư vấn dịch vụ', []);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (!isOpen) return;
    if (unreadCount > 0) setUnreadCount(0);
  }, [isOpen, unreadCount]);

  useEffect(() => {
    return () => {
      if (botReplyTimeoutRef.current) {
        window.clearTimeout(botReplyTimeoutRef.current);
      }
    };
  }, []);

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

    if (botReplyTimeoutRef.current) {
      window.clearTimeout(botReplyTimeoutRef.current);
      botReplyTimeoutRef.current = null;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: createChatId(),
        role: 'user',
        text: trimmed,
      },
    ]);
    setInput('');

    const delayMs = 450 + Math.floor(Math.random() * 450);
    botReplyTimeoutRef.current = window.setTimeout(() => {
      const replyText = getBotReply(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          id: createChatId(),
          role: 'assistant',
          text: replyText,
          timeLabel: formatTimeLabel(),
        },
      ]);

      if (!isOpenRef.current) {
        setUnreadCount((c) => c + 1);
      }
    }, delayMs);
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
