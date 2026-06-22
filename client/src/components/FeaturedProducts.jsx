import { useState } from 'react';
import oversizedTee from '../assets/Oversized Tee f.jpg';
import urbanHoodie1 from '../assets/Urban Hoodie1.jpg';
import urbanHoodie2 from '../assets/Urban Hoodie2.jpg';

function FeaturedProducts() {
  const [urbanHover, setUrbanHover] = useState(false);

  return (
    <section className="featured">
      <h2>Featured Collection</h2>

      <div className="products">

        <div className="product-card">
          <img
            src={oversizedTee}
            alt="Oversized Tee"
          />
          <h3>Oversized Tee</h3>
          <span>LKR 4,500</span>
        </div>

        <div 
          className="product-card"
          onMouseEnter={() => setUrbanHover(true)}
          onMouseLeave={() => setUrbanHover(false)}
        >
          <img
            src={urbanHover ? urbanHoodie2 : urbanHoodie1}
            alt="Urban Hoodie"
            className="product-img-fade"
          />
          <h3>Urban Hoodie</h3>
          <span>LKR 7,900</span>
        </div>

        <div className="product-card">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
            alt="Classic Jacket"
          />
          <h3>Classic Jacket</h3>
          <span>LKR 9,500</span>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;
