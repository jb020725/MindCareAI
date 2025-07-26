
// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white text-center px-6">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to MindCareAI</h1>
        <p className="text-gray-600 text-lg max-w-xl mb-8">
          Your gentle AI companion for emotional check-ins. Choose a helpful tone — whether you need motivation, calm, or clarity — and let’s chat it out.
        </p>
        <button
          onClick={() => navigate("/chat")}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 shadow-lg text-lg transition"
        >
          Let’s Chat It Out
        </button>
      </div>
    </Layout>
  );
};

export default Home;
