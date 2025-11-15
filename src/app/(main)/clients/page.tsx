
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const clientLogos = [
  "Client Logo 1",
  "Client Logo 2",
  "Client Logo 3",
  "Client Logo 4",
  "Client Logo 5",
  "Client Logo 6",
];

const testimonials = [
  {
    quote: "Working with Pichulik Studios was a seamless experience. They understood our vision perfectly and delivered beyond our expectations.",
    author: "Jane Doe",
    title: "Marketing Director, Brand A",
  },
  {
    quote: "The quality of the final product was outstanding. Their team is professional, creative, and incredibly talented. Highly recommend.",
    author: "John Smith",
    title: "Founder, Startup B",
  },
  {
    quote: "From start to finish, the process was collaborative and efficient. The results speak for themselves. We'll be back for our next project.",
    author: "Emily White",
    title: "Creative Lead, Agency C",
  }
];

export default function ClientsPage() {
  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Our Clients</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10 text-muted-foreground uppercase tracking-widest">Trusted By</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex justify-center items-center h-24 p-4 bg-card/50 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                <span className="text-muted-foreground font-semibold">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What They Say</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-1 h-full">
                    <Card className="h-full flex flex-col justify-between bg-background">
                      <CardContent className="p-6">
                        <blockquote className="border-l-4 border-primary pl-4 text-lg italic text-foreground/80 mb-6">
                          {testimonial.quote}
                        </blockquote>
                        <div>
                          <p className="font-bold text-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
    </>
  );
}
