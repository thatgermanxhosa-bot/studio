
import { QuotationForm } from "./quotation-form";

export default function QuotationPage() {
  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Get a Quote</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-4xl">
          <QuotationForm />
        </div>
      </section>
    </>
  );
}
