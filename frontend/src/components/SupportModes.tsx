// SupportModes.tsx
const supportModes = [
  {
    title: "Emotional Support",
    desc: "Talk openly and feel heard without judgment.",
  },
  {
    title: "Mindfulness Guidance",
    desc: "Get calming breathing or reflection exercises.",
  },
  {
    title: "24/7 Availability",
    desc: "Anytime, anywhere — the assistant is here.",
  },
  {
    title: "Safe & Private",
    desc: "Your data is never stored or used against you.",
  },
];

const SupportModes = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <h3 className="text-3xl font-bold text-center mb-10">How We Support You</h3>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {supportModes.map((mode, idx) => (
          <div
            key={idx}
            className="bg-indigo-100 p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">
              {mode.title}
            </h4>
            <p className="text-gray-700 text-sm">{mode.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportModes;
