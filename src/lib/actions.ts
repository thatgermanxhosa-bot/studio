
"use server";

import { z } from "zod";
import { bookingSchema, contactSchema, quotationSchema, weddingEnquirySchema } from "./schemas";
import { analyzeQuoteRequest } from "@/ai/flows/intelligent-quote-request-processing";
import { db } from "./firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

const NOTIFICATION_EMAIL = "bookings@pichulikstudios.co.za";

async function saveSubmission(type: 'contact' | 'quotation' | 'wedding' | 'payment', data: any) {
  if (!db) {
    console.error("Firestore is not initialized. Skipping submission save.");
    return;
  }
  try {
    await db.collection("submissions").add({
      type,
      data,
      createdAt: FieldValue.serverTimestamp(),
    });
    console.log(`Submission of type '${type}' saved to Firestore.`);
  } catch (error) {
    console.error("Error saving submission to Firestore:", error);
    // Decide if you want to throw the error or just log it
  }
}

export async function handleBooking(data: z.infer<typeof bookingSchema>) {
  const validatedFields = bookingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }
  
  // TODO: Send email to NOTIFICATION_EMAIL with the booking details.
  console.log("New Booking Request:", validatedFields.data);

  return { success: "Booking request sent successfully!" };
}

export async function handlePersonalBooking(data: z.infer<typeof weddingEnquirySchema>) {
    const weddingValidatedFields = weddingEnquirySchema.safeParse(data);
    if (!weddingValidatedFields.success) {
      return { error: "Invalid data" };
    }
    
    await saveSubmission('wedding', weddingValidatedFields.data);

    // TODO: Send email to NOTIFICATION_EMAIL with the wedding enquiry details.
    console.log("New Wedding Enquiry:", weddingValidatedFields.data);
    return { success: "Wedding enquiry sent successfully!" };
}


export async function handleQuotation(data: z.infer<typeof quotationSchema>) {
  const validatedFields = quotationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid data" };
  }

  const { projectDetails, services, budget, ...contactInfo } = validatedFields.data;

  await saveSubmission('quotation', validatedFields.data);

  // TODO: Send email to NOTIFICATION_EMAIL with the quotation request details.
  console.log("New Quotation Request:", validatedFields.data);

  try {
    const aiAnalysis = await analyzeQuoteRequest({
      projectDetails: projectDetails,
      selectedServices: services,
      budgetRange: budget,
    });
    
    // The AI analysis is for internal use.
    // TODO: Include this AI analysis in the email sent to the studio, or save it to the submission document.
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

  await saveSubmission('contact', validatedFields.data);

  // TODO: Send email to NOTIFICATION_EMAIL with the contact message details.
  console.log("New Contact Message:", validatedFields.data);

  return { success: "Message sent successfully!" };
}

const yocoCheckoutSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  itemName: z.string(),
  bookingDate: z.date().optional(),
});

export async function createYocoCheckout(data: z.infer<typeof yocoCheckoutSchema>) {
  const validatedFields = yocoCheckoutSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid payment data." };
  }
  
  const yocoSecretKey = process.env.YOCO_SECRET_KEY;
  if (!yocoSecretKey || !(yocoSecretKey.startsWith('sk_test_') || yocoSecretKey.startsWith('sk_live_'))) {
    console.error("Yoco secret key is not configured or invalid.");
    return { error: "Payment provider is not configured correctly." };
  }

  const { amount, currency, itemName, bookingDate } = validatedFields.data;

  const metadata: { [key: string]: string } = {
    itemName: itemName,
  };
  if (bookingDate) {
    metadata.bookingDate = bookingDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

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
        metadata,
        // After payment, Yoco redirects the user. The success page should then trigger the booking notification.
        // TODO: On the success page, verify the payment and save the submission to firestore.
        // Then, send a notification to NOTIFICATION_EMAIL.
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

export async function handlePaymentSuccess(checkoutId: string) {
  if (!db) {
    console.error("Firestore is not initialized.");
    return { error: "Could not process payment confirmation." };
  }

  const yocoSecretKey = process.env.YOCO_SECRET_KEY;
  if (!yocoSecretKey) {
    console.error("Yoco secret key is not configured.");
    return { error: "Payment provider is not configured correctly." };
  }

  try {
    // 1. Verify the checkout with Yoco
    const response = await fetch(`https://payments.yoco.com/api/checkouts/${checkoutId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${yocoSecretKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Yoco API Error verifying payment:", errorData);
      return { error: "Failed to verify payment with provider." };
    }

    const checkoutData = await response.json();

    // 2. Check if payment was successful
    if (checkoutData.status === 'completed') {
      // 3. Save submission to Firestore
      await saveSubmission('payment', checkoutData);

      // 4. Send email notification
      // TODO: Send email to NOTIFICATION_EMAIL with the successful payment and booking details.
      console.log("Successful Payment Recorded:", checkoutData);

      return { success: true, data: checkoutData };
    } else {
      // Handle other statuses if necessary (e.g., 'processing', 'failed')
      console.warn(`Payment status for checkout ${checkoutId} is '${checkoutData.status}'.`);
      return { error: "Payment was not completed successfully." };
    }
  } catch (error) {
    console.error("Error handling payment success:", error);
    return { error: "An unexpected error occurred while confirming your payment." };
  }
}
