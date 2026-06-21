const bestSellers = [
  {
    id: 1,
    name: "INBARE Essential Tee",
    price: "LKR 4,990",
    badge: "BEST SELLER",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200",
  },
  {
    id: 2,
    name: "Oversized Hoodie",
    price: "LKR 7,990",
    badge: "HOT",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200",
  },
  {
    id: 3,
    name: "Street Bomber Jacket",
    price: "LKR 10,990",
    badge: "TRENDING",
    img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1200",
  },
];

function BestSellers() {
  return (
    <section className="best-sellers">
      <div className="section-title">
        <span>MOST WANTED</span>
        <h2>Best Sellers</h2>
      </div>

      <div className="best-grid">
        {bestSellers.map((item) => (
          <div className="best-card" key={item.id}>
            <div className="badge">{item.badge}</div>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BestSellers;
