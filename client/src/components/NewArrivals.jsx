import { useState } from 'react';
import oversizedBlackTee from '../assets/Oversized Black Tee.jpg';
import essentialHoodie from '../assets/Essential Hoodie.jpg';
import streetJacket from '../assets/Street Jacket.jpg';
import cargoPant1 from '../assets/Premium Cargo Pant.jpg';
import cargoPant2 from '../assets/Premium Cargo Pant-2.jpg';

const arrivals = [
  {
    id: 1,
    name: "Oversized Black Tee",
    price: "LKR 4,990",
    img: oversizedBlackTee,
  },
  {
    id: 2,
    name: "Essential Hoodie",
    price: "LKR 7,490",
    img: essentialHoodie,
  },
  {
    id: 3,
    name: "Street Jacket",
    price: "LKR 9,990",
    img: streetJacket,
  },
  {
    id: 4,
    name: "Premium Cargo Pant",
    price: "LKR 6,990",
    img: cargoPant1,
    hoverImg: cargoPant2,
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
          <ArrivalCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function ArrivalCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // use hover image if available and hovered, else default
  const displayImg = (item.hoverImg && isHovered) ? item.hoverImg : item.img;

  return (
    <div
      className="arrival-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="arrival-image">
        <img src={displayImg} alt={item.name} className="arrival-img-fade" />
      </div>
      <div className="arrival-info">
        <h3>{item.name}</h3>
        <p>{item.price}</p>
      </div>
    </div>
  );
}

export default NewArrivals;
