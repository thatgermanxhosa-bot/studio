
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const lifestylePackages = [
  {
    title: "Mini Session",
    price: "R 2 200-00",
    duration: "30 min",
    details: ["Perfect for quick headshots (LinkedIn/CVs)", "5 edited images", "Sandton studio or immediate area only"],
    badge: "Headshots"
  },
  {
    title: "Standard Influencer",
    price: "R 4 200-00",
    duration: "1 hr",
    details: ["Ideal for social media content", "20 edited images + B&W copies", "1 location"],
    badge: "Content"
  },
    {
    title: "Content Creator",
    price: "R 5 500-00",
    duration: "90 min",
    details: ["A batch of content for your feed", "30 edited images", "Up to 2 looks/themes", "Includes short-form video clips"],
    badge: "Creator"
  },
  {
    title: "Premium Brand",
    price: "R 6 800-00",
    duration: "2 hrs",
    details: ["For websites & 3 months of content", "40+ edited images", "Up to 2 locations"],
    badge: "Branding"
  }
];

const familyPackages = [
    {
        title: "Quick & Easy",
        price: "R 2 500-00",
        duration: "30 min",
        details: ["Great for short attention spans", "10 edited photos", "Immediate family only"],
    },
    {
        title: "Golden Hour",
        price: "R 5 200-00",
        duration: "60-90 min",
        details: ["Outdoor sunset or cozy in-home session", "35+ edited images", "Includes styling guide"],
    },
    {
        title: "The Newborn",
        price: "R 6 000-00",
        duration: "2-3 hrs",
        details: ["Patient & calm in-home session", "25 lightly retouched images", "Focus on baby with family photos included"],
    },
    {
        title: "Day in the Life",
        price: "R 9 500-00",
        duration: "3-4 hrs",
        details: ["Captures genuine, unposed moments at home", "75+ edited photos", "Includes a softcover photo book"],
    }
];

const couplesPackages = [
    {
        title: "Save the Date",
        price: "R 3 200-00",
        duration: "45 min",
        details: ["Ideal for your invitations", "10 edited images"],
    },
    {
        title: "Date Night",
        price: "R 5 500-00",
        duration: "90 min",
        details: ["Perfect for an engagement shoot", "40 edited images", "2 locations/looks"],
    },
    {
        title: "Anniversary",
        price: "R 4 800-00",
        duration: "1 hr",
        details: ["Celebrate another year together", "25 edited images", "A fun, relaxed session"],
    },
    {
        title: "The Secret Proposal",
        price: "R 8 500-00",
        duration: "Planning + 1 hr shoot",
        details: ["Captures the 'YES!' moment", "Includes planning consultation", "30 photos + highlight video clip"],
    }
];

const eventPackages = [
    {
        title: "Essential",
        price: "R 3 500-00",
        duration: "2 hrs",
        details: ["For kids' parties or intimate dinners", "60-80 edited images"],
    },
    {
        title: "Celebration",
        price: "R 6 500-00",
        duration: "4 hrs",
        details: ["For bigger bashes like 21sts or launch parties", "150+ edited images", "10 teaser photos included"],
    },
    {
        title: "Gala & Corporate",
        price: "R 12 000-00",
        duration: "Up to 6 hrs",
        details: ["Comprehensive event coverage", "300+ edited images", "Includes candid & formal shots", "48-hour delivery for key shots"],
    }
];

const weddingPackages = [
    {
        title: "Micro Elopement",
        price: "R 15 000-00",
        duration: "6 hrs",
        details: ["For intimate weddings under 60 guests", "250+ edited images", "1 photographer"],
    },
    {
        title: "Classic Collection",
        price: "R 26 000-00",
        duration: "9 hrs",
        details: ["Full day coverage", "500+ edited images", "2 photographers", "Free engagement shoot"],
    },
    {
        title: "Luxury Experience",
        price: "R 38 000-00",
        duration: "12 hrs",
        details: ["The ultimate package", "700+ edited images", "2 photographers", "Free engagement shoot", "A4 Fine Art Album included"],
    },
    {
      title: "Cinematic Story",
      price: "from R 18 000-00",
      duration: "Video Add-On",
      details: ["A beautiful 5-7 minute highlight film", "Separate videographer", "Can be added to any wedding package"],
    }
];

const addOns = [
    { name: "Additional Hour", price: "R 1 800-00" },
    { name: "Rush Delivery (48-hour turnaround)", price: "R 1 500-00" },
    { name: "30-sec Highlight Reel", price: "R 1 500-00" },
    { name: "Styling Consultation (30 min call)", price: "R 800-00" },
    { name: "Advanced Retouching (per image)", price: "R 250-00" },
    { name: "Fine Art Prints (Set of 5 A4)", price: "R 1 200-00" },
    { name: "20-Page Hardcover Photo Album", price: "R 3 500-00" },
];

const weddingAddOns = [
    { name: "Second Photographer (flat rate)", price: "R 4 500-00" },
    { name: "Fine Art Wedding Album", price: "R 6 500-00" },
]

const PackageCard = ({ pkg }: { pkg: { title: string; price: string; duration: string; details: string[]; badge?: string } }) => (
    <Card className="bg-black/75 border-white/20 flex flex-col h-full">
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{pkg.title}</CardTitle>
                {pkg.badge && <Badge variant="secondary" className="bg-primary/20 text-primary-foreground">{pkg.badge}</Badge>}
            </div>
            <CardDescription className="text-white/80 !mt-2">{pkg.duration}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
            <ul className="space-y-2 text-white/80 mb-6">
                {pkg.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3">
                        <Check className="size-4 text-primary mt-1 shrink-0" />
                        <span>{detail}</span>
                    </li>
                ))}
            </ul>
            <p className="text-3xl font-bold text-right">{pkg.price}</p>
        </CardContent>
    </Card>
);


export default function ServicesPage() {
  return (
    <div className="relative z-10 text-white">
      <section className="bg-transparent text-center pt-48 pb-16 animate-fade-in-up">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-black">
            Services & Pricing
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/80 animate-fade-in-up animation-delay-200">
            Find the perfect package to capture your story. We offer a range of photography and videography services tailored to your personal milestones. All packages include high-resolution digital images delivered via a private online gallery.
          </p>
        </div>
      </section>

      <section className="py-10 animate-fade-in-up animation-delay-400">
        <div className="container space-y-16">
            
            <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold">Lifestyle & Branding</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Whether you're a content creator, a professional updating your profile, or just looking to capture your unique vibe, these packages are designed to make you shine.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {lifestylePackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold">Family & Maternity</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">From the beautiful bump to the chaotic joy of a full house, these sessions are all about capturing the love and connection that makes your family unique. Let's freeze these precious moments in time.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {familyPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>
            
            <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold">Couples & Engagements</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">It all starts with the two of you. Let's celebrate your love story, whether it's a secret proposal, a fun date night, or announcing your engagement to the world. These sessions are about capturing your connection.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {couplesPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold">Private Events</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">You've planned the perfect party, now it's time to enjoy it! From intimate dinners to milestone birthdays, we'll capture the atmosphere and the memories, so you can relax and be present with your guests.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {eventPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>

            <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold">Weddings</h2>
                  <p className="mt-2 text-white/80 max-w-2xl mx-auto">Your wedding day is one of life's biggest stories. From intimate elopements to grand celebrations, we're here to capture every laugh, tear, and dance move with a timeless, romantic touch.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {weddingPackages.map(pkg => <PackageCard key={pkg.title} pkg={pkg} />)}
                </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto pt-10">
                 <Card className="bg-black/75 border-white/20">
                    <CardHeader>
                        <CardTitle>Package Add-Ons</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {addOns.map(item => (
                                <li key={item.name} className="flex justify-between items-center text-white/90">
                                    <span>{item.name}</span>
                                    <span className="font-semibold">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                 <Card className="bg-black/75 border-white/20">
                    <CardHeader>
                        <CardTitle>Wedding Extras</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {weddingAddOns.map(item => (
                                <li key={item.name} className="flex justify-between items-center text-white/90">
                                    <span>{item.name}</span>
                                    <span className="font-semibold">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-black/75 border-white/20 max-w-6xl mx-auto">
                <CardHeader>
                    <CardTitle>Travel Costs</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white/80">
                        Travel within a 35km radius of Sandton is included free of charge. For locations beyond this, a fee is charged for the return trip. Please contact us for a precise quote for your location.
                    </p>
                </CardContent>
            </Card>

        </div>
      </section>
    </div>
  );
}

    