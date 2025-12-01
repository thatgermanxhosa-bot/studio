
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { ContactForm } from "./contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";


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
            <h1 className="text-4xl md:text-5xl font-black mb-4 animate-fade-in-up">Have Questions?</h1>
            <h2 className="text-3xl font-bold animate-fade-in-up animation-delay-200">Let's talk.</h2>
            <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-400">
              Planning a special event or have a unique idea in mind? We'd love to hear about it.
            </p>
             <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-600">
              Reach out to discuss how we can bring your vision to life.
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

      <section className="pb-20 space-y-8">
        <div className="container max-w-3xl">
          <Card className="bg-black/75 border-primary/50 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Planning a Wedding?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-6">
                We have a dedicated enquiry form for wedding photography and videography. Let's start planning your big day.
              </p>
              <Button asChild size="lg">
                <Link href="/for-personal/wedding-enquiry">
                  Wedding Enquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
