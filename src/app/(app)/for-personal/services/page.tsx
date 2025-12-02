
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'Services & Bookings | For Personal | Pichulik Studios',
  description: 'Find the perfect package to capture your story. We offer a range of photography and videography services tailored to your personal milestones.',
};

const lifestylePackages = [
  {
    title: "Mini Session",
    price: "R 2 200",
    duration: "30 min",
    details: ["Perfect for quick headshots (LinkedIn/CVs)", "5 edited images", "Sandton studio or immediate area only"],
    badge: "Headshots"
  },
  {
    title: "Standard Influencer",
    price: "R 4 200",
    duration: "1 hr",
    details: ["Ideal for social media content", "20 edited images + B&W copies", "1 location"],
    badge: "Content"
  },
    {
    title: "Content Creator",
    price: "R 5 500",
    duration: "90 min",
    details: ["A batch of content for your feed", "30 edited images", "Up to 2 looks/themes", "Includes short-form video clips"],
    badge: "Creator"
  },
  {
    title: "Premium Brand",
    price: "R 6 800",
    duration: "2 hrs",
    details: ["For websites & 3 months of content", "40+ edited images", "Up to 2 locations"],
    badge: "Branding"
  }
];

const familyPackages = [
    {
        title: "Quick & Easy",
        price: "R 2 500",
        duration: "30 min",
        details: ["Great for short attention spans", "10 edited photos", "Immediate family only"],
    },
    {
        title: "Golden Hour",
        price: "R 5 200",
        duration: "60-90 min",
        details: ["Outdoor sunset or cozy in-home session", "35+ edited images", "Includes styling guide"],
    },
    {
        title: "The Newborn",
        price: "R 6 000",
        duration: "2-3 hrs",
        details: ["Patient & calm in-home session", "25 lightly retouched images", "Focus on baby with family photos included"],
    },
    {
        title: "Day in the Life",
        price: "R 9 500",
        duration: "3-4 hrs",
        details: ["Captures genuine, unposed moments at home", "75+ edited photos", "Includes a softcover photo book"],
    }
];

const couplesPackages = [
    {
        title: "Save the Date",
        price: "R 3 200",
        duration: "45 min",
        details: ["Ideal for your invitations", "10 edited images"],
    },
    {
        title: "Date Night",
        price: "R 5 500",
        duration: "90 min",
        details: ["Perfect for an engagement shoot", "40 edited images", "2 locations/looks"],
    },
    {
        title: "Anniversary",
        price: "R 4 800",
        duration: "1 hr",
        details: ["Celebrate another year together", "25 edited images", "A fun, relaxed session"],
    },
    {
        title: "The Secret Proposal",
        price: "R 8 500",
        duration: "Planning + 1 hr shoot",
        details: ["Captures the 'YES!' moment", "Includes planning consultation", "30 photos + highlight video clip"],
    }
];

const eventPackages = [
    {
        title: "Essential",
        price: "R 3 500",
        duration: "2 hrs",
        details: ["For kids' parties or intimate dinners", "60-80 edited images"],
    },
    {
        title: "Celebration",
        price: "R 6 500",
        duration: "4 hrs",
        details: ["For bigger bashes like 21sts or launch parties", "150+ edited images", "10 teaser photos included"],
    },
    {
        title: "Gala",
        price: "R 12 000",
        duration: "Up to 6 hrs",
        details: ["Comprehensive event coverage", "300+ edited images", "Includes candid & formal shots", "48-hour delivery for key shots"],
    }
];

const addOns = [
    { name: "Additional Hour/s of Coverage", price: "R 1 800" },
    { name: "Rush Delivery (48-hour turnaround)", price: "R 1 500" },
    { name: "30-sec Highlight Reel", price: "R 1 500" },
    { name: "Styling Consultation", price: "R 800" },
    { name: "Advanced Retouching (per image)", price: "R 250" },
    { name: "Hardcover Photo Album", price: "R 3 500" },
];

const PackageCard = ({ pkg }: { pkg: { title: string; price: string; duration: string; details: string[]; badge?: string } }) => (
    <Card className="bg-black/75 border-white/20 flex flex-col h-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                {pkg.badge && <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">{pkg.badge}</Badge>}
            </div>
            <CardDescription className="text-white/80 !mt-2">{pkg.duration}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <ul className="space-y-2 text-white/80 mb-6">
                {pkg.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className="size-4 text-primary mt-1 shrink-0" />
                        <span>{detail}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-4 pt-4">
            <p className="text-2xl font-bold text-right">{pkg.price}</p>
            <Button asChild size="lg" className="w-full uppercase font-bold tracking-widest">
                <Link href="/for-personal/contact">Book Now</Link>
            </Button>
        </CardFooter>
    </Card>
);


export default function ServicesPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48 pb-16 animate-fade-in-up">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black">
            Services & Bookings
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80 animate-fade-in-up animation-delay-200">
            Find the perfect package to capture your story. We offer a range of photography and videography services tailored to your personal milestones. All packages include high-resolution digital images delivered via a private online gallery.
          </p>
          <p className="mt-2 text-md max-w-3xl mx-auto text-white/70 animate-fade-in-up animation-delay-400">
            Sessions can be held at our fully-equipped Sandton studio or at a location of your choice.
          </p>
        </div>
      </section>

      <section className="py-10 animate-fade-in-up animation-delay-400">
        <div className="container space-y-24">
            
            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Lifestyle & Branding</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Whether you're a content creator, a professional updating your profile, or just looking to capture your unique vibe, these packages are designed to make you shine.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lifestylePackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Family & Maternity</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">From the beautiful bump to the chaotic joy of a full house, these sessions are all about capturing the love and connection that makes your family unique. Let's freeze these precious moments in time.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {familyPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>
            
            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Couples & Engagements</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">It all starts with the two of you. Let's celebrate your love story, whether it's a secret proposal, a fun date night, or announcing your engagement to the world. These sessions are about capturing your connection.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {couplesPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Private Events</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">You've planned the perfect party, now it's time to enjoy it! From intimate dinners to milestone birthdays, we'll capture the atmosphere and the memories, so you can relax and be present with your guests.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {eventPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div className="space-y-12 pt-16">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Extras & Add-Ons</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Customise your collection with our à la carte options to make it perfectly yours.</p>
                </div>

                <Card className="bg-black/75 border-white/20 max-w-4xl mx-auto">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                          General Package Add-Ons
                        </AccordionTrigger>
                        <AccordionContent className="p-6 pt-0">
                          <ul className="space-y-3">
                              {addOns.map(item => (
                                  <li key={item.name} className="flex justify-between items-center text-white/90">
                                      <span>{item.name}</span>
                                      <span className="font-semibold text-right pl-4">{item.price}</span>
                                  </li>
                              ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card className="bg-black/75 border-white/20 max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle>Travel Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-white/80">
                            Travel within a 35km radius of Sandton is included free of charge. For locations beyond this, a fee is charged for the return trip. Please contact us for a precise quote for your location.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <Card className="bg-black/75 border-primary/50 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Planning a Wedding?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-6">
                We have dedicated packages and a specialised enquiry form for weddings. Let's start planning your big day.
              </p>
              <Button asChild size="lg">
                <Link href="/for-personal/wedding-enquiry">
                  Wedding Enquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
