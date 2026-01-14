import type { Tour } from './danhSachTour';

export type QuickReply = {
  id: string;
  label: string;
  sendText: string;
};

export type BookingDraft = {
  tourId?: string;
  tourTitle?: string;
  people?: number;
  dateText?: string;
};

export type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timeLabel?: string;

  tours?: Tour[];
  quickReplies?: QuickReply[];
  bookingDraft?: BookingDraft;
};
