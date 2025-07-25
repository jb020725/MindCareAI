// frontend/src/components/AvatarCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface AvatarCardProps {
  avatar: {
    name: string;
    description: string;
    color: string;
  };
}

const AvatarCard: React.FC<{ avatar: AvatarCardProps["avatar"] }> = ({ avatar }) => (
  <div className={`border-l-4 border-${avatar.color}-400 bg-white shadow-md p-6 rounded`}>
    <h3 className="text-xl font-semibold">{avatar.name}</h3>
    <p className="mt-2 text-gray-600">{avatar.description}</p>
    <Link to="/chat" className="mt-4 inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Start Session
    </Link>
  </div>
);

export default AvatarCard;
