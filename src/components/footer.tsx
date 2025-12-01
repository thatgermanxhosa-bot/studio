
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 text-muted-foreground relative z-10">
      <div className="container py-8 text-center">
        <div className="flex justify-center gap-4">
          <Link href="https://facebook.com/pichulikstudios" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Image src="/FB%20Logo.png" alt="Facebook" width={20} height={20} />
          </Link>
          <Link href="https://instagram.com/pichulikstudios/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Image src="/IG%20Logo.png" alt="Instagram" width={20} height={20} />
          </Link>
          <Link href="https://tiktok.com/@pichulikstudios" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Image src="/TT%20Logo.png" alt="Tiktok" width={20} height={20} />
          </Link>
          <Link href="https://linkedin.com/company/pichulik-studios/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Image src="/LI%20Logo.png" alt="LinkedIn" width={20} height={20} />
          </Link>
        </div>
        <p className="mt-4 text-sm">&copy; {new Date().getFullYear()} Pichulik Studios. All rights reserved.</p>
      </div>
    </footer>
  );
}
