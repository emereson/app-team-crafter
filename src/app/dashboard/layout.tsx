// app/dashboard/layout.tsx
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className=" h-full w-full flex overflow-hidden">
        <Menu />
        <div className="flex flex-col w-full h-full overflow-y-auto ">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
