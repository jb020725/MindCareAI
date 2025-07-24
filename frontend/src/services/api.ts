import axios from "axios";

export const sendMessageToBackend = async (message: string): Promise<string> => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/chat", { message });
    return response.data.response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
