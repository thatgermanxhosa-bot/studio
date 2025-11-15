
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Camera, CheckCircle2, Scissors, Video } from "lucide-react";

const services = [
  {
    icon: <Video className="size-8 text-primary" />,
    title: "Videography",
    description: "From corporate films to dynamic social content, we produce high-definition video that captures your story.",
  },
  {
    icon: <Camera className="size-8 text-primary" />,
    title: "Photography",
    description: "Product, lifestyle, and editorial photography that builds your brand's visual identity with striking imagery.",
  },
  {
    icon: <Scissors className="size-8 text-primary" />,
    title: "Post-Production",
    description: "Expert editing, color grading, and sound design to transform raw footage into a polished, final product.",
  },
];

const partnershipPerks = [
  { text: "Bespoke Strategies: Every project is unique. We develop tailored creative solutions that align perfectly with your goals." },
  { text: "Uncompromising Quality: We combine high-end equipment with a meticulous attention to detail at every stage of production." },
  { text: "Collaborative Process: We work *with* you, maintaining clear communication to ensure your vision is brought to life seamlessly." },
];

export default function ForBusinessPage() {
  const teamImage = PlaceHolderImages.find(p => p.id === 'team-in-action');

  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">For Business</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We partner with brands to create compelling visual narratives that drive engagement and deliver results.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center border-border/60 hover:border-primary/80 transition-colors hover:bg-accent/20">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">{service.icon}</div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Partner With Us?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Choosing a creative partner is a decision about trust, vision, and execution. We don't just create content; we build relationships and deliver results.
            </p>
            <ul className="space-y-6">
              {partnershipPerks.map((perk, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="size-6 text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground">{perk.text}</span>
                </li>
              ))}
            </ul>
          </div>
          {teamImage && (
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={teamImage.imageUrl} 
                alt={teamImage.description} 
                fill 
                className="object-cover"
                data-ai-hint={teamImage.imageHint}
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Elevate Your Brand?</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground mb-8">
            Let's discuss your next project and how we can help you make stories that move.
          </p>
          <Button asChild size="lg" className="uppercase font-bold tracking-widest px-8">
            <Link href="/quotation">Get a Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
