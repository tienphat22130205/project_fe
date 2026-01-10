import { useEffect, useRef } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import type { ChatMessage } from './types';

type Props = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
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
                  {m.timeLabel && <div className="text-xs text-white/50 mt-1">{m.timeLabel}</div>}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[85%]">
              <div className="bg-blue-600 rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-6">{m.text}</div>
            </div>
          )}
        </div>
      ))}

      <div ref={endRef} />
    </div>
  );
}
