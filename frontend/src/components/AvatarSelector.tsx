import React from "react";

interface AvatarSelectorProps {
  selected: string;
  onSelect: (mode: string) => void;
}

const modes = [
  { label: "MindCare Assistant", value: "MindCare" },
  { label: "Motivator", value: "Motivator" },
  { label: "Stress Reliever", value: "StressReliever" },
];

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-lg font-bold">Choose Mode</h2>
      <div className="flex flex-col gap-2">
        {modes.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onSelect(mode.value)}
            className={`px-4 py-2 rounded-md border shadow transition ${
              selected === mode.value ? "bg-blue-500 text-white" : "bg-white hover:bg-blue-100"
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
