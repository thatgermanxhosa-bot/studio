
import type { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Video, Camera, Scissors, Award, Users, FastForward, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Us | For Business | Pichulik Studios',
  description: 'We translate business goals into compelling visual stories. A boutique video studio helping your business connect, engage, and grow with strategic, beautiful content.',
};

const services = [
  {
    icon: <Video className="size-8 text-primary" />,
    title: "Strategic Video Production",
    description: "Professional video content that tells your brand story, engages your audience, and drives results.",
  },
  {
    icon: <Camera className="size-8 text-primary" />,
    title: "Corporate & Commercial Photography",
    description: "High-quality photography for products, company headshots, events, and brand campaigns.",
  },
  {
    icon: <Scissors className="size-8 text-primary" />,
    title: "Full-Service Post-Production",
    description: "Expert editing, color grading, and sound design to give your content a professional edge.",
  },
  {
    icon: <Award className="size-8 text-primary" />,
    title: "Motion Graphics & Animation",
    description: "Eye-catching 2D & 3D graphics and animations to explain complex ideas and capture attention.",
  },
];

const whyPartnerItems = [
    {
        icon: <Users className="size-8 mb-2 text-primary" />,
        title: "Strategic B2B Focus",
        description: "We are business-minded. Our creative is always tied to a clear objective, whether it's building brand awareness, generating leads, or educating your audience."
    },
    {
        icon: <Award className="size-8 mb-2 text-primary" />,
        title: "Proven Experience & Quality",
        description: "We bring over 5+ years of proven experience to every project. We obsess over the details and guarantee quality in every frame so you don't have to."
    },
    {
        icon: <FastForward className="size-8 mb-2 text-primary" />,
        title: "A Partnership, Not a Process",
        description: "We believe in clear communication and reliable execution. Our efficient, collaborative workflows respect your deadlines and make the creative process seamless."
    }
];

const partnershipProcess = [
  {
    step: "01",
    title: "Discovery",
    description: "We begin with a deep dive into your goals, audience, and key message. This is the strategic foundation for the entire project."
  },
  {
    step: "02",
    title: "Pre-Production",
    description: "This is the blueprint for success. We handle all the planning, from scripting and storyboarding to location scouting and scheduling."
  },
  {
    step: "03",
    title: "Production",
    description: "Our professional crew brings the approved concept to life, capturing all the visual and audio elements with creative and technical excellence."
  },
  {
    step: "04",
    title: "Post-Production",
    description: "This is where the story comes together. Our editors craft the narrative, complete with expert color grading, sound design, and motion graphics."
  },
  {
    step: "05",
    title: "Review & Delivery",
    description: "We present the final cut for your approval, make any revisions, and deliver the final, high-impact assets in all the formats you need."
  }
];


export default function AboutUsPage() {
  return (
    <div className="relative z-10 flex-grow text-white">
        <section className="py-16 md:py-24 pt-40 md:pt-48">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight animate-fade-in-up">We Translate Business Goals Into Compelling Visual Stories</h1>
                <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
                    We are a boutique video studio built for one purpose: to help your business connect, engage, and grow. In today's market, "good enough" content gets ignored. We founded our studio on the belief that B2B creative shouldn't be boring. It should be strategic, beautiful, and built to achieve a goal.
                </p>
                <p className="text-muted-foreground text-lg max-w-5xl mx-auto text-center text-white/80 animate-fade-in-up animation-delay-400">
                    We are a dedicated, hands-on team of directors, editors, and artists. We partner with brands to provide a bespoke service, from the initial strategic brief to the final polished cut. Whether you need a powerful brand film, a clear product showcase, or engaging content for your next campaign, we are your creative partner.
                </p>
            </div>
        </section>

        <section className="py-10 md:py-16">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto space-y-12">
                    <Card className="bg-black/75 border-white/20 p-6 md:p-8 animate-fade-in-up animation-delay-600">
                        <CardHeader>
                          <CardTitle className="text-2xl md:text-3xl font-bold">What We Do Best</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-6">
                              {services.map((service, index) => (
                                  <Card key={service.title} className="bg-black/75 border-white/20 hover:border-primary/80 transition-all duration-300 hover:-translate-y-1">
                                      <CardHeader>
                                          <CardTitle className="flex items-center gap-4">
                                              {service.icon}
                                              <span className="text-xl">{service.title}</span>
                                          </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                          <p className="text-white/80">{service.description}</p>
                                      </CardContent>
                                  </Card>
                              ))}
                          </div>
                        </CardContent>
                        <CardFooter className="pt-6 justify-end">
                            <Button asChild variant="ghost" className="text-white hover:text-white hover:bg-white/10">
                                <Link href="/for-business/our-work">
                                    See Our Work
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-black/75 border-white/20 p-6 md:p-8 animate-fade-in-up animation-delay-800">
                        <CardHeader>
                            <CardTitle className="text-2xl md:text-3xl font-bold">Why Partner With Us?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {whyPartnerItems.map((item, index) => (
                                <div key={item.title}>
                                    <h3 className="font-bold text-lg flex items-center gap-3">
                                        {item.icon} {item.title}
                                    </h3>
                                    <p className="text-white/80 mt-1">{item.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-black/75 border-white/20 p-6 md:p-8 animate-fade-in-up animation-delay-1000">
                      <CardHeader className="text-center mb-8">
                          <CardTitle className="text-3xl font-bold">Our Partnership Workflow</CardTitle>
                          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                            We manage every detail, from initial strategy to final delivery, so you can focus on the results.
                          </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                            {partnershipProcess.slice(0, 3).map((item, index) => (
                              <div key={item.step} className="flex gap-6">
                                <div className="text-4xl font-black text-primary/40 mt-1">{item.step}</div>
                                <div>
                                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                  <p className="text-white/80">{item.description}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start md:justify-center md:max-w-3xl mx-auto">
                            {partnershipProcess.slice(3).map((item, index) => (
                              <div key={item.step} className="flex gap-6">
                                <div className="text-4xl font-black text-primary/40 mt-1">{item.step}</div>
                                <div>
                                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                  <p className="text-white/80">{item.description}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                </div>

                <div className="mt-16 text-center p-8 md:p-12 animate-fade-in-up">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Elevate Your Brand's Story?</h2>
                    <p className="max-w-2xl mx-auto text-white/80 text-lg mb-8">
                        Let's discuss your next project.
                    </p>
                    <Button asChild size="lg" className="uppercase font-bold tracking-widest px-8">
                        <Link href="/for-business/quotation">Get a Quote</Link>
                    </Button>
                </div>
            </div>
        </section>
    </div>
  );
}
