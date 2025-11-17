
'use client';

import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isForBusiness = pathname.startsWith('/for-business');
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className={cn("flex-1", !isForBusiness && 'pt-16')}>{children}</main>
      <Footer />
    </div>
  );
}
