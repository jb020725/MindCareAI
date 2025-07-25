// AssistantSelector.tsx
interface Props {
  mode: string;
  setMode: (mode: string) => void;
}

const avatars = ["Listener", "Motivator", "Emotional Helper", "Stress Reliever"];

const AssistantSelector = ({ mode, setMode }: Props) => {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm text-gray-600">Choose Assistant Mode:</p>
      <div className="flex flex-wrap gap-2">
        {avatars.map((avatar) => (
          <button
            key={avatar}
            onClick={() => setMode(avatar)}
            className={`px-3 py-1 rounded-full text-sm border ${
              mode === avatar
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
            }`}
          >
            {avatar}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AssistantSelector;
