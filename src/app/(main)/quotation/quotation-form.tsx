
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const services = [
  { id: "videography", label: "Videography" },
  { id: "photography", label: "Photography" },
  { id: "post-production", label: "Post-Production" },
  { id: "styling", label: "Styling" },
] as const;

const progressSteps = ["Services", "Details", "Contact"];

export function QuotationForm() {
  const [currentStep, setCurrentStep] = useState(0);
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
    },
  });

  async function processNextStep() {
    let fieldsToValidate: (keyof z.infer<typeof quotationSchema>)[] = [];
    if (currentStep === 0) fieldsToValidate = ["services"];
    if (currentStep === 1) fieldsToValidate = ["projectDetails", "budget"];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  }

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
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-muted-foreground">
            Your quote request has been sent. We'll be in touch within 1-2 business days.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8">
          {progressSteps.map((step, index) => (
            <div key={step} className="flex-1 text-center">
              <div
                className={cn(
                  "mx-auto size-8 rounded-full border-2 flex items-center justify-center font-bold transition-all",
                  currentStep > index ? "bg-primary border-primary text-primary-foreground" :
                  currentStep === index ? "border-primary text-primary" : "border-border text-muted-foreground"
                )}
              >
                {currentStep > index ? '✓' : index + 1}
              </div>
              <p className={cn("mt-2 text-sm font-bold", currentStep >= index ? "text-foreground" : "text-muted-foreground")}>{step}</p>
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Step 1: Services */}
            <div className={cn("space-y-8", currentStep !== 0 && "hidden")}>
              <FormField
                control={form.control}
                name="services"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">What services do you need?</FormLabel>
                      <FormDescription>Select all that apply.</FormDescription>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="services"
                          render={({ field }) => (
                            <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
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
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Step 2: Details */}
            <div className={cn("space-y-8", currentStep !== 1 && "hidden")}>
              <h2 className="text-xl font-bold">Tell us about your project</h2>
              <FormField
                control={form.control}
                name="projectDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What is the scope of the project? What are your goals?" rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Budget</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a range..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="<5k">&lt; R5,000</SelectItem>
                        <SelectItem value="5k-15k">R5,000 - R15,000</SelectItem>
                        <SelectItem value="15k-30k">R15,000 - R30,000</SelectItem>
                        <SelectItem value="30k+">R30,000+</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Step 3: Contact */}
            <div className={cn("space-y-8", currentStep !== 2 && "hidden")}>
              <h2 className="text-xl font-bold">Your Contact Information</h2>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
                    <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)} className={cn(currentStep === 0 && "invisible")}>
                Back
              </Button>
              {currentStep < 2 ? (
                <Button type="button" onClick={processNextStep}>Next</Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Submitting..." : "Get Quote"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
