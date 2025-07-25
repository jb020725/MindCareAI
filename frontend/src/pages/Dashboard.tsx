// frontend/src/pages/Dashboard.tsx
import React from "react";
import { Link } from "react-router-dom";
import AvatarCard from "../components/AvatarCard";

const Dashboard = () => {
  const avatars = [
    {
      name: "Emotional Helper",
      description: "Get compassionate support for managing difficult emotions.",
      color: "pink",
    },
    {
      name: "Motivator",
      description: "Receive encouragement to overcome challenges.",
      color: "orange",
    },
    {
      name: "Mindfulness Coach",
      description: "Learn meditation and reflection techniques for inner peace.",
      color: "purple",
    },
    {
      name: "Stress Reliever",
      description: "Find ways to manage and reduce stress levels.",
      color: "sky",
    },
  ];

  return (
    <div className="px-4 py-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Welcome to Your Safe Space</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {avatars.map((avatar) => (
          <AvatarCard key={avatar.name} avatar={avatar} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
