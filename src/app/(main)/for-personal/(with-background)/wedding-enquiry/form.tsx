
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { CalendarIcon, Loader2, Check } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { weddingEnquirySchema } from "@/lib/schemas";
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

const weddingPackages = [
    { 
        id: "wedding-micro", 
        label: "Micro Elopement", 
        price: "R 15 000", 
        description: "For intimate weddings under 60 guests, 250+ edited images, 1 photographer" 
    },
    { 
        id: "wedding-classic", 
        label: "Classic Collection", 
        price: "R 26 000", 
        description: "Full day coverage, 500+ edited images, 2 photographers, Free engagement shoot" 
    },
    { 
        id: "wedding-luxury", 
        label: "Luxury Experience (Photo + Film)", 
        price: "R 54 000", 
        description: "The ultimate photo & film package, 700+ edited images, 2 photographers, Free engagement shoot, A4 Fine Art Album, Includes a 5-7 minute Cinematic Highlight Film" 
    },
    { 
        id: "wedding-ultimate", 
        label: "The Ultimate Story (Photo + Documentary)", 
        price: "R 72 000", 
        description: "The complete wedding story, told in photos & film, Everything in the Luxury Experience, Full-length documentary film (ceremony, speeches, 1st dance)" 
    },
];

const weddingAddOns = [
    { id: "addon-second-photographer", label: "Second Photographer", price: "R 4 500" },
    { id: "addon-fine-art-album", label: "Fine Art Wedding Album", price: "R 6 500" },
    { id: "addon-parent-albums", label: "Parent Albums", price: "R 4 500" },
    { id: "addon-drone", label: "Drone Footage", price: "from R 3 500" },
    { id: "addon-cinematic-film", label: "Cinematic Story Film (5-7 min)", price: "from R 18 000" },
    { id: "addon-documentary-film", label: "Documentary Film Edit", price: "from R 18 000" },
    { id: "addon-same-day-teaser", label: "Same-Day Teaser Film (1 min)", price: "R 8 000" },
    { id: "addon-raw-footage", label: "Raw Video Footage", price: "R 5 000" },
];


export function WeddingEnquiryForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof weddingEnquirySchema>>({
    resolver: zodResolver(weddingEnquirySchema),
    defaultValues: {
      services: [],
      addOns: [],
      name: "",
      email: "",
      partnerName: "",
      venue: "",
      guestCount: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof weddingEnquirySchema>) {
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
            Your wedding enquiry has been sent. We're so excited to hear about your plans and will be in touch shortly!
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
                            <FormLabel className="text-base text-white">Which wedding collection are you interested in?</FormLabel>
                            <FormDescription className="text-white/70">
                                Select the package that best fits your vision. You can select more than one.
                            </FormDescription>
                        </div>
                        <div className="space-y-4">
                            {weddingPackages.map((item) => {
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
                            <FormLabel className="text-base text-white">Wedding Extras</FormLabel>
                            <FormDescription className="text-white/70">
                                Interested in any of these film or album add-ons?
                            </FormDescription>
                        </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {weddingAddOns.map((item) => (
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
                <FormLabel className="text-white">Your Details</FormLabel>
                 <div className="grid sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="partnerName" render={({ field }) => (
                        <FormItem><FormControl><Input placeholder="Your Partner's Name" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem className="sm:col-span-2"><FormControl><Input placeholder="Your Email" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
            </div>

            <div className="space-y-2">
                <FormLabel className="text-white">Wedding Details</FormLabel>
                <div className="grid sm:grid-cols-2 gap-6">
                    <FormField control={form.control} name="date" render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal",!field.value && "text-muted-foreground")}>
                                    {field.value ? format(field.value, "PPP") : <span>Wedding date</span>}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date() || date < new Date("1900-01-01")} initialFocus/>
                            </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={form.control} name="venue" render={({ field }) => (
                        <FormItem><FormControl><Input placeholder="Venue / Location" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                    <FormField control={form.control} name="guestCount" render={({ field }) => (
                        <FormItem><FormControl><Input placeholder="Estimated Guest Count" {...field} /></FormControl><FormMessage /></FormItem>
                    )}/>
                </div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Tell us about your wedding!</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's your story? What's the vibe of your day? The more details, the better!"
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
                {isPending ? "Sending Enquiry..." : "Start the Conversation"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
