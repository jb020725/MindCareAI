// frontend/src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-blue-700">MindCareAI</h1>
    <div>
      <Link to="/" className="text-blue-600 hover:underline mx-3">Home</Link>
      <Link to="/dashboard" className="text-blue-600 hover:underline mx-3">Dashboard</Link>
    </div>
  </nav>
);

export default Navbar;
