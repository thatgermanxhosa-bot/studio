
import { BookingForm } from "./booking-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black animate-fade-in-up">
            Let's Capture Your Moment
          </h1>
           <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80 animate-fade-in-up animation-delay-200">
            Tell us a little about your special occasion. Fill out the form below to request a date, and we'll get back to you promptly to confirm our availability and discuss the details.
          </p>
        </div>
      </section>

      <section className="pb-20 pt-10 animate-fade-in-up animation-delay-400">
        <div className="container max-w-3xl">
          <BookingForm />
        </div>
      </section>
      
      <section className="pb-20">
        <div className="container max-w-3xl">
          <Card className="bg-black/75 border-primary/50 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Planning a Wedding?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-6">
                We have a dedicated enquiry form for wedding photography and videography. Let's start planning your big day.
              </p>
              <Button asChild size="lg">
                <Link href="/for-personal/wedding-enquiry">
                  Go to Wedding Enquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

    