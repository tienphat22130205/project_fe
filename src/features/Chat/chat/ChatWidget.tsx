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

type LeadInfo = {
  destination?: string;
  departFrom?: string;
  dateText?: string;
  people?: number;
  budgetText?: string;
  phone?: string;
  isAskingPrice?: boolean;
  isAskingPayment?: boolean;
  isAskingBooking?: boolean;
  isGreeting?: boolean;
  isThanks?: boolean;
};

const KNOWN_DESTINATIONS: Array<{ key: string; patterns: RegExp[] }> = [
  { key: 'Phú Quốc', patterns: [/phú\s*quốc|phu\s*quoc/gi] },
  { key: 'Đà Nẵng', patterns: [/đà\s*nẵng|da\s*nang/gi] },
  { key: 'Nha Trang', patterns: [/nha\s*trang/gi] },
  { key: 'Đà Lạt', patterns: [/đà\s*lạt|da\s*lat/gi] },
  { key: 'Sa Pa', patterns: [/sa\s*pa|sapa/gi] },
  { key: 'Hạ Long', patterns: [/hạ\s*long|ha\s*long/gi] },
  { key: 'Hà Nội', patterns: [/hà\s*nội|ha\s*noi/gi] },
  { key: 'Huế', patterns: [/\bhuế\b|\bhue\b/gi] },
  { key: 'Thái Lan', patterns: [/thái\s*lan|thai\s*lan/gi] },
  { key: 'Singapore', patterns: [/singapore|sing/gi] },
  { key: 'Malaysia', patterns: [/malaysia/gi] },
  { key: 'Bali', patterns: [/\bbali\b/gi] },
  { key: 'Nhật Bản', patterns: [/nhật\s*bản|nhat\s*ban|japan/gi] },
  { key: 'Hàn Quốc', patterns: [/hàn\s*quốc|han\s*quoc|korea/gi] },
  { key: 'Đài Loan', patterns: [/đài\s*loan|dai\s*loan|taiwan/gi] },
];

function pickFirstMatch(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    if (pattern.test(text)) return true;
  }
  return false;
}

function extractLeadInfo(messages: ChatMessage[], userText: string): LeadInfo {
  const conversationText = `${messages
    .map((m) => `${m.role}: ${m.text}`)
    .join('\n')}\nuser: ${userText}`;
  const t = conversationText.toLowerCase();

  const phoneMatch = conversationText.match(/(?:\+?84|0)\d{9,10}/);
  const peopleMatch = t.match(/(\d{1,2})\s*(người|khách|pax)\b/);

  const dateLikeMatch = conversationText.match(
    /(\b\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?\b|\b(tháng)\s*\d{1,2}\b|\b(tết|cuối tuần|cuối\s*tháng|đầu\s*tháng)\b)/i,
  );

  const budgetMatch = t.match(
    /(\d+(?:[\.,]\d+)?)\s*(triệu|tr|trieu)\b|(\d{3,})\s*(k|nghìn|nghin)\b|(\d+(?:[\.,]\d+)?)\s*(m|million)\b/i,
  );

  const destination = KNOWN_DESTINATIONS.find((d) => pickFirstMatch(conversationText, d.patterns))?.key;

  const departFromMatch = conversationText.match(/(?:từ|bay từ|khởi hành từ)\s+([A-Za-zÀ-ỹ\s]{2,25})/i);
  const departFrom = departFromMatch?.[1]?.trim();

  const isGreeting = /(xin chào|chào|hello|hi)\b/i.test(userText);
  const isThanks = /(cảm ơn|thanks|thank you|tks)/i.test(userText);
  const isAskingPrice = /(giá|bao nhiêu|chi phí|cost|price|bảng giá)/i.test(userText);
  const isAskingPayment = /(thanh toán|payment|chuyển khoản|trả góp|cọc|đặt cọc)/i.test(userText);
  const isAskingBooking = /(đặt|booking|giữ chỗ|đặt tour|đặt vé|chốt|đặt luôn)/i.test(userText);

  const people = peopleMatch ? Number(peopleMatch[1]) : undefined;
  const dateText = dateLikeMatch?.[0];
  const budgetText = budgetMatch?.[0];

  return {
    destination,
    departFrom,
    dateText,
    people,
    budgetText,
    phone: phoneMatch?.[0],
    isGreeting,
    isThanks,
    isAskingPrice,
    isAskingPayment,
    isAskingBooking,
  };
}

function buildSalesSuggestion(info: LeadInfo) {
  const where = info.destination ? `đi ${info.destination}` : 'đi đâu';
  const when = info.dateText ? `thời gian: ${info.dateText}` : 'thời gian dự kiến';
  const pax = info.people ? `${info.people} khách` : 'số khách';
  const budget = info.budgetText ? `ngân sách: ${info.budgetText}` : 'ngân sách dự kiến';
  const from = info.departFrom ? `khởi hành từ ${info.departFrom}` : '';

  const leadLine = [where, when, pax, budget, from].filter(Boolean).join(' • ');

  const suggest =
    'Mình gợi ý 3 phương án để bạn chọn nhanh:\n' +
    '1) Tiết kiệm: ưu tiên giá tốt (khách sạn 2–3*, lịch trình gọn).\n' +
    '2) Tiêu chuẩn: cân bằng trải nghiệm/chi phí (3–4*, điểm tham quan nổi bật).\n' +
    '3) Cao cấp: nghỉ dưỡng + dịch vụ tốt (4–5*, thời gian thoải mái).\n' +
    'Bạn thích phương án số mấy để mình chốt lịch trình & báo giá sát nhất?';

  return `${leadLine}\n\n${suggest}`.trim();
}

function getBotReply(messages: ChatMessage[], userText: string) {
  const trimmed = userText.trim();
  if (!trimmed) return 'Bạn gửi lại giúp mình nội dung cần tư vấn nhé.';

  const info = extractLeadInfo(messages, trimmed);

  if (info.isGreeting) {
    return (
      'Chào bạn! Mình là tư vấn EasyTrip.\n' +
      'Để mình báo giá nhanh và đúng nhu cầu, bạn cho mình 3 thông tin: đi đâu, khi nào, mấy người ạ?'
    );
  }

  if (info.isThanks) {
    return 'Dạ vâng ạ. Bạn cho mình điểm đến + ngày đi + số người, mình gợi ý phương án phù hợp và tối ưu chi phí nhé.';
  }

  if (info.isAskingPayment) {
    return (
      'Về thanh toán bên mình hỗ trợ: chuyển khoản/thẻ (tuỳ sản phẩm) và đặt cọc để giữ chỗ.\n' +
      'Bạn đang quan tâm tour nào (điểm đến + ngày đi) để mình hướng dẫn mức cọc và hạn thanh toán ạ?'
    );
  }

  if (info.phone) {
    return (
      `Mình nhận được số ${info.phone} rồi ạ.\n` +
      'Bạn cho mình xin tên + khung giờ tiện nghe máy (sáng/chiều/tối) để bên mình gọi tư vấn và chốt phương án nhanh nhé.'
    );
  }

  const missingDestination = !info.destination;
  const missingDate = !info.dateText;
  const missingPeople = !info.people;

  if (info.isAskingPrice && (missingDestination || missingDate || missingPeople)) {
    return (
      'Để báo giá chính xác, mình cần thêm 3 thông tin:\n' +
      '1) Điểm đến bạn muốn đi\n' +
      '2) Ngày đi (hoặc khoảng thời gian)\n' +
      '3) Số người\n' +
      'Bạn gửi giúp mình nhé.'
    );
  }

  if (info.isAskingBooking && (missingDestination || missingDate || missingPeople)) {
    return (
      'Mình hỗ trợ giữ chỗ/đặt tour được ạ.\n' +
      'Bạn cho mình: điểm đến + ngày đi + số người (và ngân sách nếu có). Sau đó bạn để lại SĐT/Zalo để bên mình xác nhận nhanh.'
    );
  }

  if (!missingDestination && !missingDate && !missingPeople) {
    return buildSalesSuggestion(info);
  }

  if (missingDestination && !missingDate && !missingPeople) {
    return 'Bạn đi từ tỉnh/thành nào và muốn đi đâu (biển/núi/nước ngoài) để mình gợi ý lựa chọn “đáng tiền” nhất nhé?';
  }

  if (!missingDestination && (missingDate || missingPeople)) {
    return (
      `Mình thấy bạn đang quan tâm ${info.destination}.\n` +
      `${missingDate ? 'Bạn dự kiến đi ngày nào (hoặc khoảng thời gian)?\n' : ''}` +
      `${missingPeople ? 'Mình xin thêm số người (người lớn/trẻ em nếu có) để báo giá sát nhất nhé.' : ''}`
    ).trim();
  }

  return (
    'Mình có thể tư vấn theo đúng ngân sách và nhu cầu của bạn.\n' +
    'Bạn cho mình: đi đâu, khi nào, mấy người (và ngân sách dự kiến nếu có) nhé.'
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
  const botStreamIntervalRef = useRef<number | null>(null);
  const botActiveMessageIdRef = useRef<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);

  const hasUnread = unreadCount > 0;
  const headerSubtitle = useMemo(() => 'Tư vấn dịch vụ', []);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (!isOpen) return;
    if (unreadCount > 0) setUnreadCount(0);
  }, [isOpen, unreadCount]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (botReplyTimeoutRef.current) {
        window.clearTimeout(botReplyTimeoutRef.current);
      }

      if (botStreamIntervalRef.current) {
        window.clearInterval(botStreamIntervalRef.current);
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

  const cancelInFlightBotReply = () => {
    if (botReplyTimeoutRef.current) {
      window.clearTimeout(botReplyTimeoutRef.current);
      botReplyTimeoutRef.current = null;
    }
    if (botStreamIntervalRef.current) {
      window.clearInterval(botStreamIntervalRef.current);
      botStreamIntervalRef.current = null;
    }
    if (botActiveMessageIdRef.current) {
      const id = botActiveMessageIdRef.current;
      botActiveMessageIdRef.current = null;
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
    setIsTyping(false);
  };

  const startStreamingAssistantReply = (fullText: string) => {
    const messageId = createChatId();
    botActiveMessageIdRef.current = messageId;

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        role: 'assistant',
        text: '',
        timeLabel: formatTimeLabel(),
      },
    ]);

    let index = 0;
    const tickMs = 18;
    botStreamIntervalRef.current = window.setInterval(() => {
      index += 2;
      const nextText = fullText.slice(0, index);

      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, text: nextText } : m)),
      );

      if (index >= fullText.length) {
        if (botStreamIntervalRef.current) {
          window.clearInterval(botStreamIntervalRef.current);
          botStreamIntervalRef.current = null;
        }
        botActiveMessageIdRef.current = null;
        setIsTyping(false);

        if (!isOpenRef.current) {
          setUnreadCount((c) => c + 1);
        }
      }
    }, tickMs);
  };

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    cancelInFlightBotReply();

    setMessages((prev) => [
      ...prev,
      {
        id: createChatId(),
        role: 'user',
        text: trimmed,
      },
    ]);
    setInput('');

    setIsTyping(true);
    const delayMs = 300 + Math.floor(Math.random() * 500);
    botReplyTimeoutRef.current = window.setTimeout(() => {
      const replyText = getBotReply(messagesRef.current, trimmed);
      startStreamingAssistantReply(replyText);
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
          isTyping={isTyping}
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
