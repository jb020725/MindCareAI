import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const modes = [
  {
    id: "Listener",
    title: "Emotional Helper",
    description: "Compassionate support to manage difficult emotions and moments.",
    color: "from-pink-100 to-white",
  },
  {
    id: "Motivator",
    title: "Motivational Talk",
    description: "Encouragement and mental energy to help you move forward.",
    color: "from-orange-100 to-white",
  },
  {
    id: "Mindfulness Coach",
    title: "Mindfulness Coach",
    description: "Guidance in breathing, mindfulness and regaining clarity.",
    color: "from-purple-100 to-white",
  },
  {
    id: "Stress Reliever",
    title: "Stress Relief",
    description: "Talk through the tension and get perspective and balance.",
    color: "from-sky-100 to-white",
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="py-12 px-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome to Your Safe Space</h1>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Choose the kind of guidance you need. Our AI assistant adapts to support you calmly and clearly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`bg-gradient-to-br ${mode.color} p-6 rounded-2xl shadow hover:shadow-lg transition`}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{mode.title}</h3>
              <p className="text-gray-600">{mode.description}</p>
              <div className="mt-6 text-right">
                <Link
                  to={`/chat?mode=${encodeURIComponent(mode.id)}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Start Session
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
