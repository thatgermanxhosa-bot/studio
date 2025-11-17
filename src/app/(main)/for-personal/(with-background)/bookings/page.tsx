
import { BookingForm } from "./booking-form";

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
    </div>
  );
}
