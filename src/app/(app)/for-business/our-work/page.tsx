
'use client';

import React from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  { id: "project-1", category: "Videography" },
  { id: "project-2", category: "Photography" },
  { id: "project-3", category: "Post-Production" },
  { id: "project-4", category: "Videography" },
  { id: "project-5", category: "Styling" },
  { id: "project-6", category: "Photography" },
];

const videoSources = [
    { src: "/IA_NED ReNew_2.mp4", poster: "/IA_NED ReNew HL OCT Update_LR.00_00_20_04.Still001.png", company: "Impact Amplifier & Nedbank" },
    { src: "/Reyashoma.mp4", poster: "/Reyashoma X Pichulik Studios.00_00_18_57.Still001.png", company: "Reyashoma Roadmarkings & Signage" },
    { src: "/Italian Rugby Day Highlights Video.mp4", poster: "/Italian Rugby Day Highlights Video.00_00_27_19.Still001.png", company: "Imatium Studios" },
    { src: "/Sanlam Vietnam Cutdown Clean D2 (1).mp4", poster: "/Sanlam Vietnam Cutdown Clean D2 (1).00_00_08_04.Still001.png", company: "Sanlam" },
    { src: "/Perede K9H Pre Race Video.mp4", poster: "/Perede K9H Pre Race Video.00_00_38_41.Still001.png", company: "Perede" },
    { src: "/Union Street Development HR.mp4", poster: "/Unionstreet.png", company: "Slab Property Development" },
];

const clientLogos = Array.from({ length: 15 }, (_, i) => ({
  name: `Client ${i + 2}`,
  logo: `/Trusted_By/${i + 2}.png`
}));


function OurWorkClient() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [showControls, setShowControls] = useState<boolean[]>(Array(projects.length).fill(false));

  const handlePlayVideo = (index: number) => {
    const videoElement = videoRefs.current[index];
    if (videoElement) {
      videoElement.play();
      setShowControls(prev => {
        const newControls = [...prev];
        newControls[index] = true;
        return newControls;
      });
    }
  };

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
      <section className="py-20 animate-fade-in-up animation-delay-600">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoSources.map((videoInfo, index) => {
              return (
                <div key={videoInfo.src} className="group relative block aspect-video overflow-hidden rounded-lg shadow-lg bg-black/75 cursor-pointer" onClick={!showControls[index] ? () => handlePlayVideo(index) : undefined}>
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={videoInfo.src}
                    poster={videoInfo.poster}
                    className="w-full h-full object-cover"
                    playsInline
                    controls={showControls[index]}
                    onPause={() => setShowControls(prev => { const newControls = [...prev]; newControls[index] = false; return newControls; })}
                    onEnded={() => setShowControls(prev => { const newControls = [...prev]; newControls[index] = false; return newControls; })}
                  >
                    Your browser does not support the video tag.
                  </video>
                   {!showControls[index] && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="size-16 text-white" />
                    </div>
                   )}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{videoInfo.company}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-24">
             <h2 className="text-3xl font-bold text-center mb-12">Trusted By</h2>
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                }}
                plugins={[autoplayPlugin.current]}
                className="w-full"
                >
                <CarouselContent>
                    {clientLogos.map((client, index) => (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                        <div className="p-1">
                            <Card className="bg-white shadow-md">
                                <CardContent className="flex aspect-video items-center justify-center p-2">
                                    <Image 
                                        src={client.logo} 
                                        alt={client.name}
                                        width={200}
                                        height={100}
                                        className="transition-all duration-300 object-scale-down hover:scale-105"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
          </div>

        </div>
      </section>
  )
}


export default function OurWorkPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48 pb-20 animate-fade-in-up">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black normal-case">Stories We've Built. Goals We've Met.</h1>
          <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-200">
            We believe that great creative is only successful if it achieves a goal. This isn't a vast archive—it's a curated showcase of our favorite recent projects.
          </p>
          <p className="mt-4 text-white/80 animate-fade-in-up animation-delay-400">
            These are prime examples of brand stories told, business goals met, and partnerships we're proud of. See for yourself how we craft compelling visual stories.
          </p>
        </div>
      </section>
      <OurWorkClient />
    </div>
  );
}
