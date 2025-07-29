// src/components/Layout.tsx
import React, { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactElement<{ onSelectDone?: () => void }>;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Top Bar (Mobile Toggle) */}
      {sidebar && (
        <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm md:hidden">
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
        {sidebar && sidebarOpen && (
          <>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-64 border-r bg-white shadow-inner relative transition-all duration-300">
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-2 right-2 text-sm text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
              {React.cloneElement(sidebar, {
                onSelectDone: () => setSidebarOpen(false),
              })}
            </div>

            {/* Mobile Slide-in Sidebar */}
            <div className="md:hidden fixed inset-0 z-50 flex">
              <div className="w-64 bg-white p-4 shadow-lg">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="mb-4 text-blue-600 font-semibold"
                >
                  ✕ Close
                </button>
                {React.cloneElement(sidebar, {
                  onSelectDone: () => setSidebarOpen(false),
                })}
              </div>
              <div
                className="flex-1 bg-black bg-opacity-30 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* Main Chat Area */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 px-4 ${
            sidebarOpen ? "" : "md:pl-20"
          }`}
        >
          {/* Reopen Sidebar Button — always visible on desktop */}
          {!sidebarOpen && (
            <div className="hidden md:block fixed top-4 left-4 z-30">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-semibold bg-white/80 px-3 py-1 rounded shadow"
              >
                ☰ MindCareAI
              </button>
            </div>
          )}

          <div className="max-w-screen-md mx-auto relative">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
