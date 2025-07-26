import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {sidebar && <div className="w-64 border-r bg-white">{sidebar}</div>}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
