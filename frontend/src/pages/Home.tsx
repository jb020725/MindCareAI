// frontend/src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center py-20 px-4 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-4">Your Mental Health Matters</h2>
      <p className="text-lg mb-6">
        Connect with our AI-powered mental health companion for personalized support, mindfulness guidance, and emotional wellness tools available 24/7.
      </p>
      <div className="space-x-4">
        <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Start Your Journey</Link>
        <a href="#support" className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">Learn More</a>
      </div>
    </div>
  );
};

export default Home;
