import { useEffect, useRef } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import type { ChatMessage } from './types';
import { formatVnd } from './danhSachTour';
import { chatStyles } from './styles';

type Props = {
  messages: ChatMessage[];
  isTyping?: boolean;
  onQuickReply?: (text: string) => void;
};

function TypingIndicator() {
  return (
    <div className={chatStyles.messages.typing.wrap}>
      <div className={chatStyles.messages.assistant.wrap}>
        <div className={chatStyles.messages.assistant.avatar}>
          <FaCommentDots className={chatStyles.messages.assistant.avatarIcon} />
        </div>
        <div className={chatStyles.messages.assistant.maxWidth}>
          <div className={chatStyles.messages.assistant.bubble}>
            <span className={chatStyles.messages.typing.dots}>
              <span
                className={chatStyles.messages.typing.dot}
                style={{ animationDelay: '0ms' }}
              />
              <span
                className={chatStyles.messages.typing.dot}
                style={{ animationDelay: '120ms' }}
              />
              <span
                className={chatStyles.messages.typing.dot}
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
    <div className={chatStyles.messages.list}>
      {messages.map((m) => (
        <div
          key={m.id}
          className={m.role === 'assistant' ? chatStyles.messages.row.base : chatStyles.messages.row.user}
        >
          {m.role === 'assistant' ? (
            <div>
              <div className={chatStyles.messages.assistant.wrap}>
                <div className={chatStyles.messages.assistant.avatar}>
                  <FaCommentDots className={chatStyles.messages.assistant.avatarIcon} />
                </div>
                <div className={chatStyles.messages.assistant.maxWidth}>
                  <div className={`${chatStyles.messages.assistant.bubble} ${chatStyles.messages.assistant.bubblePre}`}>
                    {m.text}
                  </div>

                  {m.tours && m.tours.length > 0 && (
                    <div className={chatStyles.messages.tours.grid}>
                      {m.tours.map((t) => (
                        <div
                          key={t.id}
                          className={chatStyles.messages.tours.card}
                        >
                          <div className={chatStyles.messages.tours.body}>
                            <div className={chatStyles.messages.tours.title}>{t.title}</div>
                            <div className={chatStyles.messages.tours.metaRow}>
                              <span>{t.destination}</span>
                              <span>{t.durationText}</span>
                            </div>
                            <div className={chatStyles.messages.tours.priceRow}>
                              <div className={chatStyles.messages.tours.price}>Từ {formatVnd(t.priceFromVnd)}</div>
                              {t.promoText && (
                                <div className={chatStyles.messages.tours.promo}>
                                  {t.promoText}
                                </div>
                              )}
                            </div>
                            <div className={chatStyles.messages.tours.actions}>
                              <Link
                                to={`/tours/${t.id}`}
                                className={chatStyles.messages.tours.link}
                              >
                                Xem chi tiết
                              </Link>
                              <button
                                type="button"
                                onClick={() => onQuickReply?.(`Mình muốn đặt tour ${t.title}`)}
                                className={chatStyles.messages.tours.button}
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
                    <div className={chatStyles.messages.quickReplies.wrap}>
                      {m.quickReplies.map((q) => (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => onQuickReply?.(q.sendText)}
                          className={chatStyles.messages.quickReplies.item}
                        >
                          {q.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {m.timeLabel && <div className={chatStyles.messages.time}>{m.timeLabel}</div>}
                </div>
              </div>
            </div>
          ) : (
            <div className={chatStyles.messages.user.maxWidth}>
              <div className={chatStyles.messages.user.bubble}>{m.text}</div>
            </div>
          )}
        </div>
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={endRef} />
    </div>
  );
}
