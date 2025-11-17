
import { QuotationForm } from "./quotation-form";

export default function QuotationPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent py-10 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Get a Quote</h1>
           <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
            Tell us about your project, and we'll provide a tailored quote.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <QuotationForm />
            </div>
        </div>
      </section>
    </div>
  );
}
