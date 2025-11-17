
'use client';

import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { PlayCircle } from "lucide-react";
import { useRef, useState } from "react";

const projects = [
  { id: "project-1", category: "Videography" },
  { id: "project-2", category: "Photography" },
  { id: "project-3", category: "Post-Production" },
  { id: "project-4", category: "Videography" },
  { id: "project-5", category: "Styling" },
  { id: "project-6", category: "Photography" },
];

export default function OurWorkPage() {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const [showControls1, setShowControls1] = useState(false);
  
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [showControls2, setShowControls2] = useState(false);

  const videoRef6 = useRef<HTMLVideoElement>(null);
  const [showControls6, setShowControls6] = useState(false);

  const handlePlayVideo1 = () => {
    if (videoRef1.current) {
      videoRef1.current.play();
      setShowControls1(true);
    }
  };
  
  const handlePlayVideo2 = () => {
    if (videoRef2.current) {
      videoRef2.current.play();
      setShowControls2(true);
    }
  };

  const handlePlayVideo6 = () => {
    if (videoRef6.current) {
      videoRef6.current.play();
      setShowControls6(true);
    }
  };


  return (
    <div className="relative z-10">
      <section className="bg-transparent text-center pt-32 pb-20 animate-fade-in-up">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Stories We've Built. Goals We've Met.</h1>
          <p className="mt-4 text-lg text-white/80 animate-fade-in-up animation-delay-200">
            We believe that great creative is only successful if it achieves a goal. This isn't a vast archive—it's a curated showcase of our favorite recent projects.
          </p>
          <p className="mt-4 text-white/80 animate-fade-in-up animation-delay-400">
            These are prime examples of brand stories told, business goals met, and partnerships we're proud of. See for yourself how we craft compelling visual stories.
          </p>
        </div>
      </section>

      <section className="py-20 animate-fade-in-up animation-delay-600">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const image = PlaceHolderImages.find((p) => p.id === project.id);
              if (!image) return null;

              if (project.id === 'project-1') {
                return (
                  <div key={project.id} className="group relative block aspect-video overflow-hidden rounded-lg shadow-lg bg-black/75 cursor-pointer" onClick={!showControls1 ? handlePlayVideo1 : undefined}>
                    <video
                      ref={videoRef1}
                      src="/IA_NED ReNew_2.mp4"
                      poster="/IA_NED ReNew HL OCT Update_LR.00_00_20_04.Still001.png"
                      className="w-full h-full object-cover"
                      playsInline
                      controls={showControls1}
                    >
                      Your browser does not support the video tag.
                    </video>
                     {!showControls1 && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="size-16 text-white" />
                      </div>
                     )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white">{image.description}</h3>
                      <p className="text-sm text-white/80">Impact Amplifier & Nedbank</p>
                    </div>
                  </div>
                )
              }

              if (project.id === 'project-2') {
                return (
                  <div key={project.id} className="group relative block aspect-video overflow-hidden rounded-lg shadow-lg bg-black/75 cursor-pointer" onClick={!showControls2 ? handlePlayVideo2 : undefined}>
                    <video
                      ref={videoRef2}
                      src="/Reyashoma.mp4"
                      poster="/Reyashoma X Pichulik Studios.00_00_18_57.Still001.png"
                      className="w-full h-full object-cover"
                      playsInline
                      controls={showControls2}
                    >
                      Your browser does not support the video tag.
                    </video>
                     {!showControls2 && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="size-16 text-white" />
                      </div>
                     )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white">{image.description}</h3>
                      <p className="text-sm text-white/80">Reyashoma Roadmarkings & Signage</p>
                    </div>
                  </div>
                )
              }

              if (project.id === 'project-6') {
                return (
                  <div key={project.id} className="group relative block aspect-video overflow-hidden rounded-lg shadow-lg bg-black/75 cursor-pointer" onClick={!showControls6 ? handlePlayVideo6 : undefined}>
                    <video
                      ref={videoRef6}
                      src="/Union Street Development HR.mp4"
                      poster=".png"
                      className="w-full h-full object-cover"
                      playsInline
                      controls={showControls6}
                    >
                      Your browser does not support the video tag.
                    </video>
                     {!showControls6 && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="size-16 text-white" />
                      </div>
                     )}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white">{image.description}</h3>
                    </div>
                  </div>
                )
              }

              return (
                <Link href="#" key={project.id} className="group relative block aspect-video overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <PlayCircle className="size-16 text-white" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white">{image.description}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
