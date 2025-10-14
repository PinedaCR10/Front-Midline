export type Role = "user" | "assistant" | "system";

export type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};

export type SendPayload = {
  messages: Array<Pick<ChatMessage, "role" | "content">>;
  topic: "salud_mental";
};

export type ChatResponse = {
  id: string;
  message: ChatMessage;
};
