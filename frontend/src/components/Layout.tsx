import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Mobile Toggle */}
      {sidebar && (
        <div className="md:hidden flex justify-between items-center p-4 border-b bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-600 font-semibold"
          >
            ☰ Menu
          </button>
          <span className="text-gray-700 font-medium">MindCareAI</span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Desktop */}
            <div className="hidden md:block w-64 border-r bg-white shadow-inner">
              {sidebar}
            </div>

            {/* Mobile Slide-in */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex">
                <div className="w-64 bg-white p-4 shadow-lg">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="mb-4 text-blue-600 font-semibold"
                  >
                    ✕ Close
                  </button>
                  {sidebar}
                </div>
                <div
                  className="flex-1 bg-black bg-opacity-30 backdrop-blur-sm"
                  onClick={() => setSidebarOpen(false)}
                />
              </div>
            )}
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
