
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CalendarIcon, Loader2, Check } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { personalBookingSchema } from "@/lib/schemas";
import { handlePersonalBooking } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const serviceCategories = [
    {
        title: "Lifestyle & Branding",
        services: [
            { id: "lifestyle-mini", label: "Mini Session (Headshots)", price: "R 2 200"},
            { id: "lifestyle-influencer", label: "Standard Influencer", price: "R 4 200"},
            { id: "lifestyle-content-creator", label: "Content Creator", price: "R 5 500"},
            { id: "lifestyle-premium", label: "Premium Brand", price: "R 6 800"},
        ]
    },
    {
        title: "Family & Maternity",
        services: [
            { id: "family-quick", label: "Quick & Easy", price: "R 2 500"},
            { id: "family-golden-hour", label: "Golden Hour", price: "R 5 200"},
            { id: "family-newborn", label: "The Newborn", price: "R 6 000"},
            { id: "family-day-in-life", label: "Day in the Life", price: "R 9 500"},
        ]
    },
    {
        title: "Couples & Engagements",
        services: [
            { id: "couples-save-the-date", label: "Save the Date", price: "R 3 200"},
            { id: "couples-date-night", label: "Date Night (Engagement)", price: "R 5 500"},
            { id: "couples-anniversary", label: "Anniversary", price: "R 4 800"},
            { id: "couples-proposal", label: "The Secret Proposal", price: "R 8 500"},
        ]
    },
    {
        title: "Private Events",
        services: [
            { id: "event-essential", label: "Essential (2 hrs)", price: "R 3 500"},
            { id: "event-celebration", label: "Celebration (4 hrs)", price: "R 6 500"},
            { id: "event-gala", label: "Gala (6 hrs)", price: "R 12 000"},
        ]
    },
    {
        title: "Weddings",
        services: [
            { id: "wedding-micro", label: "Micro Elopement", price: "R 15 000"},
            { id: "wedding-classic", label: "Classic Collection", price: "R 26 000"},
            { id: "wedding-luxury", label: "Luxury Experience (Photo + Film)", price: "R 54 000"},
            { id: "wedding-ultimate", label: "The Ultimate Story (Photo + Documentary)", price: "R 72 000"},
        ]
    }
];

const addOns = [
    { id: "addon-extra-hour", label: "Additional Hour/s of Coverage", price: "R 1 800" },
    { id: "addon-rush-delivery", label: "Rush Delivery (48-hour turnaround)", price: "R 1 500" },
    { id: "addon-highlight-reel", label: "30-sec Highlight Reel", price: "R 1 500" },
    { id: "addon-styling-consult", label: "Styling Consultation", price: "R 800" },
    { id: "addon-advanced-retouching", label: "Advanced Retouching (per image)", price: "R 250" },
    { id: "addon-photo-album", label: "Hardcover Photo Album", price: "R 3 500" },
    { id: "addon-second-photographer", label: "Second Photographer", price: "R 4 500" },
    { id: "addon-fine-art-album", label: "Fine Art Wedding Album", price: "R 6 500" },
    { id: "addon-parent-albums", label: "Parent Albums", price: "R 4 500" },
    { id: "addon-drone", label: "Drone Footage", price: "from R 3 500" },
    { id: "addon-cinematic-film", label: "Cinematic Story Film (5-7 min)", price: "from R 18 000" },
    { id: "addon-documentary-film", label: "Documentary Film Edit", price: "from R 18 000" },
    { id: "addon-same-day-teaser", label: "Same-Day Teaser Film (1 min)", price: "R 8 000" },
    { id: "addon-raw-footage", label: "Raw Video Footage", price: "R 5 000" },
];


export function BookingForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof personalBookingSchema>>({
    resolver: zodResolver(personalBookingSchema),
    defaultValues: {
      services: [],
      addOns: [],
      name: "",
      email: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof personalBookingSchema>) {
    startTransition(async () => {
      const result = await handlePersonalBooking(values);
      if (result.success) {
        setIsSuccess(true);
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  }

  if (isSuccess) {
    return (
      <Card className="w-full bg-black/75 border-white/20 text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Thank You!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            Your booking request has been sent. We'll be in touch soon to confirm availability.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/75 border-white/20">
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <FormField
                control={form.control}
                name="services"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base text-white">What services are you interested in?</FormLabel>
                            <FormDescription className="text-white/70">
                                Select one or more packages you'd like to book or get more information on.
                            </FormDescription>
                        </div>
                        <div className="space-y-6">
                            {serviceCategories.map((category) => (
                                <div key={category.title}>
                                    <h3 className="font-bold text-white mb-3">{category.title}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {category.services.map((item) => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name="services"
                                            render={({ field }) => {
                                                return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([...field.value, item.id])
                                                            : field.onChange(
                                                                field.value?.filter(
                                                                (value) => value !== item.id
                                                                )
                                                            )
                                                        }}
                                                    />
                                                    </FormControl>
                                                    <FormLabel className="font-normal text-white/90 flex-1">
                                                        {item.label} <span className="text-white/60">({item.price})</span>
                                                    </FormLabel>
                                                </FormItem>
                                                )
                                            }}
                                        />
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="addOns"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base text-white">Any extras?</FormLabel>
                            <FormDescription className="text-white/70">
                                Let us know if you're interested in any of these add-ons.
                            </FormDescription>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {addOns.map((item) => (
                                <FormField
                                key={item.id}
                                control={form.control}
                                name="addOns"
                                render={({ field }) => {
                                    return (
                                    <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                        <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item.id
                                                    )
                                                )
                                            }}
                                        />
                                        </FormControl>
                                        <FormLabel className="font-normal text-white/90 flex-1">
                                            {item.label} <span className="text-white/60">({item.price})</span>
                                        </FormLabel>
                                    </FormItem>
                                    )
                                }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <div className="space-y-2">
                <FormLabel className="text-white">When are you thinking?</FormLabel>
                <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                            <Button
                                variant={"outline"}
                                className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                format(field.value, "PPP")
                                ) : (
                                <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
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
                    name="time"
                    render={({ field }) => (
                    <FormItem>
                        <FormControl>
                        <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                </div>
            </div>

            <div className="space-y-2">
                <FormLabel className="text-white">Your Details</FormLabel>
                 <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Your Name" {...field} />
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
                        <FormControl>
                            <Input placeholder="Your Email" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Tell us about the occasion (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 50th birthday party, surprise proposal at the botanical gardens..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending} size="lg" className="uppercase font-bold tracking-widest px-8">
                 {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Submitting..." : "Request Booking"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
