// src/components/Sidebar.tsx
import React from "react";

interface SidebarProps {
  selected: string;
  onSelect: (mode: string) => void;
}

const modes = ["MindCare Assistant", "Motivator", "Stress Reliever"];

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect }) => {
  return (
    <aside className="w-56 bg-white border-r p-4 flex flex-col shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Choose Mode</h2>
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onSelect(mode)}
          className={`px-4 py-2 mb-2 rounded-md text-left transition-all duration-200
            ${
              selected === mode
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
        >
          {mode}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
