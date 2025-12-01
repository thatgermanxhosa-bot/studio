
'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ForPersonalWithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isContactPage = pathname.endsWith('/contact');

  let backgroundImage = "";
  if (isContactPage) {
    backgroundImage = "/ps_contact_personal_background.jpg";
  }


  return (
    <div className="relative min-h-screen">
      {backgroundImage ? (
        <>
          <div className="fixed inset-0 z-0">
            <Image
              src={backgroundImage}
              alt="Pichulik Studios Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-20 flex flex-col min-h-screen text-white">
            <main className="flex-1">{children}</main>
          </div>
        </>
      ) : (
        <div className="bg-background text-foreground">
           <main className="flex-1">{children}</main>
        </div>
      )}
    </div>
  );
}
