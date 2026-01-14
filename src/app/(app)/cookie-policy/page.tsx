
'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

// Metadata is now dynamically handled via a generateMetadata function if needed,
// but for a client component, we'd set the title in a useEffect or a parent Server Component.

export default function CookiePolicyPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Set document title on the client
    document.title = 'Cookie Policy | Pichulik Studios';
    // Set the date on the client to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-6 py-24 pt-32 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Cookie Policy
          </h1>
          {lastUpdated && (
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          )}

          <div className="mt-10 space-y-8 text-base leading-7 text-muted-foreground">
            <p>
              This Cookie Policy explains how Pichulik Studios ("we", "us", and "our")
              uses cookies and similar technologies to recognize you when you
              visit our website at{' '}
              <Link href="/" className="text-primary hover:underline">
                pichulikstudios.co.za
              </Link>
              . It explains what these technologies are and why we use them, as
              well as your rights to control our use of them.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                What are cookies?
              </h2>
              <p>
                A cookie is a small data file that is placed on your device when
                you visit a website. Cookies are widely used by website owners
                in order to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Pichulik Studios) are
                called "first-party cookies". Cookies set by parties other than
                the website owner are called "third-party cookies". Third-party
                cookies enable third-party features or functionality to be
                provided on or through the website (e.g., like advertising,
                interactive content, and analytics).
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Why do we use cookies?
              </h2>
              <p>
                We use first-party and third-party cookies for several reasons.
                Some cookies are required for technical reasons in order for our
                Website to operate, and we refer to these as "essential" or
                "strictly necessary" cookies. For example, we use a cookie to
                remember your consent to this policy, so we don't have to show
                you the banner on every page.
              </p>
              <p>
                Other cookies also enable us to track and target the interests of
                our users to enhance the experience on our Online Properties.
                Third parties serve cookies through our Website for advertising,
                analytics, and other purposes.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                How can I control cookies?
              </h2>
              <p>
                You have the right to decide whether to accept or reject
                cookies. You can exercise your cookie rights by setting your
                preferences in the Cookie Consent Manager. The Cookie Consent
                Manager allows you to select which categories of cookies you
                accept or reject. Essential cookies cannot be rejected as they
                are strictly necessary to provide you with services.
              </p>
              <p>
                Most web browsers allow some control of most cookies through the
                browser settings. To find out more about cookies, including how
                to see what cookies have been set, visit{' '}
                <a
                  href="http://www.aboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.aboutcookies.org
                </a>{' '}
                or{' '}
                <a
                  href="http://www.allaboutcookies.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
            </div>

             <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Changes to this policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time in order to
                reflect, for example, changes to the cookies we use or for other
                operational, legal or regulatory reasons. Please therefore
                re-visit this Cookie Policy regularly to stay informed about our
                use of cookies and related technologies.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                How can I get more information?
              </h2>
              <p>
                If you have any questions about our use of cookies or other
                technologies, please email us at info@pichulikstudios.co.za or
                by post to:
              </p>
              <address className="not-italic">
                Pichulik Studios
                <br />
                121 Pretoria Ave
                <br />
                Sandown, Sandton, 2196
                <br />
                South Africa
              </address>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
