
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { quotationSchema } from "@/lib/schemas";
import { handleQuotation } from "@/lib/actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const services = [
    { id: "strategic-video-production", label: "Strategic Video Production" },
    { id: "corporate-commercial-photography", label: "Corporate & Commercial Photography" },
    { id: "full-service-post-production", label: "Full-Service Post-Production" },
    { id: "motion-graphics-animation", label: "Motion Graphics & Animation" },
    { id: "creative-strategy-consultation", label: "Creative Strategy & Consultation" },
]

const budgetRanges = [
    { id: "<5k", label: "< R5,000" },
    { id: "5k-15k", label: "R5,000 - R15,000" },
    { id: "15k-30k", label: "R15,000 - R30,000" },
    { id: "30k+", label: "R30,000+" },
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
                                        return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-center space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item.id
                                                        )
                                                    )
                                                }}
                                            />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                            {item.label}
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

                    <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Estimated Project Budget</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                                    >
                                    {budgetRanges.map((range) => (
                                        <FormItem key={range.id} className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={range.id} />
                                            </FormControl>
                                            <FormLabel className="font-normal">{range.label}</FormLabel>
                                        </FormItem>
                                    ))}
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
