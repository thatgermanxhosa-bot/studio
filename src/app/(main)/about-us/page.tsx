
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Camera, Scissors, Award, Users, FastForward } from "lucide-react";

const services = [
  {
    icon: <Video className="size-8 text-primary" />,
    title: "Video Production",
    description: "Professional video content that tells your brand story and engages your audience.",
  },
  {
    icon: <Camera className="size-8 text-primary" />,
    title: "Photography",
    description: "High-quality photography for products, events, and corporate needs.",
  },
  {
    icon: <Scissors className="size-8 text-primary" />,
    title: "Post-Production",
    description: "Expert editing and post-production services to polish your content.",
  },
  {
    icon: <Award className="size-8 text-primary" />,
    title: "Graphics & Animation",
    description: "Eye-catching graphics and animations for digital and print media.",
  },
];

const whyPartnerItems = [
    {
        icon: <Users className="size-8 mb-2 text-primary" />,
        title: "B2B Focused",
        description: "Specialized in creating content that drives business results"
    },
    {
        icon: <Award className="size-8 mb-2 text-primary" />,
        title: "Proven Experience",
        description: "5+ years of delivering high-quality visual solutions"
    },
    {
        icon: <FastForward className="size-8 mb-2 text-primary" />,
        title: "Fast Turnaround",
        description: "Efficient workflows to meet your project deadlines"
    }
];

export default function AboutUsPage() {
  return (
    <>
      <main className="flex-grow">
        <section className="py-10 md:py-20 bg-background text-foreground">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-3 gap-16 items-start">
                
                    <div className="lg:col-span-2">
                        <div className="mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">We are a boutique video studio, delivering specialized creative for businesses and individuals.</h1>
                            <p className="text-muted-foreground text-lg">
                                As a dedicated team, we craft high-impact visual stories tailored to your unique goals. From compelling brand films for our B2B partners to capturing personal milestones for private clients, we provide a bespoke service from concept to final cut.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-6 pb-4 border-b border-border">What We Do Best</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {services.map((service) => (
                                    <Card key={service.title} className="bg-card border-border/60 hover:border-primary/80 transition-all duration-300 hover:-translate-y-1">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-4">
                                                {service.icon}
                                                <span className="text-xl">{service.title}</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-muted-foreground">{service.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:sticky top-28">
                        <Card className="bg-card border-border/60">
                            <CardHeader>
                                <CardTitle className="text-2xl">Why Partner With Us?</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {whyPartnerItems.map((item) => (
                                    <div key={item.title}>
                                        <h3 className="font-bold text-lg flex items-center gap-3">
                                            {item.icon} {item.title}
                                        </h3>
                                        <p className="text-muted-foreground mt-1">{item.description}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                
                </div>
            </div>
        </section>
      </main>
    </>
  );
}
