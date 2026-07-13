import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, setOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="overflow-hidden border-b border-border/50 bg-ink text-bone">
        <div className="flex whitespace-nowrap py-2 text-eyebrow">
          <div className="marquee flex shrink-0 gap-12 pl-12">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12">
                <span>Complimentary shipping over $250</span>
                <span>·</span>
                <span>Spring archive — final pieces</span>
                <span>·</span>
                <span>Atelier-made, in limited runs</span>
                <span>·</span>
                <span>New: The Field Jacket in Burnt Clay</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:px-10">
        <button className="md:hidden" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>

        <nav className="hidden gap-8 text-eyebrow md:flex">
          <Link to="/collections/mens-wear" className="hover:text-accent transition-colors">Men</Link>
          <Link to="/collections/mens-wear" search={{ category: "Outerwear" }} className="hover:text-accent transition-colors">Outerwear</Link>
          <Link to="/collections/mens-wear" search={{ category: "Knitwear" }} className="hover:text-accent transition-colors">Knitwear</Link>
          <Link to="/lookbook" className="hover:text-accent transition-colors">Lookbook</Link>
          <Link to="/journal" className="hover:text-accent transition-colors">Journal</Link>
        </nav>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 font-serif text-2xl tracking-[0.2em] md:text-[26px]">
          INBARE
        </Link>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="hidden md:block"><Search className="h-[18px] w-[18px]" /></button>
          <Link to="/account" aria-label="Account" className="hidden md:block"><User className="h-[18px] w-[18px]" /></Link>
          <button onClick={() => setOpen(true)} aria-label="Bag" className="relative">
            <ShoppingBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-medium text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
