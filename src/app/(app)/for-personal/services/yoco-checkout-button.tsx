
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

interface YocoCheckoutButtonProps {
  amount: number;
  currency: string;
  itemName: string;
}

// Extend the Window interface to include Yoco
declare global {
  interface Window {
    YocoSDK: any;
  }
}

export function YocoCheckoutButton({ amount, currency, itemName }: YocoCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const yocoPublicKey = process.env.NEXT_PUBLIC_YOCO_PUBLIC_KEY;

  useEffect(() => {
    if (!yocoPublicKey) {
        console.error("Yoco public key is not configured. Please set NEXT_PUBLIC_YOCO_PUBLIC_KEY in your environment variables.");
        setIsLoading(false);
        return;
    }
      
    const script = document.createElement('script');
    script.src = 'https://sdk.yoco.com/js/v1/sdk.js';
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
    };
    script.onerror = () => {
      console.error("Failed to load Yoco SDK.");
      toast({
        title: "Payment Error",
        description: "Could not load the payment provider. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [toast, yocoPublicKey]);

  const handleCheckout = () => {
    if (isLoading || !window.YocoSDK) {
      toast({
        title: "Please wait",
        description: "Payment system is still loading.",
      });
      return;
    }
     if (!yocoPublicKey) {
      toast({
        title: "Configuration Error",
        description: "Payment provider is not configured correctly.",
        variant: "destructive",
      });
      return;
    }


    const yoco = new window.YocoSDK({
      publicKey: yocoPublicKey,
    });

    yoco.showPopup({
      amountInCents: amount,
      currency: currency,
      name: `Pichulik Studios - ${itemName}`,
      description: `Payment for ${itemName} service.`,
      callback: function (result: any) {
        if (result.error) {
          const errorMessage = result.error.message;
          toast({
            title: "Payment Failed",
            description: errorMessage,
            variant: "destructive",
          });
        } else {
          // Payment succeeded
          // You can now POST the chargeToken to your server to finally capture the payment
          // For this example, we'll just show a success message.
          console.log("Card charge token: ", result.id);
          toast({
            title: "Payment Successful!",
            description: "Thank you for your booking. We will be in touch shortly.",
          });
          // router.push('/thank-you');
        }
      },
    });
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      size="lg"
      className="w-full uppercase font-bold tracking-widest"
    >
      {isLoading ? (
        <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
        </>
      ) : (
        "Book & Pay Now"
      )}
    </Button>
  );
}
