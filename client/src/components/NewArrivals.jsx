const arrivals = [
  {
    id: 1,
    name: "Oversized Black Tee",
    price: "LKR 4,990",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200",
  },
  {
    id: 2,
    name: "Essential Hoodie",
    price: "LKR 7,490",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
  },
  {
    id: 3,
    name: "Street Jacket",
    price: "LKR 9,990",
    img: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1200",
  },
  {
    id: 4,
    name: "Premium Cargo Pant",
    price: "LKR 6,990",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200",
  },
];

function NewArrivals() {
  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>New Arrivals</h2>
        <button>View All</button>
      </div>

      <div className="arrival-grid">
        {arrivals.map((item) => (
          <div className="arrival-card" key={item.id}>
            <div className="arrival-image">
              <img src={item.img} alt={item.name} />
            </div>
            <div className="arrival-info">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;
