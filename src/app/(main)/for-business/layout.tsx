
'use client';

import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ForBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0">
            <Image
                src="/ps_quotation_background.png"
                alt="Pichulik Studios Banner"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className="relative z-20 flex flex-col min-h-screen text-white">
            <Header />
            <main className="flex-1 pt-40">{children}</main>
            <Footer />
        </div>
    </div>
  );
}
