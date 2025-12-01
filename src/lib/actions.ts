
"use server";

import { z } from "zod";
import { bookingSchema, contactSchema, quotationSchema, weddingEnquirySchema } from "./schemas";
import { analyzeQuoteRequest } from "@/ai/flows/intelligent-quote-request-processing";

export async function handleBooking(data: z.infer<typeof bookingSchema>) {
  const validatedFields = bookingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }
  
  // Here you would typically save to a database or send an email.
  console.log("New Booking Request:", validatedFields.data);

  return { success: "Booking request sent successfully!" };
}

export async function handlePersonalBooking(data: z.infer<typeof weddingEnquirySchema>) {
    const weddingValidatedFields = weddingEnquirySchema.safeParse(data);
    if (!weddingValidatedFields.success) {
      return { error: "Invalid data" };
    }
    console.log("New Wedding Enquiry:", weddingValidatedFields.data);
    return { success: "Wedding enquiry sent successfully!" };
}


export async function handleQuotation(data: z.infer<typeof quotationSchema>) {
  const validatedFields = quotationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { projectDetails, services, budget, ...contactInfo } = validatedFields.data;

  // Here you would typically save to a database or send an email.
  console.log("New Quotation Request:", validatedFields.data);

  try {
    const aiAnalysis = await analyzeQuoteRequest({
      projectDetails: projectDetails,
      selectedServices: services,
      budgetRange: budget,
    });
    
    // The AI analysis is for internal use.
    console.log("AI Analysis for Studio Staff:", aiAnalysis);
    // You could email this to the studio, save to a CRM, etc.

  } catch (error) {
    console.error("AI analysis failed:", error);
    // Continue without AI analysis if it fails
  }

  return { success: "Quote request sent successfully!" };
}

export async function handleContact(data: z.infer<typeof contactSchema>) {
  const validatedFields = contactSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  // Here you would typically save to a database or send an email.
  console.log("New Contact Message:", validatedFields.data);

  return { success: "Message sent successfully!" };
}
