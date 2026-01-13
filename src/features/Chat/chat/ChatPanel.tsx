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
}: Props) {
  return (
    <div
      ref={panelRef}
      className="mb-3 w-[360px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl shadow-2xl border border-gray-200"
      role="dialog"
      aria-label="Chat"
    >
      <ChatHeader subtitle={subtitle} onClose={onClose} />

      <div className="bg-gray-900 text-white">
        <ChatMessages messages={messages} isTyping={isTyping} />
        <ChatInput value={input} onChange={onInputChange} onSubmit={onSubmit} disabled={isTyping} />
      </div>
    </div>
  );
}
