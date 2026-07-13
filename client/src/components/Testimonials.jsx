const testimonials = [
  {
    id: 1,
    name: "Asel K.",
    location: "Colombo",
    quote:
      "The quality is insane. I get compliments every single time I wear an Inbare piece. Worth every rupee.",
  },
  {
    id: 2,
    name: "Tharindu M.",
    location: "Kandy",
    quote:
      "Finally a local brand that hits different. The fits, the fabric, the packaging — all top tier.",
  },
  {
    id: 3,
    name: "Nisha R.",
    location: "Galle",
    quote:
      "Ordered the Urban Hoodie and it arrived in two days. Perfect fit and the material is so soft.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-header">
        <p className="section-label">WHAT THEY SAY</p>
        <h2>Real Reviews</h2>
      </div>

      <div className="testi-grid">
        {testimonials.map((t) => (
          <div className="testi-card" key={t.id}>
            <p className="testi-quote">"{t.quote}"</p>
            <div className="testi-author">
              <span className="testi-name">{t.name}</span>
              <span className="testi-location">{t.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
