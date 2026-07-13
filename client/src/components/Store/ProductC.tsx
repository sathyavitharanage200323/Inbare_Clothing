import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          width={1024}
          height={1280}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-between opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="bg-background/90 px-3 py-1.5 text-eyebrow backdrop-blur">Quick add →</span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow text-muted-foreground">{product.category}</p>
          <h3 className="mt-1 font-serif text-xl leading-tight">{product.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.colorway}</p>
        </div>
        <p className="font-serif text-lg tabular-nums">${product.price}</p>
      </div>
    </Link>
  );
}