export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timeLabel?: string;
};
