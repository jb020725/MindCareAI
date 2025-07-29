// src/api/chat.ts

export async function sendMessage(
  message: string,
  mode: string,
  history: any[],
  session_id: string
) {
  const res = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      mode,
      history,
      session_id,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Gemini sendMessage error:", errorText);
    throw new Error("Failed to get response from Gemini");
  }

  return await res.json();
}

export async function cancelSession(session_id: string) {
  const res = await fetch("http://127.0.0.1:8000/cancel", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Cancel session error:", errorText);
    throw new Error("Failed to cancel session");
  }
}
