import { useEffect, useRef } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { ChatMessage } from './types';
import { formatVnd } from './danhSachTour';

type Props = {
  messages: ChatMessage[];
  isTyping?: boolean;
  onQuickReply?: (text: string) => void;
};

function TypingIndicator() {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
          <FaCommentDots className="text-sm" />
        </div>
        <div className="max-w-[85%]">
          <div className="bg-gray-100 text-gray-900 border-2 border-white shadow-sm rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-6">
            <span className="inline-flex items-center gap-1">
              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '120ms' }}
              />
              <span
                className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: '240ms' }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatMessages({ messages, isTyping = false, onQuickReply }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className="flex-1 min-h-0 overflow-y-auto p-4 bg-gray-50">
      {messages.map((m) => (
        <div key={m.id} className={m.role === 'assistant' ? 'mb-4' : 'mb-4 flex justify-end'}>
          {m.role === 'assistant' ? (
            <div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                  <FaCommentDots className="text-sm" />
                </div>
                <div className="max-w-[85%]">
                  <div className="bg-gray-100 text-gray-900 border-2 border-white shadow-sm rounded-2xl rounded-tl-md px-4 py-3 text-sm leading-6 whitespace-pre-line">
                    {m.text}
                  </div>

                  {m.tours && m.tours.length > 0 && (
                    <div className="mt-3 grid gap-3">
                      {m.tours.map((t) => (
                        <div
                          key={t.id}
                          className="rounded-xl overflow-hidden border border-gray-200 bg-white"
                        >
                          <div className="p-3">
                            <div className="font-semibold text-sm leading-5 line-clamp-2">{t.title}</div>
                            <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
                              <span>{t.destination}</span>
                              <span>{t.durationText}</span>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <div className="text-sm font-semibold text-blue-700">Từ {formatVnd(t.priceFromVnd)}</div>
                              {t.promoText && (
                                <div className="text-[11px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                  {t.promoText}
                                </div>
                              )}
                            </div>
                            <div className="mt-3 flex gap-2">
                              <Link
                                to={`/tours/${t.id}`}
                                className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
                              >
                                Xem chi tiết
                              </Link>
                              <button
                                type="button"
                                onClick={() => onQuickReply?.(`Mình muốn đặt tour ${t.title}`)}
                                className="flex-1 text-xs font-medium px-3 py-2 rounded-lg bg-blue-600 text-white hover:opacity-95"
                              >
                                Đặt tour
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {m.quickReplies && m.quickReplies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {m.quickReplies.map((q) => (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => onQuickReply?.(q.sendText)}
                          className="text-xs px-3 py-2 rounded-full bg-gray-100 text-gray-800 border border-gray-200 hover:bg-blue-50 hover:border-blue-200"
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.timeLabel && <div className="text-xs text-gray-500 mt-1">{m.timeLabel}</div>}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[85%]">
              <div className="bg-blue-600 text-white border-2 border-white shadow-sm rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-6 whitespace-pre-line">{m.text}</div>
            </div>
          )}
        </div>
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={endRef} />
    </div>
  );
}
