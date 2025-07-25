// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home sidebar={null} />} />
        <Route path="/dashboard" element={<Dashboard sidebar={null} />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
