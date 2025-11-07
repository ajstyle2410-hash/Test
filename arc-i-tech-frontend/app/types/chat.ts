export interface ChatMessage {
  id: string;
  message: string;
  senderRole: string;
  senderName: string;
  sentAt: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  reactions?: Array<{
    emoji: string;
    count: number;
    users: string[];
  }>;
}