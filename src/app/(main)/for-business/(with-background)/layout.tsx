
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

  if (isAboutPage) {
    return <>{children}</>;
  }

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
            {children}
        </div>
    </div>
  );
}
