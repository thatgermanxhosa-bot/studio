
import { BookingForm } from "./booking-form";

export default function BookingsPage() {
  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Book a Session</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
