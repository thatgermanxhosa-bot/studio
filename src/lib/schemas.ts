
import { z } from "zod";

export const bookingSchema = z.object({
  service: z.string().min(1, "Please select a service."),
  date: z.date({ required_error: "Please select a date." }),
  time: z.string().min(1, "Please select a time."),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  notes: z.string().optional(),
});

export const personalBookingSchema = z.object({
  services: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one service.",
  }),
  addOns: z.array(z.string()).optional(),
  date: z.date({ required_error: "Please select a date." }).optional(),
  time: z.string().optional(),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  notes: z.string().optional(),
});


export const quotationSchema = z.object({
  services: z.array(z.string()).min(1, { message: "Please select at least one service." }),
  projectDetails: z.string().min(10, "Please provide some details about your project."),
  budget: z.string({ required_error: "Please select a budget range."}).min(1, "Please select a budget range."),
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  phone: z.string().optional(),
  requiredDate: z.date().optional(),
  turnaroundTime: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject is required."),
  message: z.string().min(10, "Message is required."),
});

    
