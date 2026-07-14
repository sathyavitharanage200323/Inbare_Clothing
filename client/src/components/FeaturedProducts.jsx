import { useState, useEffect } from 'react';
import api from '../services/api';

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products/featured')
      .then((res) => setProducts(res.data.products.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="featured">
      <h2>Featured Collection</h2>

      <div className="products">
        {products.map((product) => (
          <FeaturedCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ product }) {
  const [hover, setHover] = useState(false);
  const img = product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800';
  const hoverImg = product.images?.[1] || img;
  const displayImg = hover && product.images?.length > 1 ? hoverImg : img;
  const price = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price;

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={displayImg} alt={product.name} className="product-img-fade" />
      <h3>{product.name}</h3>
      <span>LKR {price.toLocaleString('en-US')}</span>
    </div>
  );
}

export default FeaturedProducts;
