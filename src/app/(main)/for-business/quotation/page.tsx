
import { QuotationForm } from "./quotation-form";

export default function QuotationPage() {
  return (
    <div className="relative z-10">
      <section className="bg-transparent pt-32 pb-12 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Ready to Elevate Your Brand's Story?</h1>
           <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80">
            Let's start the partnership. Tell us about your project and business goals, and we'll get back to you with a tailored proposal.
          </p>
        </div>
      </section>

      <section className="pb-20 pt-10">
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <QuotationForm />
            </div>
        </div>
      </section>
    </div>
  );
}
