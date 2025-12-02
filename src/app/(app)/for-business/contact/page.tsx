
import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: 'Contact Us | For Business | Pichulik Studios',
  description: 'Not sure where to start? We can help. Reach out to discuss your project, whether you have a detailed brief or just a general goal.',
};

const contactDetails = [
  { icon: <Mail className="size-6 text-primary" />, title: "Email", value: "info@pichulikstudios.co.za" },
  { icon: <Phone className="size-6 text-primary" />, title: "Phone", value: "+27 71 525 2337" },
  { icon: <MapPin className="size-6 text-primary" />, title: "Studio", value: "121 Pretoria Ave, Sandown, Sandton, 2196" },
];

export default function ContactPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="pt-48 pb-16">
        <div className="container grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-black mb-4 animate-fade-in-up">Not Sure Where To Start?</h1>
            <h2 className="text-3xl font-bold animate-fade-in-up animation-delay-200">That's What We're Here For.</h2>
            <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-400">
              Whether you have a detailed brief or just a general goal, we'd love to chat.
            </p>
             <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-600">
              Let's talk through your ideas and help you map out the best creative path forward. Reach out via the form or our details below.
            </p>
            <div className="mt-8 space-y-6 animate-fade-in-up animation-delay-800">
              {contactDetails.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-white/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 animate-fade-in-up animation-delay-1000">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
