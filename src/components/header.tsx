
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
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
    "sticky top-0 z-50 w-full py-4",
    !isLandingPage && "bg-gradient-to-b from-black/70 to-transparent"
  );

  if (isLandingPage) {
    return null; // Don't render header on the landing page
  }

  return (
    <header className={headerClasses}>
      <div className="container flex h-14 flex-col items-center justify-center">
        <nav className={cn("hidden md:flex items-center justify-center space-x-6 text-sm font-bold w-full")}>
          {displayedLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "transition-colors hover:text-white/80",
                pathname === href ? "text-white" : "text-white/60"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex justify-center mt-4">
          <Link href="/">
            <Image
              src="/PS%20Logo.png"
              alt="Pichulik Studios Logo"
              width={225}
              height={45}
              className="h-auto w-auto"
              priority
            />
          </Link>
        </div>

        <div className="md:hidden absolute left-4 top-1/2 -translate-y-1/2">
            <Link href="/" className="inline-block">
              <Image 
                src="/PS%20Logo.png" 
                alt="Pichulik Studios Logo" 
                width={180} 
                height={36}
                className="h-auto w-auto"
                priority
              />
            </Link>
        </div>
        <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-white/80 hover:bg-transparent">
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
