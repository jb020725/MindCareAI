// Hero.tsx
const Hero = () => {
  return (
    <section className="bg-indigo-50 py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-indigo-700 mb-4">
        Your Mental Health Matters
      </h2>
      <p className="text-lg text-gray-700 mb-8">
        We're here to support your emotional well-being — every day, every mood.
      </p>
      <a
        href="#chat"
        className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition"
      >
        Start Your Journey
      </a>
    </section>
  );
};

export default Hero;
