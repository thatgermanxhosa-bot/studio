
'use client';

import { useState, useEffect, useTransition } from 'react';
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
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { personalBookingSchema } from "@/lib/schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import { createYocoCheckout } from '@/lib/actions';

const lifestylePackages = [
  {
    title: "The Grad-and-Go (Essential)",
    price: "950",
    duration: "45 Min",
    details: ["The Vibe: Quick, iconic campus photos to celebrate your degree.", "Included: 15 edited digital images. 48-hour delivery.", "Location: On-campus or desired location."],
    badge: "Graduation"
  },
  {
    title: "The Career Launch (All-In-One)",
    price: "2850",
    duration: "2 Hours",
    details: ["The Vibe: The full graduation celebration + your first 'grown-up' professional headshots for your CV.", "Included: 40+ photos, family shots, and 5 dedicated LinkedIn headshots. 24-hour priority delivery.", "Location: On-campus & Studio."],
    badge: "Graduation"
  },
  {
    title: "The Studio Quickie (Mini Session)",
    price: "2200",
    duration: "30 Min",
    details: ["The Vibe: A fast, high-quality studio refresh. No fuss, just great lighting.", "Best For: A new profile pic, a fresh CV photo, or a quick portrait update.", "Included: 5 edited images.", "Location: Sandton Studio only."],
    badge: "Studio"
  },
  {
    title: "The Lifestyle Standard",
    price: "4200",
    duration: "1 Hour",
    details: ["The Vibe: More time to play. This is perfect for a mix of casual and 'dressed up' shots.", "Best For: Personal branding, updated social photos, or a solo creative session.", "Included: 20 edited images + Black & White copies.", "Location: Studio or 1 local Sandton spot."],
    badge: "On-Location"
  },
  {
    title: "The Creative Batch",
    price: "5500",
    duration: "90 Min",
    details: ["The Vibe: A fun, high-energy session to get a whole variety of looks.", "Best For: People who want a lot of variety in one go.", "Included: 30 edited images + 2 outfit changes + raw video clips for your TikTok or Reels.", "Location: Studio or multiple local spots."],
    badge: "Creator"
  },
  {
    title: "The Full Visual Bank",
    price: "6800",
    duration: "2 Hours",
    details: ["The Vibe: The ultimate personal glow-up. We spend the time to get every angle right.", "Best For: Anyone needing a massive library of high-quality content.", "Included: 40+ premium images across 2 different locations.", "Location: 2 locations of your choice."],
    badge: "Branding"
  }
];

const familyPackages = [
    {
        title: "Quick & Easy",
        price: "2500",
        duration: "30 min",
        details: ["Great for short attention spans", "10 edited photos", "Immediate family only", "Location: Studio or local park"],
    },
    {
        title: "Golden Hour",
        price: "5200",
        duration: "60-90 min",
        details: ["Outdoor sunset or cozy in-home session", "35+ edited images", "Includes styling guide", "Location: Your home or chosen outdoor spot"],
    },
    {
        title: "The Newborn",
        price: "6000",
        duration: "2-3 hrs",
        details: ["Patient & calm in-home session", "25 lightly retouched images", "Focus on baby with family photos included", "Location: Your home"],
    },
    {
        title: "Day in the Life",
        price: "9500",
        duration: "3-4 hrs",
        details: ["Captures genuine, unposed moments at home", "75+ edited photos", "Includes a softcover photo book", "Location: Your home & a local outing"],
    }
];

const couplesPackages = [
    {
        title: "Save the Date",
        price: "3200",
        duration: "45 min",
        details: ["Ideal for your invitations", "10 edited images", "Location: 1 chosen spot"],
    },
    {
        title: "Date Night",
        price: "5500",
        duration: "90 min",
        details: ["Perfect for an engagement shoot", "40 edited images", "2 locations/looks", "Location: 2 chosen spots"],
    },
    {
        title: "Anniversary",
        price: "4800",
        duration: "1 hr",
        details: ["Celebrate another year together", "25 edited images", "A fun, relaxed session", "Location: A meaningful spot for you"],
    },
    {
        title: "The Secret Proposal",
        price: "8500",
        duration: "Planning + 1 hr shoot",
        details: ["Captures the 'YES!' moment", "Includes planning consultation", "30 photos + highlight video clip", "Location: Your secret proposal spot"],
    }
];

const eventPackages = [
    {
        title: "Essential",
        price: "3500",
        duration: "2 hrs",
        details: ["For kids' parties or intimate dinners", "60-80 edited images", "Location: 1 event venue"],
    },
    {
        title: "Celebration",
        price: "6500",
        duration: "4 hrs",
        details: ["For bigger bashes like 21sts or launch parties", "150+ edited images", "10 teaser photos included", "Location: 1 event venue"],
    },
    {
        title: "Gala",
        price: "12000",
        duration: "Up to 6 hrs",
        details: ["Comprehensive event coverage", "300+ edited images", "Includes candid & formal shots", "48-hour delivery for key shots", "Location: 1 event venue"],
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

const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00"
];

type Package = { title: string; price: string; duration: string; details: string[]; badge?: string };

const BookingDialog = ({ pkg, children }: { pkg: Package, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof personalBookingSchema>>({
        resolver: zodResolver(personalBookingSchema),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          bookingDate: undefined,
          bookingTime: "",
        },
    });

    const onSubmit = (values: z.infer<typeof personalBookingSchema>) => {
        startTransition(async () => {
            const result = await createYocoCheckout({
                amount: parseInt(pkg.price) * 100, // Yoco expects amount in cents
                currency: "ZAR",
                itemName: pkg.title,
                ...values,
            });

            if (result.error) {
                toast({
                    title: "Payment Error",
                    description: result.error,
                    variant: "destructive",
                });
            } else if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            }
        });
    };

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
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="bookingDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Booking Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() -1))}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bookingTime"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Booking Time</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select a time" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {timeSlots.map((time) => (
                                        <SelectItem key={time} value={time}>
                                            {time}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending || !form.formState.isValid}
                            size="lg"
                            className="w-full uppercase font-bold tracking-widest mt-4"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Redirecting...
                                </>
                            ) : (
                                "Book & Pay Now"
                            )}
                        </Button>
                    </form>
                 </Form>
            </DialogContent>
        </Dialog>
    )
}

const PackageCard = ({ pkg }: { pkg: Package }) => {
    const [formattedPrice, setFormattedPrice] = useState(pkg.price);

    useEffect(() => {
        // Format the price on the client side to avoid hydration mismatch
        setFormattedPrice(parseInt(pkg.price).toLocaleString('en-ZA'));
    }, [pkg.price]);

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
            <p className="text-2xl font-bold text-right mb-4">R {formattedPrice}</p>
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


export default function ServicesClient() {
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h2 className="text-3xl font-bold">Events</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Big or small, every celebration deserves to be remembered. We'll cover your event with an eye for detail and a knack for capturing the atmosphere, leaving you free to enjoy the moment.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eventPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div className="space-y-8 max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold">Customize Your Package</h2>
                <p className="text-white/80">Need something a little different? We can tailor any package to fit your needs. Check out our add-ons or get in touch for a custom quote.</p>
                
                <Accordion type="single" collapsible className="w-full bg-black/75 border border-white/20 rounded-lg px-6">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl font-bold hover:no-underline">Popular Add-Ons</AccordionTrigger>
                        <AccordionContent>
                        <ul className="space-y-3 text-left pt-4">
                            {addOns.map(addon => (
                            <li key={addon.name} className="flex justify-between items-center border-b border-white/10 pb-3">
                                <span>{addon.name}</span>
                                <span className="font-semibold">{addon.price}</span>
                            </li>
                            ))}
                        </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            
             <div className="text-center">
                <p className="text-lg text-white/80 mb-6">Have a different kind of project in mind? Let's chat.</p>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                    <Link href="/for-personal/contact">Contact Us For a Custom Quote <ArrowRight className="ml-2" /></Link>
                </Button>
            </div>

        </div>
      </section>
    </div>
  );
}
