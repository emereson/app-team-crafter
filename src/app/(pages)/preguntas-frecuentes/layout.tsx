import Footer from "@/app/dashboard/components/Footer";

export default function PreguntasFrecuentesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
