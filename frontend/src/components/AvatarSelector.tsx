// src/components/AvatarSelector.tsx
import { Heart, Smile, Waves, Brain } from "lucide-react";

const avatars = [
  { id: "Listener", label: "Emotional Helper", icon: <Heart className="text-pink-500" /> },
  { id: "Motivator", label: "Motivational Talk", icon: <Smile className="text-orange-400" /> },
  { id: "Mindfulness Coach", label: "Mindfulness Coach", icon: <Brain className="text-purple-500" /> },
  { id: "Stress Reliever", label: "Stress Relief", icon: <Waves className="text-blue-400" /> },
];

const AvatarSelector = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-blue-700">Choose Your Mode</h2>
      <div className="space-y-3">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="flex items-center gap-3 p-2 rounded-lg text-gray-700 bg-blue-50 hover:bg-blue-100 cursor-pointer">
            {avatar.icon}
            <span className="font-medium">{avatar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
