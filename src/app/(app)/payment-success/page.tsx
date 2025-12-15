
'use client';

import { useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { handlePaymentSuccess } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get('checkoutId');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<any | null>(null);

  useEffect(() => {
    if (checkoutId) {
      startTransition(async () => {
        const result = await handlePaymentSuccess(checkoutId);
        if (result.error) {
          setError(result.error);
        } else {
          setSuccessData(result.data);
        }
      });
    } else {
      setError('No checkout ID found. Payment cannot be verified.');
    }
  }, [checkoutId]);

  const renderContent = () => {
    if (isPending) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <h2 className="text-2xl font-bold">Verifying Payment...</h2>
          <p className="text-white/80">Please wait while we confirm your transaction.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center">
          <XCircle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold">Payment Verification Failed</h2>
          <p className="text-white/80">{error}</p>
           <Button asChild className="mt-6">
                <Link href="/for-personal/services">Return to Services</Link>
            </Button>
        </div>
      );
    }

    if (successData) {
        const { bookingDate, itemName, customerName, customerEmail } = successData.metadata || {};

        return (
            <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p className="text-white/80 max-w-lg mx-auto">
                    Thank you for your booking, {customerName || 'friend'}. Your payment has been confirmed.
                </p>
                {itemName && (
                     <p className="text-white/80 mt-2">
                        Service: <strong>{itemName}</strong>
                    </p>
                )}
                {bookingDate && (
                    <p className="text-white/80 mt-1">
                        Date: <strong>{new Date(bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                    </p>
                )}
                <p className="text-white/70 mt-4 text-sm">
                    A confirmation email has been sent to {customerEmail || 'your email address'}. If you have any questions, please don't hesitate to contact us.
                </p>
                <Button asChild className="mt-6">
                    <Link href="/">Return to Home</Link>
                </Button>
            </div>
        );
    }

    return null;
  };

  return (
    <div className="relative z-10 text-white min-h-screen flex items-center justify-center">
       <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-black/80"></div>
        </div>
      <div className="container max-w-2xl relative z-10">
        <Card className="bg-black/75 border-white/20">
          <CardContent className="p-8 md:p-12">
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
