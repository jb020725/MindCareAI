// src/components/Layout.tsx
import type { ReactNode } from "react";

interface Props {
  sidebar?: ReactNode; // ✅ make it optional
  children: ReactNode;
}

const Layout = ({ sidebar, children }: Props) => {
  return (
    <div className="flex h-screen">
      {sidebar && (
        <aside className="w-60 bg-white border-r shadow-sm">{sidebar}</aside>
      )}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
