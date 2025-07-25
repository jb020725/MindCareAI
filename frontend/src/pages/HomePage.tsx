// HomePage.tsx
import Header from "../components/Header";
import Hero from "../components/Hero";
import SupportModes from "../components/SupportModes";
import Testimonials from "../components/Testimonials";
import ChatWindow from "../components/ChatWindow";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <SupportModes />
        <Testimonials />
        <ChatWindow />
      </main>
    </div>
  );
};

export default HomePage;
