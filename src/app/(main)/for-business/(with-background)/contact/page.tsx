
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";

const contactDetails = [
  { icon: <Mail className="size-6 text-primary" />, title: "Email", value: "info@pichulikstudios.co.za" },
  { icon: <Phone className="size-6 text-primary" />, title: "Phone", value: "+27 71 525 2337" },
  { icon: <MapPin className="size-6 text-primary" />, title: "Studio", value: "121 Pretoria Ave, Sandown, Sandton, 2196" },
];

export default function ContactPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="pt-32 pb-16">
        <div className="container grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Not Sure Where to Start?</h1>
            <h2 className="text-3xl font-bold">That's what we're here for.</h2>
            <p className="mt-4 text-lg text-white/80">
              Whether you have a detailed brief or just a general goal, we'd love to chat.
            </p>
             <p className="mt-4 text-lg text-white/80">
              Let's talk through your ideas and help you map out the best creative path forward. Reach out via the form or our details below.
            </p>
            <div className="mt-8 space-y-6">
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

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
