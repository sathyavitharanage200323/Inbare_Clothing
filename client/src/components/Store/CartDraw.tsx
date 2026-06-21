import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartDrawer() {
  const { open, setOpen, detailed, subtotal, setQty, remove } = useCart();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-[440px] flex-col bg-background shadow-2xl transition-transform duration-500 ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl">Your bag</h2>
          <button onClick={() => setOpen(false)} aria-label="Close"><X className="h-5 w-5" /></button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {detailed.length === 0 ? (
            <p className="mt-20 text-center text-sm text-muted-foreground">
              Your bag is empty.<br />Pieces you save will live here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {detailed.map((l) => (
                <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-5">
                  <img src={l.product.image} alt="" className="h-28 w-24 object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-base">{l.product.name}</h3>
                        <p className="text-xs text-muted-foreground">{l.product.colorway} · Size {l.size}</p>
                      </div>
                      <p className="font-serif tabular-nums">${l.product.price * l.qty}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button className="px-2 py-1" onClick={() => setQty(l.slug, l.size, l.qty - 1)} aria-label="Decrease"><Minus className="h-3 w-3" /></button>
                        <span className="min-w-6 px-2 text-center text-sm tabular-nums">{l.qty}</span>
                        <button className="px-2 py-1" onClick={() => setQty(l.slug, l.size, l.qty + 1)} aria-label="Increase"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => remove(l.slug, l.size)} className="text-eyebrow text-muted-foreground hover:text-accent">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-6 py-5">
          <div className="flex justify-between font-serif text-lg">
            <span>Subtotal</span>
            <span className="tabular-nums">${subtotal}</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
          <button
            disabled={detailed.length === 0}
            className="mt-5 w-full bg-ink py-4 text-eyebrow text-bone transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue to checkout
          </button>
        </footer>
      </aside>
    </>
  );
}