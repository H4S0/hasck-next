import Link from 'next/link';
import { Button } from './ui/button';

export const Navbar = () => {
  return (
    <nav className="w-full py-3 md:py-4 px-4 md:px-6 border-b border-transparent bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-lg md:text-xl font-bold text-primary">
          Hasck
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-sm md:text-base"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="text-sm md:text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
