
import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-black/80 text-muted-foreground">
      <div className="container py-8 text-center">
        <p>&copy; {new Date().getFullYear()} PICHULIK STUDIOS. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-4">
          <Link href="#" className="hover:text-foreground transition-colors">
            <Image src="/FB%20Logo.png" alt="Facebook" width={20} height={20} />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            <Image src="/IG%20Logo.png" alt="Instagram" width={20} height={20} />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            <Image src="/TT%20Logo.png" alt="Tiktok" width={20} height={20} />
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            <Image src="/LI%<20Logo.png" alt="LinkedIn" width={20} height={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
