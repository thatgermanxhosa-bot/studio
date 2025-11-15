
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const services = [
  {
    id: "videography-showcase",
    title: "Videography",
    description: "We create dynamic, story-driven videos that engage your audience. From concept to final cut, we handle every aspect of video production to bring your vision to life.",
    details: [
      "Corporate & Brand Films",
      "Social Media Content (Reels, TikToks)",
      "Event Coverage & Highlights",
      "Documentary & Narrative",
    ],
  },
  {
    id: "photography-showcase",
    title: "Photography",
    description: "Our photography captures the essence of your brand, product, or event. We deliver striking, high-resolution images optimized for web, print, and social media.",
    details: [
      "Product & E-commerce",
      "Lifestyle & Editorial",
      "Corporate Headshots",
      "Event Photography",
    ],
  },
  {
    id: "post-production-showcase",
    title: "Post-Production",
    description: "The magic happens in the edit. Our post-production team refines your footage with expert editing, color grading, sound design, and motion graphics.",
    details: [
      "Video Editing & Assembly",
      "Professional Color Grading",
      "Sound Mixing & Design",
      "Motion Graphics & Titling",
    ],
  },
  {
    id: "styling-showcase",
    title: "Styling",
    description: "A great-looking shot starts before the camera rolls. We provide professional styling for fashion, food, and products to ensure every detail is perfect.",
    details: [
      "Fashion & Wardrobe",
      "Food & Prop Styling",
      "Set Dressing",
      "Art Direction",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-card py-20 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black uppercase">Our Services</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="container space-y-16">
          {services.map((service, index) => {
            const image = PlaceHolderImages.find(p => p.id === service.id);
            return (
              <div key={service.title} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`relative aspect-video rounded-lg overflow-hidden shadow-lg ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.details.map(detail => (
                      <li key={detail} className="flex items-center gap-3">
                        <span className="text-primary font-black">&bull;</span>
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
