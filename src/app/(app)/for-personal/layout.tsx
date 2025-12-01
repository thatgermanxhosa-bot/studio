
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
  const isAboutPage = pathname.endsWith('/about');
  const isWeddingEnquiryPage = pathname.endsWith('/wedding-enquiry');
  const isServicesPage = pathname.endsWith('/services');

  let backgroundImage = "";
  if (isContactPage) {
    backgroundImage = "/ps_our_work_background.png";
  } else if (isAboutPage) {
    backgroundImage = "/personal_contact_bg.jpg";
  } else if (isServicesPage) {
    backgroundImage = "/Bookings_IMG.jpg";
  }


  return (
    <div className="relative min-h-screen">
      {isWeddingEnquiryPage ? (
        <div className="fixed inset-0 z-0">
            <video
                src="/wedding_enquiry_background.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
            >
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ) : backgroundImage ? (
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
      ) : null}

      <div className={cn(
        "relative z-20 flex flex-col min-h-screen",
        (backgroundImage || isWeddingEnquiryPage) ? "text-white" : "bg-background text-foreground"
      )}>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
