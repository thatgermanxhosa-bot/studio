
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, CalendarIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { YocoCheckoutButton } from "./yoco-checkout-button";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalBookingSchema } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


// Since we're in a client component, we can't export metadata directly.
// This should be handled in a parent layout or via the generateMetadata function if this were a server component.
// export const metadata: Metadata = {
//   title: 'Services & Bookings | For Personal | Pichulik Studios',
//   description: 'Find the perfect package to capture your story. We offer a range of photography and videography services tailored to your personal milestones.',
// };

const lifestylePackages = [
  {
    title: "Mini Session",
    price: "2200",
    duration: "30 min",
    details: ["Perfect for quick headshots (LinkedIn/CVs)", "5 edited images", "Sandton studio or immediate area only"],
    badge: "Headshots"
  },
  {
    title: "Standard Influencer",
    price: "4200",
    duration: "1 hr",
    details: ["Ideal for social media content", "20 edited images + B&W copies", "1 location"],
    badge: "Content"
  },
    {
    title: "Content Creator",
    price: "5500",
    duration: "90 min",
    details: ["A batch of content for your feed", "30 edited images", "Up to 2 looks/themes", "Includes short-form video clips"],
    badge: "Creator"
  },
  {
    title: "Premium Brand",
    price: "6800",
    duration: "2 hrs",
    details: ["For websites & 3 months of content", "40+ edited images", "Up to 2 locations"],
    badge: "Branding"
  }
];

const familyPackages = [
    {
        title: "Quick & Easy",
        price: "2500",
        duration: "30 min",
        details: ["Great for short attention spans", "10 edited photos", "Immediate family only"],
    },
    {
        title: "Golden Hour",
        price: "5200",
        duration: "60-90 min",
        details: ["Outdoor sunset or cozy in-home session", "35+ edited images", "Includes styling guide"],
    },
    {
        title: "The Newborn",
        price: "6000",
        duration: "2-3 hrs",
        details: ["Patient & calm in-home session", "25 lightly retouched images", "Focus on baby with family photos included"],
    },
    {
        title: "Day in the Life",
        price: "9500",
        duration: "3-4 hrs",
        details: ["Captures genuine, unposed moments at home", "75+ edited photos", "Includes a softcover photo book"],
    }
];

const couplesPackages = [
    {
        title: "Save the Date",
        price: "3200",
        duration: "45 min",
        details: ["Ideal for your invitations", "10 edited images"],
    },
    {
        title: "Date Night",
        price: "5500",
        duration: "90 min",
        details: ["Perfect for an engagement shoot", "40 edited images", "2 locations/looks"],
    },
    {
        title: "Anniversary",
        price: "4800",
        duration: "1 hr",
        details: ["Celebrate another year together", "25 edited images", "A fun, relaxed session"],
    },
    {
        title: "The Secret Proposal",
        price: "8500",
        duration: "Planning + 1 hr shoot",
        details: ["Captures the 'YES!' moment", "Includes planning consultation", "30 photos + highlight video clip"],
    }
];

const eventPackages = [
    {
        title: "Essential",
        price: "3500",
        duration: "2 hrs",
        details: ["For kids' parties or intimate dinners", "60-80 edited images"],
    },
    {
        title: "Celebration",
        price: "6500",
        duration: "4 hrs",
        details: ["For bigger bashes like 21sts or launch parties", "150+ edited images", "10 teaser photos included"],
    },
    {
        title: "Gala",
        price: "12000",
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

type Package = { title: string; price: string; duration: string; details: string[]; badge?: string };

const BookingDialog = ({ pkg, children }: { pkg: Package, children: React.ReactNode }) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof personalBookingSchema>>({
        resolver: zodResolver(personalBookingSchema),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
        },
    });

    const { formState: { isValid } } = form;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-card border-border text-card-foreground">
                <DialogHeader>
                    <DialogTitle>Book: {pkg.title}</DialogTitle>
                    <DialogDescription>
                        Please provide your details and select a date for your session.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <Form {...form}>
                        <form className="space-y-4">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Phone Number (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+27 12 345 6789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormItem>
                                <FormLabel>Booking Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() -1))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                             </FormItem>
                        </form>
                     </Form>
                </div>
                <DialogFooter>
                    <YocoCheckoutButton
                        amount={parseInt(pkg.price) * 100} // Yoco expects amount in cents
                        currency="ZAR"
                        itemName={pkg.title}
                        bookingDate={date}
                        disabled={!date || !isValid}
                        customer={form.getValues()}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const PackageCard = ({ pkg }: { pkg: Package }) => {
    return (
    <Card className="bg-black/75 border-white/20 flex flex-col h-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                {pkg.badge && <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">{pkg.badge}</Badge>}
            </div>
            <CardDescription className="text-white/80 !mt-2">{pkg.duration}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-2xl font-bold text-right mb-4">R {parseInt(pkg.price).toLocaleString('en-ZA')}</p>
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
            <BookingDialog pkg={pkg}>
                 <Button
                    size="lg"
                    className="w-full uppercase font-bold tracking-widest"
                >
                    Book Now
                </Button>
            </BookingDialog>
        </CardFooter>
    </Card>
)};


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
