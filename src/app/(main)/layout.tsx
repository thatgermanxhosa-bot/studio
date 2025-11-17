
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
  const hasBusinessBackground = isForBusiness && (pathname.includes('/about') || pathname.includes('/quotation') || pathname.includes('/contact') || pathname.includes('/our-work'));
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className={cn("flex-1", !hasBusinessBackground && 'pt-16')}>{children}</main>
      <Footer />
    </div>
  );
}
