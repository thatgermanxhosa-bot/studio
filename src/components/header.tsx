
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const defaultLinks = [
  { href: "/", label: "HOME" },
  { href: "/for-business", label: "FOR BUSINESS" },
  { href: "/for-personal", label: "FOR PERSONAL" },
];

const forBusinessLinks = [
  { href: "/", label: "HOME" },
  { href: "/for-business/about", label: "ABOUT" },
  { href: "/for-business/our-work", label: "OUR WORK" },
  { href: "/for-business/quotation", label: "QUOTATION" },
  { href: "/for-business/contact", label: "CONTACT" },
];

const forPersonalLinks = [
  { href: "/", label: "HOME" },
  { href: "/for-personal/about", label: "ABOUT" },
  { href: "/for-personal/our-work", label: "OUR WORK" },
  { href: "/for-personal/bookings", label: "BOOKINGS" },
  { href: "/for-personal/contact", label: "CONTACT" },
];


export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLandingPage = pathname === '/';
  const isForBusiness = pathname.startsWith("/for-business");

  let displayedLinks = defaultLinks;
  if (isForBusiness) {
    displayedLinks = forBusinessLinks;
  } else if (pathname.startsWith("/for-personal")) {
    displayedLinks = forPersonalLinks;
  }
  
  const headerClasses = cn(
    "fixed top-0 left-0 w-full z-30 transition-colors duration-300 ease-in-out",
    isForBusiness ? "pt-8 pb-4 bg-gradient-to-b from-black/70 to-transparent text-white" : "py-4 bg-background text-foreground shadow-md"
  );

  if (isLandingPage) {
    return null; // Don't render header on the landing page
  }

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 relative">
        <div className="hidden md:flex items-center justify-between">
            <Link href="/" className="inline-block">
              <Image 
                src={isForBusiness ? "/PS%20Logo.png" : "/PS%20Logo%20Black.png"}
                alt="Pichulik Studios Logo" 
                width={225} 
                height={45}
                className="h-auto w-auto"
                priority
              />
            </Link>
          <nav className="flex items-center justify-center space-x-6 text-sm font-bold">
            {displayedLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "transition-colors",
                  isForBusiness 
                    ? (pathname === href ? "text-white" : "text-white/60 hover:text-white/80")
                    : (pathname === href ? "text-primary" : "text-foreground/60 hover:text-foreground/80")
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="inline-block">
              <Image 
                src={isForBusiness ? "/PS%20Logo.png" : "/PS%20Logo%20Black.png"}
                alt="Pichulik Studios Logo" 
                width={180} 
                height={36}
                className="h-auto w-auto"
                priority
              />
            </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("hover:bg-transparent", isForBusiness ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/80")}>
                <Menu className="size-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 pt-10">
                {displayedLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-xl font-bold transition-colors hover:text-foreground/80",
                       pathname === href ? "text-foreground" : "text-foreground/60"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
