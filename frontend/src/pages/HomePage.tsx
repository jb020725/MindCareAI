// src/pages/HomePage.tsx
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-4 py-20">
      <header className="mb-10 w-full max-w-4xl flex justify-between items-center px-2">
        <h1 className="text-3xl font-bold text-blue-700">💙 MindCare AI</h1>
        <Link to="/dashboard" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
          Get Support
        </Link>
      </header>

      <div className="text-center max-w-2xl">
        <h2 className="text-4xl font-bold text-gray-700 mb-4">Your Mental Health Matters</h2>
        <p className="text-gray-600 text-lg mb-8">
          Connect with our AI-powered emotional health companion for personalized support,
          mindfulness guidance, and emotional wellness tools — available 24/7.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/chat"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 shadow"
          >
            Start Your Journey
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-50"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
