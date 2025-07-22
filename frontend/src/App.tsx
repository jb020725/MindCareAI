import { useEffect, useState } from "react";
import { pingBackend } from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    pingBackend().then(setMessage);
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>MindCareAI Frontend</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;


