
import { WeddingEnquiryForm } from "./form";

export default function WeddingEnquiryPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black animate-fade-in-up">
            Your Wedding Story Starts Here
          </h1>
           <p className="mt-4 text-lg max-w-2xl mx-auto text-white/80 animate-fade-in-up animation-delay-200">
            Tell us about your vision for the big day. Fill out the form below to begin the conversation, and we'll get back to you promptly to confirm our availability and discuss how we can best capture your story.
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
