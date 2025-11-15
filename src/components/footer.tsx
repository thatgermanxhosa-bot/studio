
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { TikTokIcon } from './social-icons';

export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PICHULIK STUDIOS. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <Link href="#" className="hover:text-foreground transition-colors"><Facebook /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><Instagram /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><TikTokIcon className="size-6" /></Link>
          <Link href="#" className="hover:text-foreground transition-colors"><Linkedin /></Link>
        </div>
      </div>
    </footer>
  );
}
