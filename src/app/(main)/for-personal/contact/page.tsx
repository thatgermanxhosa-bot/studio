
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";

const contactDetails = [
  { icon: <Mail className="size-6 text-primary" />, title: "Email", value: "info@pichulikstudios.co.za" },
  { icon: <Phone className="size-6 text-primary" />, title: "Phone", value: "+27 21 123 4567" },
  { icon: <MapPin className="size-6 text-primary" />, title: "Studio", value: "123 Loop Street, Cape Town, 8001" },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Contact Us</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold">Let's Work Together</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have a project in mind? We'd love to hear about it. Reach out to us via the form or through our contact details below.
            </p>
            <div className="mt-8 space-y-6">
              {contactDetails.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full mt-1">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground">{item.value}</p>
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
    </>
  );
}
