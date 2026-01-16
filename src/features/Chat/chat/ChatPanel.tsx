import type { RefObject } from 'react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import type { ChatMessage } from './types';
import { chatStyles } from './styles';

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
      className={chatStyles.panel.root}
      role="dialog"
      aria-label="Tư vấn tour"
    >
      <ChatHeader subtitle={subtitle} onClose={onClose} />

      <div className={chatStyles.panel.body}>
        <ChatMessages messages={messages} isTyping={isTyping} onQuickReply={onQuickReply} />
        <ChatInput value={input} onChange={onInputChange} onSubmit={onSubmit} disabled={isTyping} />
      </div>
    </div>
  );
}
