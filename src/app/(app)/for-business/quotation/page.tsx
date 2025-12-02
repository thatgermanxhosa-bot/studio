
import type { Metadata } from 'next';
import { QuotationForm } from "./quotation-form";

export const metadata: Metadata = {
  title: 'Get a Quote | For Business | Pichulik Studios',
  description: 'Ready to elevate your brand\'s story? This is where the partnership begins. Get a customised quote for your project.',
};

export default function QuotationPage() {
  return (
    <div className="relative z-10">
      <section className="bg-transparent text-center pt-48">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black animate-fade-in-up">
            Ready To Elevate Your Brand's Story?
          </h1>
           <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80 animate-fade-in-up animation-delay-200">
            This is where the partnership begins. Whether you have a full project brief or just an initial business goal, we're ready to discuss how we can translate your vision into high-impact creative.
          </p>
        </div>
      </section>

      <section className="pb-20 pt-10 animate-fade-in-up animation-delay-400">
        <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
                <QuotationForm />
            </div>
        </div>
      </section>
    </div>
  );
}
