// src/components/Navbar.tsx
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-blue-700">💙 MindCareAI</Link>
      <nav className="space-x-4 hidden sm:block">
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
        <Link to="/chat" className="text-gray-600 hover:text-blue-600">Assistant</Link>
        <Link to="/voice" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Voice Mode</Link>
      </nav>
    </header>
  );
};

export default Navbar;
