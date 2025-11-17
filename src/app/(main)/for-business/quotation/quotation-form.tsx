
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check } from "lucide-react";

import { quotationSchema } from "@/lib/schemas";
import { handleQuotation } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
    { 
        id: "video-production", 
        title: "Strategic Video Production",
        description: "Professional video content that tells your brand story, engages your audience, and drives results.",
        examples: ["Brand storytelling", "Product demonstrations", "Training videos", "Marketing content"]
    },
    { 
        id: "professional-photography", 
        title: "Corporate & Commercial Photography",
        description: "High-quality photography services for all your business needs.",
        examples: ["Corporate headshots", "Product photography", "Event coverage", "Architectural photography"]
    },
    { 
        id: "post-production", 
        title: "Full-Service Post-Production",
        description: "Expert editing and post-production to polish your visual content.",
        examples: ["Video editing", "Color grading", "Motion graphics", "Audio mixing"]
    },
    { 
        id: "graphics-animation", 
        title: "Motion Graphics & Animation",
        description: "Eye-catching 2D & 3D graphics and animations to explain complex ideas and capture attention.",
        examples: ["Motion graphics", "Logo animation", "Infographics", "Social media graphics"]
    },
    { 
        id: "creative-consultation", 
        title: "Creative Strategy & Consultation",
        description: "Expert guidance to develop your content strategy and creative direction.",
        examples: ["Concept development", "Campaign strategy", "Brand identity", "Storyboarding"]
    },
]

const budgetRanges = [
    { id: "<5k", label: "< R5,000" },
    { id: "5k-15k", label: "R5,000 - R15,000" },
    { id: "15k-30k", label: "R15,000 - R30,000" },
    { id: "30k-50k", label: "R30,000 - R50,000" },
    { id: "50k-100k", label: "R50,000 - R100,000" },
    { id: "100k+", label: "R100,000+" },
]

export function QuotationForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof quotationSchema>>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      services: [],
      projectDetails: "",
      budget: "",
      name: "",
      email: "",
      company: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof quotationSchema>) {
    startTransition(async () => {
      const result = await handleQuotation(values);
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
          <CardDescription className="text-white/80 pt-2">Your quote request has been received.</CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="font-bold text-lg">Quick Response</h3>
          <p className="text-white/80 mt-2">
            We'll review your request and get back to you within 24 hours with a customised quote and availability.
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
                    <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Name</FormLabel>
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
                                <FormLabel>Your Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Company Inc." {...field} />
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
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="+27 12 345 6789" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="services"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base">What's the primary focus? (Check all that apply)</FormLabel>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {services.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="services"
                                    render={({ field }) => {
                                        const isSelected = field.value?.includes(item.id);
                                        return (
                                        <FormItem key={item.id} className="w-full">
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
                                                        )
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
                                                <div className="flex items-start justify-between mb-3">
                                                    <h4 className="font-bold text-lg pr-8">{item.title}</h4>
                                                    <div className={cn(
                                                        "flex items-center justify-center size-5 rounded-sm border border-primary shrink-0 mt-1",
                                                        isSelected ? "bg-primary" : "bg-transparent"
                                                    )}>
                                                        {isSelected && <Check className="h-4 w-4 text-primary-foreground" />}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-white/70 mb-4">{item.description}</p>
                                                <ul className="space-y-1 text-sm text-white/60">
                                                    {item.examples.map(ex => <li key={ex} className="flex items-center gap-2">
                                                        <span className="text-primary/50">&bull;</span> {ex}
                                                    </li>)}
                                                </ul>
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

                    <FormField
                        control={form.control}
                        name="projectDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tell Us About Your Project & Goals</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Briefly describe your project, what you want to achieve, and who your audience is."
                                    rows={6}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                       <FormField
                            control={form.control}
                            name="requiredDate"
                            render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Required Date (Optional)</FormLabel>
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
                                    disabled={(date) =>
                                        date < new Date(new Date().setDate(new Date().getDate() -1))
                                    }
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
                            name="turnaroundTime"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Turnaround Time (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 2 weeks, by end of month" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estimated Project Budget</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select a budget range..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {budgetRanges.map((range) => (
                                            <SelectItem key={range.id} value={range.id}>{range.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending} className="w-full sm:w-auto uppercase font-bold tracking-widest px-8">
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isPending ? "Submitting..." : "Start the Conversation"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardContent>
    </Card>
  );
}
