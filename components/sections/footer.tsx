import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-8 md:py-12 border-t bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-lg font-bold text-primary">
              Hasck
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Modern Authentication for Next.js
            </p>
          </div>
          <div className="flex gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
