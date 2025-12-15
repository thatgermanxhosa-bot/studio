
'use client';

import { useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { createYocoCheckout } from '@/lib/actions';

interface YocoCheckoutButtonProps {
  amount: number;
  currency: string;
  itemName: string;
  bookingDate?: Date;
  disabled?: boolean;
  customer: {
      name: string;
      email: string;
      phone?: string;
  }
}

export function YocoCheckoutButton({ amount, currency, itemName, bookingDate, disabled, customer }: YocoCheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCheckout = async () => {
    startTransition(async () => {
      const result = await createYocoCheckout({
          amount,
          currency,
          itemName,
          bookingDate,
          name: customer.name,
          email: customer.email,
          phone: customer.phone
      });

      if (result.error) {
        toast({
          title: "Payment Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.redirectUrl) {
        // Redirect the user to the Yoco checkout page
        window.location.href = result.redirectUrl;
      }
    });
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isPending || disabled}
      size="lg"
      className="w-full uppercase font-bold tracking-widest"
    >
      {isPending ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Redirecting...
        </>
      ) : (
        "Book & Pay Now"
      )}
    </Button>
  );
}
