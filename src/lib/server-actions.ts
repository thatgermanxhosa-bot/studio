
'use server';

import { z } from 'zod';
import { quotationSchema, contactSchema, weddingEnquirySchema } from './schemas';
import { analyzeQuoteRequest } from '@/ai/flows/intelligent-quote-request-processing';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization ---
let db: admin.firestore.Firestore | null = null;

const serviceAccountString = process.env.FIREBASE_ADMIN_SDK_CONFIG;

if (serviceAccountString) {
  if (!admin.apps.length) {
    try {
      const serviceAccount = JSON.parse(serviceAccountString);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      db = admin.firestore();
    } catch (error) {
      console.error('Firebase admin initialization error:', error);
    }
  } else {
    db = admin.firestore();
  }
} else {
    console.warn("Firebase Admin SDK not initialized. Service account key is missing or invalid.");
}
// ------------------------------------


const NOTIFICATION_EMAIL = 'bookings@pichulikstudios.co.za';

export async function serverSaveSubmission(
  type: 'contact' | 'quotation' | 'wedding' | 'payment',
  data: any
) {
  if (!db) {
    console.error('Firestore is not initialized. Skipping submission save.');
    return;
  }
  try {
    const docRef = await db.collection('submissions').add({
      type,
      data,
      createdAt: FieldValue.serverTimestamp(),
    });
    console.log(
      `Submission of type '${type}' saved to Firestore with ID: ${docRef.id}.`
    );
    return docRef.id;
  } catch (error) {
    console.error('Error saving submission to Firestore:', error);
  }
}

export async function serverHandleQuotation(
  data: z.infer<typeof quotationSchema>
) {
  const validatedFields = quotationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid data' };
  }

  await serverSaveSubmission('quotation', validatedFields.data);

  // TODO: Send email to NOTIFICATION_EMAIL with the quotation request details.
  console.log('New Quotation Request:', validatedFields.data);

  try {
    const { projectDetails, services, budget } = validatedFields.data;
    const aiAnalysis = await analyzeQuoteRequest({
      projectDetails: projectDetails,
      selectedServices: services,
      budgetRange: budget,
    });
    console.log('AI Analysis for Studio Staff:', aiAnalysis);
    // TODO: Include this AI analysis in the email sent to the studio.
  } catch (error) {
    console.error('AI analysis failed:', error);
  }

  return { success: 'Quote request sent successfully!' };
}

export async function serverHandleContact(data: z.infer<typeof contactSchema>) {
    const validatedFields = contactSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Invalid data" };
    }

    await serverSaveSubmission('contact', validatedFields.data);

    // TODO: Send email to NOTIFICATION_EMAIL with the contact message details.
    console.log("New Contact Message:", validatedFields.data);

    return { success: "Message sent successfully!" };
}

export async function serverHandlePersonalBooking(data: z.infer<typeof weddingEnquirySchema>) {
    const validatedFields = weddingEnquirySchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid data" };
    }
    
    await serverSaveSubmission('wedding', validatedFields.data);

    // TODO: Send email to NOTIFICATION_EMAIL with the wedding enquiry details.
    console.log("New Wedding Enquiry:", validatedFields.data);
    return { success: "Wedding enquiry sent successfully!" };
}


const yocoCheckoutSchema = z.object({
    amount: z.number(),
    currency: z.string(),
    itemName: z.string(),
    bookingDate: z.date().optional(),
    name: z.string(),
    email: z.string(),
    phone: z.string().optional(),
});

export async function serverCreateYocoCheckout(data: z.infer<typeof yocoCheckoutSchema>) {
    const validatedFields = yocoCheckoutSchema.safeParse(data);
  
    if (!validatedFields.success) {
      return { error: "Invalid payment data." };
    }
    
    const yocoSecretKey = process.env.YOCO_SECRET_KEY;
    if (!yocoSecretKey || !(yocoSecretKey.startsWith('sk_test_') || yocoSecretKey.startsWith('sk_live_'))) {
      console.error("Yoco secret key is not configured or invalid.");
      return { error: "Payment provider is not configured correctly." };
    }
  
    const { amount, currency, itemName, bookingDate, name, email, phone } = validatedFields.data;
  
    const metadata: { [key: string]: string | undefined } = {
      itemName: itemName,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
    };
    if (bookingDate) {
      metadata.bookingDate = bookingDate.toISOString().split('T')[0];
    }
  
    try {
      const submissionId = await serverSaveSubmission('payment', {
          status: 'pending',
          amount: amount,
          currency: currency,
          itemName: itemName,
          ...metadata,
      });
      
      if (submissionId) {
          metadata.submissionId = submissionId;
      }
  
  
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
          successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success`,
          cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/for-personal/services`,
          failureUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/for-personal/services`,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Yoco API Error:", errorData);
        if (submissionId && db) {
          await db.collection('submissions').doc(submissionId).update({ 'data.status': 'failed', 'data.yocoError': errorData });
        }
        return { error: `Failed to create payment session: ${errorData.message || 'Unknown error'}` };
      }
  
      const checkoutData = await response.json();
      
      if (submissionId && db) {
          await db.collection('submissions').doc(submissionId).update({ 'data.status': 'initiated', 'data.checkoutId': checkoutData.id });
      }
  
      return { redirectUrl: checkoutData.redirectUrl };
  
    } catch (error) {
      console.error("Error creating Yoco checkout:", error);
      return { error: "Could not connect to payment provider. Please try again later." };
    }
}

export async function serverHandlePaymentSuccess(checkoutId: string) {
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
      const submissionId = checkoutData.metadata?.submissionId;
  
      if (checkoutData.status === 'completed') {
        if (submissionId) {
           await db.collection("submissions").doc(submissionId).update({
               'data.status': 'completed',
               'data.paymentId': checkoutData.paymentId,
               'data.yocoData': checkoutData 
           });
        } else {
          await serverSaveSubmission('payment', checkoutData);
        }
  
        console.log("Successful Payment Recorded:", checkoutData);
  
        return { success: true, data: checkoutData };
      } else {
         if (submissionId) {
           await db.collection("submissions").doc(submissionId).update({
               'data.status': checkoutData.status,
           });
         }
        console.warn(`Payment status for checkout ${checkoutId} is '${checkoutData.status}'.`);
        return { error: `Payment was not completed successfully. Status: ${checkoutData.status}` };
      }
    } catch (error) {
      console.error("Error handling payment success:", error);
      return { error: "An unexpected error occurred while confirming your payment." };
    }
  }
