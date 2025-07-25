// src/pages/Home.tsx
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout sidebar={<></>}>
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-center px-4">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Your Emotional Companion</h1>
        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          MindCareAI is your gentle guide through emotional fog. Choose a tone that fits you best, and start your check-in anytime.
        </p>
        <div className="flex gap-4">
          <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow">Explore Modes</Link>
          <Link to="/chat" className="text-blue-600 font-medium hover:underline">Go Directly to Chat</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
