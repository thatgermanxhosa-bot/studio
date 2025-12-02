
import type { Metadata } from 'next';
import { WeddingEnquiryForm } from "./form";

export const metadata: Metadata = {
  title: 'Wedding Enquiry | Pichulik Studios',
  description: 'Your forever story deserves to be told beautifully. Tell us everything—your dreams, your plans, the little details that make your story unique.',
};

export default function WeddingEnquiryPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black animate-fade-in-up">
            Your Forever Story Deserves to Be Told Beautifully
          </h1>
           <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80 animate-fade-in-up animation-delay-200">
            This is more than just a day; it's the beginning of your forever. It’s the quiet moments, the joyful tears, the epic celebrations, and all the love that fills the air. We believe in capturing the real, unfiltered story of your wedding day so you can relive the magic for a lifetime. Tell us everything—your dreams, your plans, the little details that make your story unique. We can't wait to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-20 pt-10 animate-fade-in-up animation-delay-400">
        <div className="container max-w-3xl">
          <WeddingEnquiryForm />
        </div>
      </section>
    </div>
  );
}
