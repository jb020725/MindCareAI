// SuggestedQuestions.tsx
interface Props {
  setInput: (text: string) => void;
}

// These will eventually come from backend/Gemini. Right now use placeholders.
const suggestions = [
  "How can I feel more in control today?",
  "What’s a small thing I can do to ease my mind?",
  "Why do I feel tired even when I rest?",
];

const SuggestedQuestions = ({ setInput }: Props) => {
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm text-gray-600">Suggested prompts:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((q, i) => (
          <button
            key={i}
            onClick={() => setInput(q)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-sm transition"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;
