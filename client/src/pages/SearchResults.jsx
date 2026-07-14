import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import api from '../services/api';
import './SearchResults.css';

function ProductCard({ product }) {
  const { addToCart, setCartOpen } = useCart();
  const productColors = product.colors?.length > 0
    ? product.colors.map((c) => ({ label: c }))
    : null;
  const productSizes = product.sizes?.length > 0 ? product.sizes : ['One Size'];
  const [selectedColor, setSelectedColor] = useState(productColors ? productColors[0] : null);
  const [selectedSize, setSelectedSize] = useState(
    productSizes.length === 1 && productSizes[0] === 'One Size' ? 'One Size' : null
  );
  const [added, setAdded] = useState(false);

  const displayImg = product.images?.[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600';
  const price = product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price;
  const categoryName = product.category?.name || '';

  function handleAdd() {
    if (!selectedSize) return;
    addToCart({
      productId: product._id,
      name: product.name,
      price: price,
      img: displayImg,
      selectedColor,
      selectedSize,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setCartOpen(true);
    }, 600);
  }

  return (
    <div className="sr-card">
      <div className="sr-img-wrap">
        <img src={displayImg} alt={product.name} className="sr-img-fade" />
      </div>

      <div className="sr-info">
        <div className="sr-top">
          <h3>{product.name}</h3>
          {categoryName && <p className="sr-category">{categoryName}</p>}
        </div>
        <p className="sr-price">LKR {price.toLocaleString('en-US')}</p>

        {productColors && (
          <div className="sr-section">
            <span className="sr-label">Color — <span className="sr-color-name">{selectedColor?.label || 'Selected'}</span></span>
            <div className="sr-colors">
              {productColors.map((c) => (
                <button
                  key={c.label}
                  className={`sr-color-swatch ${selectedColor?.label === c.label ? 'active' : ''}`}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>
        )}

        {!(productSizes.length === 1 && productSizes[0] === 'One Size') && (
          <div className="sr-section">
            <span className="sr-label">Size</span>
            <div className="sr-sizes">
              {productSizes.map((s) => (
                <button
                  key={s}
                  className={`sr-size-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className={`sr-add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          disabled={!selectedSize}
        >
          {added ? '✓ Added to bag' : 'Add to bag'}
        </button>
      </div>
    </div>
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    api.get(`/products?search=${encodeURIComponent(query)}&limit=50`)
      .then((res) => setResults(res.data.products))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      <CartDrawer />
      <div className="sr-page">
        <div className="sr-header">
          <button className="sr-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} strokeWidth={2} /> Back
          </button>
          <h1>Search Results</h1>
        </div>

        {query && (
          <div className="sr-query-info">
            <p>Showing results for <strong>"{query}"</strong></p>
            <span className="sr-count">{loading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'item' : 'items'} found`}</span>
          </div>
        )}

        {!query ? (
          <p className="sr-empty">Enter a search term to find products.</p>
        ) : loading ? (
          <p className="sr-empty">Searching...</p>
        ) : results.length === 0 ? (
          <div className="sr-no-results">
            <p>No products found for "{query}"</p>
            <p className="sr-suggestion">Try searching for "tee", "hoodie", "tote", or other product names.</p>
          </div>
        ) : (
          <div className="sr-grid">
            {results.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
