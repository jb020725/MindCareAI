import React from "react";

interface AvatarSelectorProps {
  selected: string;
  onSelect: (mode: string) => void;
}

const modes = [
  { label: "MindCare Assistant", value: "MindCare", emoji: "🧠" },
  { label: "Motivator", value: "Motivator", emoji: "⚡" },
  { label: "Stress Reliever", value: "StressReliever", emoji: "🌿" },
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold text-gray-800">Choose Your Assistant</h2>
      <div className="flex flex-col gap-3">
        {modes.map((mode) => {
          const isSelected = selected === mode.value;
          return (
            <button
              key={mode.value}
              onClick={() => onSelect(mode.value)}
              aria-pressed={isSelected}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-left transition-all duration-200 shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isSelected
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-[1.02]"
                  : "bg-white hover:bg-blue-50 text-gray-800"
              }`}
            >
              <span className="text-xl">{mode.emoji}</span>
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarSelector;
