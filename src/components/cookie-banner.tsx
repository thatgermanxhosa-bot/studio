
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This code runs only on the client
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 w-full p-4',
        'bg-secondary text-secondary-foreground shadow-md',
        'transition-transform duration-500 ease-in-out',
        showBanner ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm">
          We use cookies to enhance your experience. By continuing to visit this
          site you agree to our use of cookies.{' '}
          <Link href="/cookie-policy" className="underline hover:text-primary">
            Learn more
          </Link>
          .
        </p>
        <Button
          onClick={handleAccept}
          className="shrink-0"
          size="sm"
        >
          Accept
        </Button>
      </div>
    </div>
  );
}
