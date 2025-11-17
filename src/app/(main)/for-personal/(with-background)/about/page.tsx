

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Camera, Scissors, Award, Heart, Smile, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Video className="size-8 text-primary" />,
    title: "Milestone Videography",
    description: "From anniversaries and milestone birthdays to family documentaries and personal tributes, we create professional, heartfelt films that you and your loved ones can cherish forever.",
  },
  {
    icon: <Camera className="size-8 text-primary" />,
    title: "Portrait & Event Photography",
    description: "Vibrant, natural photography that captures the true essence of your family. We specialize in portraits, special events, and capturing life's candid, beautiful moments.",
  },
  {
    icon: <Scissors className="size-8 text-primary" />,
    title: "Editing & Enhancement",
    description: "We polish your new footage to perfection or breathe new life into your old family videos. Our expert editing, color grading, and sound design make your memories shine.",
  },
  {
    icon: <Award className="size-8 text-primary" />,
    title: "Custom Graphics",
    description: "From beautiful titles for your film to custom digital invitations or animated photo slideshows, we add that final creative touch to your personal projects.",
  },
];

const whyPartnerItems = [
    {
        icon: <Heart className="size-8 mb-2 text-primary" />,
        title: "We Listen With Heart",
        description: "We know these aren't just \"projects\"—they're your life's most precious memories. We take the time to truly understand you and your story, ensuring your final film feels authentic and personal."
    },
    {
        icon: <Smile className="size-8 mb-2 text-primary" />,
        title: "Relax and Be Present",
        description: "Our 5+ years of experience mean you can simply live in the moment. Trust us to be in the right place at the right time, capturing the magic quietly and professionally while you enjoy your day."
    },
    {
        icon: <Sparkles className="size-8 mb-2 text-primary" />,
        title: "Relive the Joy, Sooner",
        description: "We know you'll be excited to see your film. We pour our hearts into polishing your story and deliver your finished memories promptly, so you can share and relive the wonder while it's still fresh."
    }
];

export default function AboutUsPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="py-16 md:py-24 pt-40 md:pt-48">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight animate-fade-in-up">Your Life's Moments, Beautifully Captured.</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-5xl mx-auto mb-8 animate-fade-in-up animation-delay-200">
                We are a creative studio dedicated to capturing your most precious milestones. We specialize in crafting beautiful, high-impact visual stories for individuals and families, turning your personal moments into cinematic memories that last a lifetime.
            </p>
            <p className="text-muted-foreground text-lg max-w-5xl mx-auto text-center text-white/80 animate-fade-in-up animation-delay-400">
                Our service is built around you. We listen to your story and guide your project from a simple idea to a polished final film.
            </p>
        </div>
      </section>

      <section className="py-10 md:py-16">
          <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto space-y-12">
                  <Card className="bg-black/75 border-white/20 p-6 md:p-8 animate-fade-in-up animation-delay-600">
                      <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold">What We Create For You</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            {services.map((service) => (
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
                  </Card>

                  <Card className="bg-black/75 border-white/20 p-6 md:p-8 animate-fade-in-up animation-delay-800">
                      <CardHeader>
                          <CardTitle className="text-2xl md:text-3xl font-bold">Our Promise To You</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                          {whyPartnerItems.map((item) => (
                              <div key={item.title}>
                                  <h3 className="font-bold text-lg flex items-center gap-3">
                                      {item.icon} {item.title}
                                  </h3>
                                  <p className="text-white/80 mt-1">{item.description}</p>
                              </div>
                          ))}
                      </CardContent>
                  </Card>
              </div>

              <div className="mt-16 text-center p-8 md:p-12 animate-fade-in-up">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a Moment to Celebrate?</h2>
                  <p className="max-w-2xl mx-auto text-white/80 text-lg mb-8">
                      Let's tell your story.
                  </p>
                  <Button asChild size="lg" className="uppercase font-bold tracking-widest px-8">
                      <Link href="/for-personal/bookings">Book Your Session</Link>
                  </Button>
              </div>
          </div>
      </section>
    </div>
  );
}
