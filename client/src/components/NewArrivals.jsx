import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { imageUrl } from '../services/imageUrl';
import { ProductCardSkeleton } from './Skeleton';

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products?sort=-createdAt&limit=4')
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="new-arrivals">
        <div className="section-header">
          <h2>New Arrivals</h2>
        </div>
        <div className="arrival-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="new-arrivals">
      <div className="section-header">
        <h2>New Arrivals</h2>
        <button onClick={() => window.location.href = '/category/t-shirts'}>View All</button>
      </div>

      <div className="arrival-grid">
        {products.map((product) => (
          <ArrivalCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ArrivalCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const img = imageUrl(product.images?.[0]) || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800';
  const hoverImg = imageUrl(product.images?.[1]) || img;
  const displayImg = isHovered && product.images?.length > 1 ? hoverImg : img;
  const price = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price;

  return (
    <Link to={`/product/${product.slug}`} className="arrival-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="arrival-image">
        <img src={displayImg} alt={product.name} className="arrival-img-fade" />
      </div>
      <div className="arrival-info">
        <h3>{product.name}</h3>
        <p>LKR {price.toLocaleString('en-US')}</p>
      </div>
    </Link>
  );
}

export default NewArrivals;
