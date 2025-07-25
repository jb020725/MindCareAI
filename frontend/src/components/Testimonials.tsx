// Testimonials.tsx
const testimonials = [
  {
    name: "Alex",
    feedback: "I felt overwhelmed, but MindCareAI helped me sort my thoughts. Love it.",
  },
  {
    name: "Soojin",
    feedback: "The Motivator avatar gave me the confidence boost I needed before my exam.",
  },
  {
    name: "Ravi",
    feedback: "It doesn't try to fix you, it helps you understand yourself. That matters.",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-indigo-50 py-16 px-6">
      <h3 className="text-3xl font-bold text-center mb-10">What Our Users Say</h3>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow text-left border border-indigo-100"
          >
            <p className="text-gray-800 italic mb-3">"{item.feedback}"</p>
            <p className="font-bold text-indigo-600">– {item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
