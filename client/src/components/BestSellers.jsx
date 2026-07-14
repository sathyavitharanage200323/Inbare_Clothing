import { useState, useEffect } from 'react';
import api from '../services/api';

function BestSellers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products?sort=-averageRating&limit=3')
      .then((res) => setProducts(res.data.products))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  const badges = ['BEST SELLER', 'HOT', 'TRENDING'];

  return (
    <section className="best-sellers">
      <div className="section-title">
        <span>MOST WANTED</span>
        <h2>Best Sellers</h2>
      </div>

      <div className="best-grid">
        {products.map((product, i) => {
          const img = product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200';
          const price = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price;
          return (
            <div className="best-card" key={product._id}>
              <div className="badge">{badges[i] || 'POPULAR'}</div>
              <img src={img} alt={product.name} />
              <h3>{product.name}</h3>
              <p>LKR {price.toLocaleString('en-US')}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default BestSellers;
