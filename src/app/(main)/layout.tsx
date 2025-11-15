
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow bg-black text-white">{children}</main>
      <Footer />
    </div>
  );
}
