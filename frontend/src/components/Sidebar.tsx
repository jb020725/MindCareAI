// src/components/Sidebar.tsx
interface SidebarProps {
  selectedMode: string;
  setSelectedMode: (mode: "MindCare" | "Motivator" | "StressRelief") => void;
}

const Sidebar = ({ selectedMode, setSelectedMode }: SidebarProps) => {
  const modes: { id: "MindCare" | "Motivator" | "StressRelief"; label: string }[] = [
    { id: "MindCare", label: "MindCare" },
    { id: "Motivator", label: "Motivator" },
    { id: "StressRelief", label: "Stress Relief" },
  ];

  return (
    <div className="w-48 border-r bg-white p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Modes</h3>
      <ul className="space-y-2">
        {modes.map((mode) => (
          <li key={mode.id}>
            <button
              onClick={() => setSelectedMode(mode.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition font-medium ${
                selectedMode === mode.id
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {mode.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
