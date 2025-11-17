
import Image from "next/image";
import Link from "next/link";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const projects = [
  { id: "project-1", category: "Videography" },
  { id: "project-2", category: "Photography" },
  { id: "project-3", category: "Post-Production" },
  { id: "project-4", category: "Videography" },
  { id: "project-5", category: "Styling" },
  { id: "project-6", category: "Photography" },
];

export default function OurWorkPage() {
  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black uppercase animate-fade-in-up">Stories We've Built. Goals We've Met.</h1>
          <p className="mt-4 text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
            We believe that great creative is only successful if it achieves a goal. This isn't a vast archive—it's a curated showcase of our favorite recent projects.
          </p>
          <p className="mt-4 text-muted-foreground animate-fade-in-up animation-delay-400">
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
              return (
                <Link href="#" key={project.id} className="group relative block overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white transform-gpu transition-transform duration-300 group-hover:-translate-y-2">{image.description}</h3>
                    <p className="text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{project.category}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
