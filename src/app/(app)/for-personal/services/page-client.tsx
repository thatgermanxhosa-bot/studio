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
    details: ["Celebrate your achievement with a quick, iconic photoshoot on campus. We'll capture your big moment so you can get back to the party.", "Includes 15 professionally edited images.", "Fast 48-hour delivery of your photos."],
    badge: "On-Campus"
  },
  {
    title: "The Career Launch (All-In-One)",
    price: "2850",
    duration: "2 Hours",
    details: ["Capture the full graduation experience and kickstart your career in one session. Get celebratory shots with family and sleek, professional headshots for your CV.", "Includes 40+ images, family photos, and 5 dedicated LinkedIn headshots.", "24-hour priority delivery to get you started."],
    badge: "On-Campus & Studio"
  },
  {
    title: "The Studio Quickie (Mini Session)",
    price: "2200",
    duration: "30 Min",
    details: ["Need a fast, high-impact update? This session delivers stunning portraits with professional lighting, no fuss.", "Perfect for a new profile picture, a CV refresh, or a quick confidence boost.", "Includes 5 polished, edited images."],
    badge: "Studio"
  },
  {
    title: "The Lifestyle Standard",
    price: "4200",
    duration: "1 Hour",
    details: ["Let's create something that's truly you. This session gives us time to play with different looks, from casual and candid to stylish and posed.", "Ideal for personal branding, social media content, or simply celebrating yourself.", "Includes 20 edited images plus black & white versions."],
    badge: "Studio or On-Location"
  },
  {
    title: "The Creative Batch",
    price: "5500",
    duration: "90 Min",
    details: ["A high-energy session designed for maximum variety. We'll explore different outfits and styles to build a rich library of content.", "Perfect for influencers and creators who need a diverse range of looks.", "Includes 30 edited images, 2 outfit changes, and raw video clips for your socials."],
    badge: "On-Location"
  },
  {
    title: "The Full Visual Bank",
    price: "6800",
    duration: "2 Hours",
    details: ["The ultimate session for a complete visual overhaul. We'll spend time crafting the perfect shots to tell your story.", "Ideal for anyone wanting a massive library of high-quality, versatile content.", "Includes 40+ premium images captured across 2 stunning locations."],
    badge: "Multi-Location"
  }
];

const familyPackages = [
    {
        title: "Quick & Easy",
        price: "2500",
        duration: "30 min",
        details: ["Perfect for capturing beautiful family moments, even with the shortest attention spans.", "Includes 10 beautifully edited photos.", "For immediate family members."],
        badge: "Studio or Park"
    },
    {
        title: "Golden Hour",
        price: "5200",
        duration: "60-90 min",
        details: ["Let's chase the sunset or get cozy at home. This session is all about warm, authentic moments.", "Includes 35+ dreamy, edited images.", "Comes with a complimentary styling guide."],
        badge: "On-Location"
    },
    {
        title: "The Newborn",
        price: "6000",
        duration: "2-3 hrs",
        details: ["A calm, patient session capturing the tender, fleeting moments with your new arrival.", "Includes 25 delicately retouched images.", "Focuses on your baby, with beautiful family photos included."],
        badge: "In-Home or Studio"
    },
    {
        title: "Day in the Life",
        price: "9500",
        duration: "3-4 hrs",
        details: ["Forget posing. This documentary-style session captures the genuine, unscripted story of your family.", "Includes 75+ candid, edited photos.", "A beautiful softcover photo book to tell your story."],
        badge: "In-Home & Outing"
    }
];

const couplesPackages = [
    {
        title: "Save the Date",
        price: "3200",
        duration: "45 min",
        details: ["Announce your big news in style with a short and sweet session.", "Perfect for creating beautiful images for your invitations.", "Includes 10 perfectly edited images."],
        badge: "On-Location"
    },
    {
        title: "Date Night",
        price: "5500",
        duration: "90 min",
        details: ["Let's go on an adventure! This is the quintessential engagement shoot experience.", "Explore two locations and two different looks for a diverse gallery.", "Includes 40 romantic, edited images."],
        badge: "Multi-Location"
    },
    {
        title: "Anniversary",
        price: "4800",
        duration: "1 hr",
        details: ["Celebrate another year of your love story with a fun, relaxed, and intimate photoshoot.", "A beautiful way to reconnect and create new memories.", "Includes 25 cherished, edited images."],
        badge: "On-Location"
    },
    {
        title: "The Secret Proposal",
        price: "8500",
        duration: "Planning + 1 hr shoot",
        details: ["Let's plan the perfect surprise! We'll hide in plain sight to capture the 'YES!' moment forever.", "Includes a detailed planning consultation.", "Receive 30+ photos and a highlight video clip of the magic."],
        badge: "Your Secret Spot"
    }
];

const eventPackages = [
    {
        title: "Essential",
        price: "3500",
        duration: "2 hrs",
        details: ["Perfect for capturing the key moments of your intimate gathering, like a kids' party or small dinner.", "Focuses on the smiles, laughs, and special details.", "Includes 60-80 vibrant, edited images."],
        badge: "Venue"
    },
    {
        title: "Celebration",
        price: "6500",
        duration: "4 hrs",
        details: ["For bigger bashes like 21st birthdays or launch parties where you don't want to miss a thing.", "Comprehensive coverage of the guests, decor, and atmosphere.", "Includes 150+ edited images plus 10 teaser photos."],
        badge: "Venue"
    },
    {
        title: "Gala",
        price: "12000",
        duration: "Up to 6 hrs",
        details: ["The complete event package for when every moment is important. We'll capture it all.", "A mix of candid moments and formal shots to tell the full story.", "Includes 300+ edited images with priority 48-hour delivery for key shots."],
        badge: "Venue"
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
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">For the creators, the graduates, and the professionals. These sessions are designed to capture your unique personality and ambition, delivering images that make you stand out.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {lifestylePackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Family & Maternity</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">From the beautiful glow of maternity to the chaotic joy of a full house. Let's capture the love and connection that makes your family's story so special and turn these fleeting moments into timeless treasures.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {familyPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>
            
            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Couples & Engagements</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Your love story is one-of-a-kind. Whether it's a secret proposal, an adventurous date night, or announcing your engagement to the world, we'll capture your unique connection and chemistry.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {couplesPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Events</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Big or small, every celebration is worth remembering. We capture the energy, the details, and the candid moments, so you can relax and relive the joy of your special day, stress-free.</p>
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

    