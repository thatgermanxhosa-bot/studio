
'use server';

import { z } from 'zod';
import { bookingSchema, contactSchema, weddingEnquirySchema, quotationSchema } from './schemas';
import {
  serverSaveSubmission,
  serverHandleQuotation,
  serverHandleContact,
  serverHandlePersonalBooking,
  serverCreateYocoCheckout,
  serverHandlePaymentSuccess,
} from './server-actions';

export async function handleBooking(data: z.infer<typeof bookingSchema>) {
  const validatedFields = bookingSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: 'Invalid data' };
  }

  // TODO: Send email to NOTIFICATION_EMAIL with the booking details.
  console.log('New Booking Request:', validatedFields.data);

  return { success: 'Booking request sent successfully!' };
}

export async function handleQuotation(
  data: z.infer<typeof quotationSchema>
) {
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

export async function createYocoCheckout(
  data: z.infer<any>
) {
    return serverCreateYocoCheckout(data);
}

export async function handlePaymentSuccess(checkoutId: string) {
    return serverHandlePaymentSuccess(checkoutId);
}
