// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home sidebar={null} />} />
        <Route path="/dashboard" element={<Dashboard sidebar={null} />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
