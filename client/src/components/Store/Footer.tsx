export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-ink text-bone">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-10">
        <div>
          <h3 className="font-serif text-4xl leading-[1.05]">
            Letters from<br />the atelier.
          </h3>
          <p className="mt-4 max-w-sm text-sm text-bone/70">
            Quarterly dispatches on new collections, mill visits and the people we build with. No noise.
          </p>
          <form className="mt-6 flex max-w-md border-b border-bone/30 pb-2">
            <input
              type="email"
              placeholder="your@email"
              className="flex-1 bg-transparent text-sm placeholder:text-bone/40 focus:outline-none"
            />
            <button className="text-eyebrow text-bone hover:text-accent">Subscribe →</button>
          </form>
        </div>

        {[
          { title: "Shop", links: ["Men", "Outerwear", "Knitwear", "Footwear", "Archive"] },
          { title: "House", links: ["Atelier", "Materials", "Journal", "Stockists"] },
          { title: "Care", links: ["Shipping", "Returns", "Repairs", "Contact"] },
        ].map((c) => (
          <div key={c.title}>
            <p className="text-eyebrow text-bone/50">{c.title}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l}><a className="hover:text-accent transition-colors" href="#">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-3 px-6 py-6 text-eyebrow text-bone/50 md:flex-row md:items-center md:px-10">
          <span>© {new Date().getFullYear()} Inbare Studio</span>
          <span>Made slowly, in Lisbon, Porto, Yorkshire & Tokyo</span>
        </div>
      </div>
    </footer>
  );
}