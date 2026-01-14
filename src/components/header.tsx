
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const forBusinessLinks = [
  { href: "/", label: "Home" },
  { href: "/for-business/about", label: "About" },
  { href: "/for-business/our-work", label: "Our Work" },
  { href: "/for-business/quotation", label: "Quotation" },
  { href: "/for-business/contact", label: "Contact" },
];

const forPersonalLinks = [
  { href: "/", label: "Home" },
  { href: "/for-personal/about", label: "About Us" },
  { href: "/for-personal/services", label: "Services & Bookings" },
  { href: "/for-personal/wedding-enquiry", label: "Wedding Enquiry"},
  { href: "/for-personal/contact", label: "Contact Us" },
];


export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const isLandingPage = pathname === '/';
  const isForBusiness = pathname.startsWith("/for-business");
  const isForPersonal = pathname.startsWith("/for-personal");

  let displayedLinks = isForBusiness ? forBusinessLinks : forPersonalLinks;

  if (!isForBusiness && !isForPersonal) {
    displayedLinks = [
      { href: "/", label: "Home" },
      { href: "/for-business/about", label: "For Business" },
      { href: "/for-personal/about", label: "For Personal" }
    ]
  }


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  const hasBackground = isForBusiness || isForPersonal;

  const headerClasses = cn(
    "fixed top-0 left-0 w-full z-30 transition-transform duration-300 ease-in-out",
    hasBackground ? "pt-8 pb-4 bg-gradient-to-b from-black/70 to-transparent text-white" : "py-4 bg-background text-foreground shadow-md",
    isHeaderVisible ? "translate-y-0" : "-translate-y-full"
  );

  if (isLandingPage) {
    return null; // Don't render header on the landing page
  }
  
  const showSwitchButton = isForBusiness || isForPersonal;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-6 relative">
        <div className="hidden md:flex items-center justify-between">
            <Link href="/" className="inline-block">
              <Image 
                src={hasBackground ? "/PS%20Logo.png" : "/PS%20Logo%20Black.png"}
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
                  hasBackground 
                    ? (pathname === href ? "text-white" : "text-white/60 hover:text-white/80")
                    : (pathname === href ? "text-primary" : "text-foreground/60 hover:text-foreground/80")
                )}
              >
                {label}
              </Link>
            ))}
            {showSwitchButton && (
                <Link href={isForBusiness ? "/for-personal/about" : "/for-business/about"}>
                    <Button size="sm" variant={hasBackground ? "outline" : "default"} className={cn(hasBackground && "text-white border-white hover:bg-white hover:text-black")}>
                        {isForBusiness ? "For Personal" : "For Business"}
                    </Button>
                </Link>
            )}
          </nav>
        </div>

        <div className="md:hidden flex items-center justify-between w-full">
            <Link href="/" className="inline-block">
              <Image 
                src={hasBackground ? "/PS%20Logo.png" : "/PS%20Logo%20Black.png"}
                alt="Pichulik Studios Logo" 
                width={180} 
                height={36}
                className="h-auto w-auto"
                priority
              />
            </Link>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("hover:bg-transparent", hasBackground ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/80")}>
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
                {showSwitchButton && (
                    <Link href={isForBusiness ? "/for-personal/about" : "/for-business/about"}>
                        <Button size="lg" className="w-full mt-4">
                            {isForBusiness ? "For Personal" : "For Business"}
                        </Button>
                    </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
