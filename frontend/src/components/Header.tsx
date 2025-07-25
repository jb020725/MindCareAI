// Header.tsx
const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">MindCareAI</h1>
        <nav>
          <a href="#chat" className="text-gray-700 hover:text-indigo-600">
            Get Support
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
