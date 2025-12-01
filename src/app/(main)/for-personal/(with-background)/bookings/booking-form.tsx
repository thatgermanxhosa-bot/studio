
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
            { id: "lifestyle-mini", label: "Mini Session (Headshots)", price: "R 2 200", description: "Perfect for quick headshots (LinkedIn/CVs), 5 edited images, Sandton studio or immediate area only" },
            { id: "lifestyle-influencer", label: "Standard Influencer", price: "R 4 200", description: "Ideal for social media content, 20 edited images + B&W copies, 1 location" },
            { id: "lifestyle-content-creator", label: "Content Creator", price: "R 5 500", description: "A batch of content for your feed, 30 edited images, Up to 2 looks/themes, Includes short-form video clips"},
            { id: "lifestyle-premium", label: "Premium Brand", price: "R 6 800", description: "For websites & 3 months of content, 40+ edited images, Up to 2 locations" },
        ]
    },
    {
        title: "Family & Maternity",
        services: [
            { id: "family-quick", label: "Quick & Easy", price: "R 2 500", description: "Great for short attention spans, 10 edited photos, Immediate family only" },
            { id: "family-golden-hour", label: "Golden Hour", price: "R 5 200", description: "Outdoor sunset or cozy in-home session, 35+ edited images, Includes styling guide" },
            { id: "family-newborn", label: "The Newborn", price: "R 6 000", description: "Patient & calm in-home session, 25 lightly retouched images, Focus on baby with family photos included" },
            { id: "family-day-in-life", label: "Day in the Life", price: "R 9 500", description: "Captures genuine, unposed moments at home, 75+ edited photos, Includes a softcover photo book" },
        ]
    },
    {
        title: "Couples & Engagements",
        services: [
            { id: "couples-save-the-date", label: "Save the Date", price: "R 3 200", description: "Ideal for your invitations, 10 edited images" },
            { id: "couples-date-night", label: "Date Night (Engagement)", price: "R 5 500", description: "Perfect for an engagement shoot, 40 edited images, 2 locations/looks" },
            { id: "couples-anniversary", label: "Anniversary", price: "R 4 800", description: "Celebrate another year together, 25 edited images, A fun, relaxed session" },
            { id: "couples-proposal", label: "The Secret Proposal", price: "R 8 500", description: "Captures the 'YES!' moment, Includes planning consultation, 30 photos + highlight video clip" },
        ]
    },
    {
        title: "Private Events",
        services: [
            { id: "event-essential", label: "Essential (2 hrs)", price: "R 3 500", description: "For kids' parties or intimate dinners, 60-80 edited images" },
            { id: "event-celebration", label: "Celebration (4 hrs)", price: "R 6 500", description: "For bigger bashes like 21sts or launch parties, 150+ edited images, 10 teaser photos included" },
            { id: "event-gala", label: "Gala (6 hrs)", price: "R 12 000", description: "Comprehensive event coverage, 300+ edited images, Includes candid & formal shots, 48-hour delivery for key shots" },
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
                render={({ field }) => (
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
                                    <h3 className="font-bold text-lg text-white mb-3">{category.title}</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {category.services.map((item) => {
                                            const isSelected = field.value?.includes(item.id);
                                            return (
                                                <FormItem key={item.id}>
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={isSelected}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...(field.value || []), item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                        (value) => value !== item.id
                                                                        )
                                                                    );
                                                            }}
                                                            className="sr-only"
                                                            id={item.id}
                                                        />
                                                    </FormControl>
                                                    <FormLabel htmlFor={item.id} className={cn(
                                                        "block w-full h-full p-4 rounded-lg border-2 cursor-pointer transition-all relative",
                                                        isSelected 
                                                        ? "border-primary bg-primary/10" 
                                                        : "border-white/20 hover:border-white/50"
                                                    )}>
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h4 className="font-bold text-white/90 pr-8 flex-1">{item.label}</h4>
                                                            <div className={cn(
                                                                "flex items-center justify-center size-5 rounded-sm border border-primary shrink-0 mt-1",
                                                                isSelected ? "bg-primary" : "bg-transparent"
                                                            )}>
                                                                {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm text-white/70 mb-3">{item.description}</p>
                                                        <p className="font-bold text-white/90 text-right">{item.price}</p>
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        })}
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

    