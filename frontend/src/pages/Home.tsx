// src/pages/Home.tsx
import { useNavigate } from "react-router-dom";

// ✅ Types for full safety
interface CTA {
  text: string;
  color: string;
}

interface AvatarConfig {
  label: string;
  images: string[];
  folder: string;
  mode: string;
  ctas: CTA[];
}

// ✅ Generic random picker
const getRandomFrom = <T,>(list: T[]): T => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

const Home = () => {
  const navigate = useNavigate();

  const avatars: AvatarConfig[] = [
    {
      label: "Motivator",
      images: ["rise.svg", "power.svg", "action.svg"],
      folder: "motivator",
      mode: "Motivator",
      ctas: [
        { text: "Get Started", color: "text-amber-500" },
        { text: "Push Forward", color: "text-orange-500" },
        { text: "Stay Focused", color: "text-red-400" },
      ],
    },
    {
      label: "MindCare Assistant",
      images: ["calm.svg", "relax.svg", "clarity.svg"],
      folder: "mindcare",
      mode: "MindCare",
      ctas: [
        { text: "Talk Now", color: "text-purple-500" },
        { text: "Share Freely", color: "text-purple-400" },
        { text: "Feel Heard", color: "text-purple-600" },
      ],
    },
    {
      label: "Stress Reliever",
      images: ["unwind.svg", "float.svg", "deepbreath.svg"],
      folder: "stressrelief",
      mode: "StressRelief",
      ctas: [
        { text: "Breathe", color: "text-teal-500" },
        { text: "Unwind", color: "text-cyan-500" },
        { text: "Relax", color: "text-green-500" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-emerald-100 p-6">
      {/* Logo Top-Left */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-purple-600">MindCareAI</h1>
      </div>

      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-gray-700">
          What kind of support are you looking for?
        </h2>
      </div>

      {/* Avatar Cards */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full max-w-7xl mx-auto">
        {avatars.map((avatar) => {
          const imageUrl = `/assets/${avatar.folder}/${getRandomFrom(avatar.images)}`;
          const randomCTA = getRandomFrom<CTA>(avatar.ctas);

          return (
            <div
              key={avatar.label}
              onClick={() => navigate(`/chat?mode=${avatar.mode}`)}
              className={`cursor-pointer bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 text-center px-8 py-10 w-80 max-w-full ${
                avatar.label === "MindCare Assistant" ? "md:scale-105" : ""
              }`}
            >
              <img
                src={imageUrl}
                alt={avatar.label}
                className="w-40 h-40 object-contain mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {avatar.label}
              </h3>
              <div
                className={`group font-medium inline-flex items-center justify-center text-base ${randomCTA.color}`}
              >
                <span>{randomCTA.text}</span>
                <span className="text-gray-400 text-lg opacity-0 group-hover:opacity-100 transition ml-1">
                  →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
