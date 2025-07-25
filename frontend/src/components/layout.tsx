// src/components/Layout.tsx
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
}

const Layout = ({ children, sidebar }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {sidebar && <aside className="hidden md:block w-64 border-r bg-white shadow">{sidebar}</aside>}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
