// frontend/src/api/chat.ts
import axios from "axios";

export interface Message {
  sender: "user" | "assistant";
  text: string;
}

interface ChatRequest {
  message: string;
  mode: string;
  history: Message[];
}

interface ChatResponse {
  reply: string;
}

const BASE_URL = "http://127.0.0.1:8000";

export const sendMessage = async (
  message: string,
  mode: string,
  history: Message[]
): Promise<string> => {
  try {
    const payload: ChatRequest = { message, mode, history };
    const response = await axios.post<ChatResponse>(`${BASE_URL}/chat`, payload);
    return response.data.reply;
  } catch (error: any) {
    console.error("API Error:", error?.response?.data || error.message);
    throw new Error("Something went wrong while talking to the assistant.");
  }
};
