import type { RefObject } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import type { ChatMessage } from './types';

type Props = {
  panelRef: RefObject<HTMLDivElement | null>;
  subtitle: string;
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  isTyping?: boolean;
  onQuickReply?: (text: string) => void;
};

export default function ChatPanel({
  panelRef,
  subtitle,
  messages,
  input,
  onInputChange,
  onSubmit,
  onClose,
  isTyping = false,
  onQuickReply,
}: Props) {
  return (
    <div
      ref={panelRef}
      className="mb-3 w-[calc(100vw-1.5rem)] sm:w-[380px] max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] h-[calc(100vh-1.5rem)] sm:h-auto sm:max-h-[80vh] overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white flex flex-col animate-slide-up"
      role="dialog"
      aria-label="Tư vấn tour"
    >
      <ChatHeader subtitle={subtitle} onClose={onClose} />

      <div className="flex flex-col flex-1 min-h-0 bg-gray-50">
        <ChatMessages messages={messages} isTyping={isTyping} onQuickReply={onQuickReply} />
        <ChatInput value={input} onChange={onInputChange} onSubmit={onSubmit} disabled={isTyping} />
      </div>
    </div>
  );
}
