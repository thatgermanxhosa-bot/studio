
'use server';

import { z } from 'zod';
import {
  bookingSchema,
  contactSchema,
  weddingEnquirySchema,
  quotationSchema,
} from './schemas';
import { analyzeQuoteRequest } from '@/ai/flows/intelligent-quote-request-processing';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// --- Firebase Admin Initialization ---
let db: admin.firestore.Firestore | null = null;

const serviceAccount = {
  "type": "service_account",
  "project_id": "ps-website-99571379-b95c6",
  "private_key_id": "8680f2ed099499c47600c11bb7f8421239e27388",
  "private_key": `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCryIYbVxyh3aV6
BTIs0GPAfkuMYpNanla/0FMMNfNF68jzHRLG3ttsb2V5xJvpTBe4zcYM1dBVl9xy
uGAMQxOAfh8wX+4xSCIryBv1aHBY5th4FM75SEJB+JP3Oz6ox3XDXiHq94hp0weS
vQn7CE8fDx2UhfyevoK2Pjjv25lPN1mc6QKjK8CKMcSgZntr5Bw4OSMRmtMlMKG/
6pxBeMzmBqoh8to50b7zulcmXupWL4TcvGRGoWwpwCQUtZydZ9br2Uta9pUD4W3I
FcsLZjWvl5yGqeKLFGkA2hk5U8B0mwRK9LcHu3NB/7Prk2Gyo4bYoBp9CAwykYnv
RWKQFDOdAgMBAAECggEAIEUS1jt6zDh2L7Ierxb1ijFfcU+KRVVlz/IrS6mt2cZ1
kR/2yUePmjLh8eo6bKzH7wYuzHX1BUM6HQ3gMyV9mh93Le/zb6wQiT916xeztSum
YgZsrB0EH176MtEdD/kqOOlrvzdBV7nWHB1pbNAuhtPg12gFIPACX4hYS0yqI9xf
PoBPbe4sB3tt2NvNO4u4gNV2XLhhpI8rBwSgF0pqVkHc2b6hzQL00z+5Dzt5WHkL
cb6j4n/AeKSpc8a6XJ3jkflXU5AoPWcDEUboZGzIwraJIjGIz6dvca43tFATNX0J
X2h9TssH9hgwqMAoVfNDA4MzYCfv3EOaUNp9r0O6kQKBgQDvQyfNdn6PXl2zCyP5
xM9frmEd5+SYS4KrKkJgqHJNwaFKKeQhN6o5IyQqwMdF2XEDMgkN6g28IriQk5xf
uzXBEI9IB+8DYnz3GtFKWSdc4BMMYmw/7YDqUbBILLXJFjD/qTjw719KAxiDSMA6
z/jkmDLfNuyY4h5pf9R7ZM7ycQKBgQC3zOp4OZUREo3d1Mrwaj50Efzs6HyGMtUf
J64Fi6ebF0VVlIRdHeYLu/U+CUmB6xr3/S2actrVuVSAZq5n5Nt1fF3MI5qgyGbk
U/KQ0KnWqefeMTZ0vCC3Fzk3iXqpr7QANCw+dzcTL5XNXzjf0djtWpYVaorNSnY5
LQYaskhR7QKBgCtD/o+V7N7qFpGI4zGIWGOZ+e/ZfinYBcID+0rVSw4qhIsPtjQX
nh82bQDAG+kH0Rw5n3uFIQMGTmcJzHuTkypyl7PL+lEcNaUGZ9Ny38HlH/8nOhnqs
7RHyQalbhGfffm7M4AIZlyagFq+u2SwJbZ2QtCpPGUuwIAW92uORYCbRAoGASxjN
oCuezWfwUPe1pz8xn0kON1nSLx6r11vmDVv/Mi3y5UGWR1mE+bxlOmCfCRcfYL2w
GU/eO77KWOAbWFW4mSskQ9k0P4dCCv6FuEeZbRzkoPMolc+b6lLxzNA+LwCcIg0v
GqKo/QzPPyct3L0nzeraMYvjhHdtEHVl7hhz1g0CgYEAkGgTQNr4pLcIDyy73JD2
Jh6rxqYth7D0xWBZG3UwALewThcQzheyn1Dz/iI+ivDLOiZGNr2JwsvawxuG/QPs
JtBySnJKc3fBKlFIiwA0JcF+I7psVPOFA+KQwl9Tb09wM6FaAT9MmNQwfIcTEVS/
UmDVVvgxzsbjdgLKssV7pPk=
-----END PRIVATE KEY-----`,
  "client_email": "firebase-adminsdk-fbsvc@ps-website-99571379-b95c6.iam.gserviceaccount.com",
  "client_id": "102434127362694597145",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ps-website-99571379-b95c6.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

if (!admin.apps.length) {
  try {
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
// ------------------------------------

async function serverSaveSubmission(
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

async function serverHandleQuotation(
  data: z.infer<typeof quotationSchema>
) {
  const validatedFields = quotationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid data' };
  }

  await serverSaveSubmission('quotation', validatedFields.data);

  // TODO: Send email to 'bookings@pichulikstudios.co.za' with the quotation request details.
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

async function serverHandleContact(data: z.infer<typeof contactSchema>) {
    const validatedFields = contactSchema.safeParse(data);

    if (!validatedFields.success) {
        return { error: "Invalid data" };
    }

    await serverSaveSubmission('contact', validatedFields.data);

    // TODO: Send email to 'bookings@pichulikstudios.co.za' with the contact message details.
    console.log("New Contact Message:", validatedFields.data);

    return { success: "Message sent successfully!" };
}

async function serverHandlePersonalBooking(data: z.infer<typeof weddingEnquirySchema>) {
    const validatedFields = weddingEnquirySchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid data" };
    }
    
    await serverSaveSubmission('wedding', validatedFields.data);

    // TODO: Send email to 'bookings@pichulikstudios.co.za' with the wedding enquiry details.
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

async function serverCreateYocoCheckout(data: z.infer<typeof yocoCheckoutSchema>) {
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

async function serverHandlePaymentSuccess(checkoutId: string) {
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
  
        // TODO: Send email notification to 'bookings@pichulikstudios.co.za' about the successful payment.
  
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


export async function handleBooking(data: z.infer<typeof bookingSchema>) {
  const validatedFields = bookingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid data' };
  }

  // TODO: Send email to 'bookings@pichulikstudios.co.za' with the booking details.
  console.log('New Booking Request:', validatedFields.data);

  return { success: 'Booking request sent successfully!' };
}

export async function handleQuotation(data: z.infer<typeof quotationSchema>) {
  return serverHandleQuotation(data);
}

export async function handleContact(data: z.infer<typeof contactSchema>) {
  return serverHandleContact(data);
}

export async function handlePersonalBooking(
  data: z.infer<typeof weddingEnquirySchema>
) {
  return serverHandlePersonalBooking(data);
}

export async function createYocoCheckout(data: z.infer<any>) {
  return serverCreateYocoCheckout(data);
}

export async function handlePaymentSuccess(checkoutId: string) {
  return serverHandlePaymentSuccess(checkoutId);
}
