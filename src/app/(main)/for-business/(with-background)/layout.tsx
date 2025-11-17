
'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ForBusinessWithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAboutPage = pathname.endsWith('/about');

  let backgroundImage = "/ps_quotation_background.png";
  if (isAboutPage) {
    backgroundImage = "/ps_about_background.png";
  }

  return (
    <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0">
            <Image
                src={backgroundImage}
                alt="Pichulik Studios Banner"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/75"></div>
        </div>
        <div className="relative z-20 flex flex-col min-h-screen text-white">
             <main className="flex-1 pt-32">{children}</main>
        </div>
    </div>
  );
}
