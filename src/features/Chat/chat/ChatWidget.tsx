import { useEffect, useMemo, useRef, useState } from 'react';
import ChatLauncherButton from './ChatLauncherButton';
import ChatPanel from './ChatPanel';
import type { ChatMessage, QuickReply } from './types';
import { createChatId } from './utils';
import { mockTours, formatVnd, type Tour } from './danhSachTour';

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
  maxPriceVnd?: number;
  minPriceVnd?: number;
  preferredRegion?: 'trong_nuoc' | 'ngoai_nuoc';
  durationDays?: number;
  isAskingTourList?: boolean;
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
    /(\b\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?\b|\b(tháng)\s*\d{1,2}\b|\b(tết|cuối\s*tuần|cuối\s*tháng|đầu\s*tháng)\b)/i,
  );

  const budgetMatch = t.match(
    /(\d+(?:[.,]\d+)?)\s*(triệu|tr|trieu)\b|(\d{3,})\s*(k|nghìn|nghin)\b|(\d+(?:[.,]\d+)?)\s*(m|million)\b/i,
  );

  const preferDomestic = /(trong\s*nước|nội\s*địa|việt\s*nam)/i.test(userText);
  const preferInternational = /(quốc\s*tế|nước\s*ngoài|overseas)/i.test(userText);
  const preferredRegion = preferDomestic ? 'trong_nuoc' : preferInternational ? 'ngoai_nuoc' : undefined;

  const durationMatch =
    userText.match(/(\d{1,2})\s*(ngày|n)\s*(?:\s*(\d{1,2})\s*(đêm|d))?/i) ||
    userText.match(/\b(\d{1,2})n(\d{1,2})d\b/i);
  const durationDays = durationMatch
    ? Number(durationMatch[1] || durationMatch[0]?.match(/\d+/)?.[0])
    : undefined;

  const underMatch = userText.match(/(dưới|<=|≤)\s*(\d+(?:[.,]\d+)?)\s*(triệu|tr|trieu)/i);
  const overMatch = userText.match(/(trên|>=|≥)\s*(\d+(?:[.,]\d+)?)\s*(triệu|tr|trieu)/i);
  const rangeMatch = userText.match(/(\d+(?:[.,]\d+)?)\s*(?:-|đến)\s*(\d+(?:[.,]\d+)?)\s*(triệu|tr|trieu)/i);

  const toVnd = (x: string) => Math.round(Number(x.replace(',', '.')) * 1_000_000);
  const maxPriceVnd = underMatch ? toVnd(underMatch[2]) : rangeMatch ? toVnd(rangeMatch[2]) : undefined;
  const minPriceVnd = overMatch ? toVnd(overMatch[2]) : rangeMatch ? toVnd(rangeMatch[1]) : undefined;

  const isAskingTourList = /(tour|gợi ý|recommend|đề xuất|danh sách|list).*(tour)?/i.test(userText);

  const destination = KNOWN_DESTINATIONS.find((d) => pickFirstMatch(conversationText, d.patterns))?.key;

  const departFromMatch = conversationText.match(/(?:từ|bay từ|khởi hành từ)\s+([\p{L}\s]{2,40})/iu);
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
    preferredRegion,
    durationDays,
    minPriceVnd,
    maxPriceVnd,
    isAskingTourList,
  };
}

function makeQuickReplies(items: Array<{ label: string; sendText: string }>): QuickReply[] {
  return items.map((i) => ({ id: createChatId(), ...i }));
}

function filterTours(info: LeadInfo, fallbackText?: string): Tour[] {
  const text = (fallbackText || '').toLowerCase();

  const destination = info.destination;
  const region = info.preferredRegion;

  const maxPrice = info.maxPriceVnd;
  const minPrice = info.minPriceVnd;

  const durationDays = info.durationDays;

  let list = [...mockTours];
  if (region) list = list.filter((t) => t.region === region);
  if (destination) list = list.filter((t) => t.destination === destination);
  if (typeof maxPrice === 'number') list = list.filter((t) => t.priceFromVnd <= maxPrice);
  if (typeof minPrice === 'number') list = list.filter((t) => t.priceFromVnd >= minPrice);
  if (typeof durationDays === 'number' && Number.isFinite(durationDays)) {
    list = list.filter((t) => t.days === durationDays);
  }

  if (!destination && !region) {
    if (/biển|nghỉ\s*dưỡng|resort/i.test(text)) {
      list = list.filter((t) => /(phú quốc|đà nẵng|thái lan)/i.test(t.title));
    }
    if (/núi|mát|săn\s*mây|trek/i.test(text)) {
      list = list.filter((t) => /(sa pa)/i.test(t.title));
    }
  }

  return list.sort((a, b) => a.priceFromVnd - b.priceFromVnd).slice(0, 3);
}

function buildSalesSuggestion(info: LeadInfo) {
  const where = info.destination ? `Đi ${info.destination}` : 'Đi đâu';
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

function getBotReply(messages: ChatMessage[], userText: string): ChatMessage {
  const trimmed = userText.trim();
  if (!trimmed)
    return {
      id: createChatId(),
      role: 'assistant',
      text: 'Bạn gửi lại giúp mình nội dung cần tư vấn nhé.',
      timeLabel: formatTimeLabel(),
    };

  const info = extractLeadInfo(messages, trimmed);

  if (info.isGreeting) {
    return {
      id: createChatId(),
      role: 'assistant',
      text:
        'Chào bạn! Mình là tư vấn tour của EasyTrip.\n' +
        'Bạn muốn đi trong nước hay quốc tế? Mình có thể gợi ý tour theo điểm đến, ngân sách và thời gian.',
      timeLabel: formatTimeLabel(),
      quickReplies: makeQuickReplies([
        { label: 'Gợi ý tour trong nước', sendText: 'Gợi ý tour trong nước' },
        { label: 'Gợi ý tour quốc tế', sendText: 'Gợi ý tour quốc tế' },
        { label: 'Tour biển giá tốt', sendText: 'Gợi ý tour biển dưới 6 triệu' },
        { label: 'Tour 3 ngày 2 đêm', sendText: 'Gợi ý tour 3N2Đ' },
      ]),
    };
  }

  if (info.isThanks) {
    return {
      id: createChatId(),
      role: 'assistant',
      text:
        'Dạ vâng ạ. Bạn cho mình điểm đến + ngày đi + số người (và ngân sách nếu có), mình gợi ý tour phù hợp và tối ưu chi phí nhé.',
      timeLabel: formatTimeLabel(),
    };
  }

  if (info.isAskingPayment) {
    return {
      id: createChatId(),
      role: 'assistant',
      text:
        'Về thanh toán: hiện hệ thống chỉ mô phỏng trên giao diện, không thu/không lưu thông tin.\n' +
        'Thông thường bạn có thể đặt cọc để giữ chỗ, phần còn lại thanh toán trước ngày khởi hành (tuỳ tour).\n' +
        'Bạn đang quan tâm tour nào (điểm đến + ngày đi) để mình hướng dẫn chi tiết ạ?',
      timeLabel: formatTimeLabel(),
    };
  }

  if (info.phone) {
    return {
      id: createChatId(),
      role: 'assistant',
      text:
        `Mình nhận được số ${info.phone} rồi ạ.\n` +
        'Lưu ý: hệ thống không lưu dữ liệu. Nếu bạn muốn, hãy để lại tên + khung giờ tiện nghe máy để mình mô phỏng bước “xác nhận” nhé.',
      timeLabel: formatTimeLabel(),
    };
  }

  if (info.isAskingTourList || info.preferredRegion || info.destination || info.maxPriceVnd || info.minPriceVnd || info.durationDays) {
    const tours = filterTours(info, trimmed);
    if (tours.length === 0) {
      return {
        id: createChatId(),
        role: 'assistant',
        text:
          'Mình chưa tìm được tour phù hợp đúng tiêu chí này.\n' +
          'Bạn muốn ưu tiên điểm đến nào (VD: Đà Nẵng/Phú Quốc/Sa Pa/Thái Lan/Nhật Bản) và ngân sách tầm bao nhiêu ạ?',
        timeLabel: formatTimeLabel(),
      };
    }

    const filterLine = [
      info.preferredRegion === 'trong_nuoc' ? 'Trong nước' : info.preferredRegion === 'ngoai_nuoc' ? 'Quốc tế' : null,
      info.destination ? `Điểm đến: ${info.destination}` : null,
      info.durationDays ? `Thời gian: ${info.durationDays} ngày` : null,
      info.maxPriceVnd ? `Giá ≤ ${formatVnd(info.maxPriceVnd)}` : null,
      info.minPriceVnd ? `Giá ≥ ${formatVnd(info.minPriceVnd)}` : null,
    ]
      .filter(Boolean)
      .join(' • ');

    return {
      id: createChatId(),
      role: 'assistant',
      text:
        `Mình gợi ý ${tours.length} tour “đáng tiền” để bạn chọn nhanh${filterLine ? `\n(${filterLine})` : ''}:`,
      timeLabel: formatTimeLabel(),
      tours,
      quickReplies: makeQuickReplies([
        { label: 'Lọc dưới 6 triệu', sendText: 'Gợi ý tour dưới 6 triệu' },
        { label: 'Tour 4N3Đ', sendText: 'Gợi ý tour 4N3Đ' },
        { label: 'Tour Đà Nẵng', sendText: 'Gợi ý tour Đà Nẵng' },
        { label: 'Tour Phú Quốc', sendText: 'Gợi ý tour Phú Quốc' },
      ]),
    };
  }

  const missingDestination = !info.destination;
  const missingDate = !info.dateText;
  const missingPeople = !info.people;

  if (info.isAskingPrice && (missingDestination || missingDate || missingPeople)) {
    return {
      id: createChatId(),
      role: 'assistant',
      text:
        'Để báo giá chính xác, mình cần 3 thông tin:\n' +
        '1) Điểm đến bạn muốn đi\n' +
        '2) Ngày đi (hoặc khoảng thời gian)\n' +
        '3) Số người\n' +
        'Bạn gửi giúp mình nhé.',
      timeLabel: formatTimeLabel(),
      quickReplies: makeQuickReplies([
        { label: 'Đà Nẵng 3N2Đ', sendText: 'Gợi ý tour Đà Nẵng 3N2Đ' },
        { label: 'Phú Quốc 4N3Đ', sendText: 'Gợi ý tour Phú Quốc 4N3Đ' },
        { label: 'Thái Lan 5N4Đ', sendText: 'Gợi ý tour Thái Lan 5N4Đ' },
      ]),
    };
  }

  if (info.isAskingBooking && (missingDestination || missingDate || missingPeople)) {
    return {
      id: createChatId(),
      role: 'assistant',
      text:
        'Mình hỗ trợ “đặt tour” theo dạng mô phỏng (frontend-only, không lưu dữ liệu).\n' +
        'Bạn cho mình: tour muốn đặt + ngày đi + số người. Ví dụ: “Đặt tour Đà Nẵng 3N2Đ, đi 20/2, 2 người”.',
      timeLabel: formatTimeLabel(),
    };
  }

  if (!missingDestination && !missingDate && !missingPeople) {
    return {
      id: createChatId(),
      role: 'assistant',
      text: buildSalesSuggestion(info),
      timeLabel: formatTimeLabel(),
    };
  }

  if (missingDestination && !missingDate && !missingPeople) {
    return {
      id: createChatId(),
      role: 'assistant',
      text: 'Bạn đi từ tỉnh/thành nào và muốn đi đâu (biển/núi/nước ngoài) để mình gợi ý lựa chọn “đáng tiền” nhất nhé?',
      timeLabel: formatTimeLabel(),
      quickReplies: makeQuickReplies([
        { label: 'Mình thích tour biển', sendText: 'Mình muốn tour biển' },
        { label: 'Mình thích tour núi', sendText: 'Mình muốn tour núi' },
        { label: 'Mình muốn đi quốc tế', sendText: 'Gợi ý tour quốc tế' },
      ]),
    };
  }

  if (!missingDestination && (missingDate || missingPeople)) {
    return {
      id: createChatId(),
      role: 'assistant',
      text: (
        `Mình thấy bạn đang quan tâm ${info.destination}.\n` +
        `${missingDate ? 'Bạn dự kiến đi ngày nào (hoặc khoảng thời gian)?\n' : ''}` +
        `${missingPeople ? 'Mình xin thêm số người (người lớn/trẻ em nếu có) để báo giá sát nhất nhé.' : ''}`
      ).trim(),
      timeLabel: formatTimeLabel(),
    };
  }

  return {
    id: createChatId(),
    role: 'assistant',
    text:
      'Mình có thể tư vấn tour trong nước/quốc tế theo đúng ngân sách và thời gian của bạn.\n' +
      'Bạn cho mình: đi đâu, đi khi nào, mấy người (và ngân sách dự kiến nếu có) nhé.',
    timeLabel: formatTimeLabel(),
    quickReplies: makeQuickReplies([
      { label: 'Gợi ý tour trong nước', sendText: 'Gợi ý tour trong nước' },
      { label: 'Gợi ý tour quốc tế', sendText: 'Gợi ý tour quốc tế' },
      { label: 'Gợi ý tour dưới 6 triệu', sendText: 'Gợi ý tour dưới 6 triệu' },
    ]),
  };
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
      text:
        'Chào bạn! Mình là tư vấn tour.\n' +
        'Bạn muốn đi trong nước hay quốc tế? Mình gợi ý tour theo điểm đến, giá và thời gian nhé.',
      timeLabel: 'now',
      quickReplies: makeQuickReplies([
        { label: 'Tour trong nước', sendText: 'Gợi ý tour trong nước' },
        { label: 'Tour quốc tế', sendText: 'Gợi ý tour quốc tế' },
        { label: 'Tour 3N2Đ', sendText: 'Gợi ý tour 3N2Đ' },
        { label: 'Dưới 6 triệu', sendText: 'Gợi ý tour dưới 6 triệu' },
      ]),
    },
  ]);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const isOpenRef = useRef(isOpen);
  const botReplyTimeoutRef = useRef<number | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);

  const hasUnread = unreadCount > 0;
  const headerSubtitle = useMemo(() => 'Hỗ trợ nhanh 24/7', []);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen, unreadCount]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    return () => {
      if (botReplyTimeoutRef.current) {
        window.clearTimeout(botReplyTimeoutRef.current);
        botReplyTimeoutRef.current = null;
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

  const handleToggle = () => {
    setIsOpen((v) => {
      const next = !v;
      if (next) setUnreadCount(0);
      return next;
    });
  };

  const submitText = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) return;
    if (isTyping) return;

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
    setIsTyping(true);

    const delayMs = 300 + Math.floor(Math.random() * 500);
    botReplyTimeoutRef.current = window.setTimeout(() => {
      botReplyTimeoutRef.current = null;
      const reply = getBotReply(messagesRef.current, trimmed);
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);

      if (!isOpenRef.current) {
        setUnreadCount((c) => c + 1);
      }
    }, delayMs);
  };

  const handleSubmit = () => {
    submitText(input);
  };

  const handleQuickReply = (text: string) => {
    if (!text.trim()) return;
    if (!isOpen) {
      setUnreadCount(0);
      setIsOpen(true);
    }
    submitText(text);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
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
          onQuickReply={handleQuickReply}
        />
      )}

      {!isOpen && (
        <ChatLauncherButton
          isOpen={isOpen}
          hasUnread={hasUnread}
          unreadCount={unreadCount}
          onToggle={handleToggle}
        />
      )}
    </div>
  );
}
