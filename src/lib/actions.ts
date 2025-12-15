
"use server";

import { z } from "zod";
import { bookingSchema, contactSchema, quotationSchema, weddingEnquirySchema } from "./schemas";
import { analyzeQuoteRequest } from "@/ai/flows/intelligent-quote-request-processing";

export async function handleBooking(data: z.infer<typeof bookingSchema>) {
  const validatedFields = bookingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }
  
  // TODO: Implement email sending to noreply@pichulikstudios.co.za
  console.log("New Booking Request:", validatedFields.data);

  return { success: "Booking request sent successfully!" };
}

export async function handlePersonalBooking(data: z.infer<typeof weddingEnquirySchema>) {
    const weddingValidatedFields = weddingEnquirySchema.safeParse(data);
    if (!weddingValidatedFields.success) {
      return { error: "Invalid data" };
    }
    // TODO: Implement email sending to noreply@pichulikstudios.co.za
    console.log("New Wedding Enquiry:", weddingValidatedFields.data);
    return { success: "Wedding enquiry sent successfully!" };
}


export async function handleQuotation(data: z.infer<typeof quotationSchema>) {
  const validatedFields = quotationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { projectDetails, services, budget, ...contactInfo } = validatedFields.data;

  // TODO: Implement email sending to noreply@pichulikstudios.co.za
  console.log("New Quotation Request:", validatedFields.data);

  try {
    const aiAnalysis = await analyzeQuoteRequest({
      projectDetails: projectDetails,
      selectedServices: services,
      budgetRange: budget,
    });
    
    // The AI analysis is for internal use.
    // TODO: Include this AI analysis in the email sent to the studio.
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

  // TODO: Implement email sending to noreply@pichulikstudios.co.za
  console.log("New Contact Message:", validatedFields.data);

  return { success: "Message sent successfully!" };
}

const yocoCheckoutSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  itemName: z.string(),
});

export async function createYocoCheckout(data: z.infer<typeof yocoCheckoutSchema>) {
  const validatedFields = yocoCheckoutSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid payment data." };
  }
  
  const yocoSecretKey = process.env.YOCO_SECRET_KEY;
  if (!yocoSecretKey || !yocoSecretKey.startsWith('sk_')) {
    console.error("Yoco secret key is not configured or invalid.");
    return { error: "Payment provider is not configured correctly." };
  }

  const { amount, currency, itemName } = validatedFields.data;

  try {
    const response = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yocoSecretKey}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency,
        lineItems: [
          {
            displayName: itemName,
            quantity: 1,
            pricingDetails: {
              price: amount,
            }
          }
        ],
        successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
        cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/for-personal/services`,
        failureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/for-personal/services`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Yoco API Error:", errorData);
      return { error: `Failed to create payment session: ${errorData.message || 'Unknown error'}` };
    }

    const checkoutData = await response.json();
    return { redirectUrl: checkoutData.redirectUrl };

  } catch (error) {
    console.error("Error creating Yoco checkout:", error);
    return { error: "Could not connect to payment provider. Please try again later." };
  }
}
