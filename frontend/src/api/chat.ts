// frontend/src/api/chat.ts

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

export async function sendMessage(
  message: string,
  history: ChatMessage[],
  mode: string
): Promise<string> {
  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        mode,
        history,
      }),
    });

    const data = await res.json();
    return data.reply;
  } catch (error) {
    console.error("API call failed:", error);
    return "Sorry, something went wrong.";
  }
}
