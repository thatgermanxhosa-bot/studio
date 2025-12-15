
'use client';

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';
import { createYocoCheckout } from '@/lib/actions';

interface YocoCheckoutButtonProps {
  amount: number;
  currency: string;
  itemName: string;
}

export function YocoCheckoutButton({ amount, currency, itemName }: YocoCheckoutButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleCheckout = async () => {
    startTransition(async () => {
      const result = await createYocoCheckout({
          amount,
          currency,
          itemName,
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
      disabled={isPending}
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
