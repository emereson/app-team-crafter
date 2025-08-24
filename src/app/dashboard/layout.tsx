"use client";

// app/dashboard/layout.tsx
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

return (
  <div className="dashboard-layout w-full h-dvh flex flex-col overflow-hidden">
    <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
    <div className="flex-1 w-full flex overflow-hidden relative">
      <Menu isOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden min-h-0 min-w-0">
        <div className="flex-1 min-w-0 max-w-full">
          <main className="pb-4">
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  </div>
);

}
