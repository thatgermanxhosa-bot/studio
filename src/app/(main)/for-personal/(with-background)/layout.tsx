
'use client';

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ForPersonalWithBackgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAboutPage = pathname.endsWith('/about');
  const isContactPage = pathname.endsWith('/contact');
  const isOurWorkPage = pathname.endsWith('/our-work');
  const isBookingsPage = pathname.endsWith('/bookings');
  const isServicesPage = pathname.endsWith('/services');
  const isWeddingEnquiryPage = pathname.endsWith('/wedding-enquiry');

  // Define a default background and then specify overrides
  let backgroundImage = "/ps_personal_background.png"; // A default for the personal section
  if (isAboutPage) {
    backgroundImage = "/ps_about_personal_background.png";
  } else if (isContactPage) {
    backgroundImage = "/ps_contact_personal_background.jpg";
  } else if (isOurWorkPage) {
    backgroundImage = "/ps_our_work_personal_background.png";
  } else if (isBookingsPage) {
    backgroundImage = "/ps_personal_services_background.png";
  } else if (isServicesPage) {
    backgroundImage = "/ps_personal_services_background.png"; // You may want to add a specific background for this
  } else if (isWeddingEnquiryPage) {
    backgroundImage = "/ps_personal_services_background.png"; // Reuse services background
  }


  return (
    <div className="relative min-h-screen">
        <div className="fixed inset-0 z-0">
            <Image
                src={backgroundImage}
                alt="Pichulik Studios Personal Services"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-20 flex flex-col min-h-screen text-white">
             <main className="flex-1">{children}</main>
        </div>
    </div>
  );
}
