import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import api from '../services/api';
import './CategoryPage.css';

const priceRanges = [
  { label: 'All',               min: 0,    max: Infinity },
  { label: 'Under LKR 3,500',   min: 0,    max: 3500 },
  { label: 'LKR 3,500 – 4,500', min: 3500, max: 4500 },
  { label: 'LKR 4,500 – 5,500', min: 4500, max: 5500 },
  { label: 'Over LKR 5,500',    min: 5500, max: Infinity },
];

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
    <div className="cp-card">
      <div className="cp-img-wrap">
        <img src={displayImg} alt={product.name} className="cp-img-fade" />
      </div>

      <div className="cp-info">
        <h3>{product.name}</h3>
        <p className="cp-price">LKR {price.toLocaleString('en-US')}</p>

        {productColors && (
          <div className="cp-section">
            <span className="cp-label">Color — <span className="cp-color-name">{selectedColor?.label || 'All'}</span></span>
            <div className="cp-colors">
              {productColors.map((c) => (
                <button
                  key={c.label}
                  className={`cp-color-swatch ${selectedColor?.label === c.label ? 'active' : ''}`}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c.label}
                  title={c.label}
                />
              ))}
            </div>
          </div>
        )}

        {!(productSizes.length === 1 && productSizes[0] === 'One Size') && (
          <div className="cp-section">
            <span className="cp-label">Size</span>
            <div className="cp-sizes">
              {productSizes.map((s) => (
                <button
                  key={s}
                  className={`cp-size-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          className={`cp-add-btn ${added ? 'added' : ''}`}
          onClick={handleAdd}
          disabled={!selectedSize}
        >
          {added ? '✓ Added to bag' : 'Add to bag'}
        </button>
      </div>
    </div>
  );
}

function CategoryPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [priceIdx, setPriceIdx] = useState(0);
  const [sizeFilter, setSizeFilter] = useState('All');

  useEffect(() => {
    setLoading(true);
    api.get(`/categories`)
      .then((res) => {
        const cat = res.data.categories.find((c) => c.slug === slug);
        if (cat) {
          setCategoryName(cat.name);
          return api.get(`/products?category=${cat._id}&limit=50`);
        }
        setCategoryName(slug);
        return api.get(`/products?limit=50`);
      })
      .then((res) => {
        if (res) setProducts(res.data.products);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const allSizes = ['All', ...new Set(products.flatMap((p) => p.sizes || []))];
  const range = priceRanges[priceIdx];

  const filtered = products.filter((p) => {
    const inPrice = p.price >= range.min && p.price < range.max;
    const inSize = sizeFilter === 'All' || (p.sizes || []).includes(sizeFilter);
    return inPrice && inSize;
  });

  if (loading) {
    return (
      <>
        <CartDrawer />
        <div className="cp-page">
          <p className="cp-empty">Loading products...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <CartDrawer />
      <div className="cp-page">
        <div className="cp-topbar">
          <button className="cp-back" onClick={() => navigate('/')}>← Back</button>
          <h1>{categoryName || slug}</h1>
          <span className="cp-count">{filtered.length} items</span>
        </div>

        <div className="cp-layout">
          <aside className="cp-sidebar">
            <div className="cp-filter-group">
              <h4>Price</h4>
              {priceRanges.map((r, i) => (
                <label key={r.label} className="cp-radio">
                  <input type="radio" name="price" checked={priceIdx === i} onChange={() => setPriceIdx(i)} />
                  {r.label}
                </label>
              ))}
            </div>
            {allSizes.length > 2 && (
              <div className="cp-filter-group">
                <h4>Size</h4>
                {allSizes.map((s) => (
                  <label key={s} className="cp-radio">
                    <input type="radio" name="size" checked={sizeFilter === s} onChange={() => setSizeFilter(s)} />
                    {s}
                  </label>
                ))}
              </div>
            )}
          </aside>

          <main className="cp-grid">
            {filtered.length === 0 ? (
              <p className="cp-empty">No products match your filters.</p>
            ) : (
              filtered.map((p) => <ProductCard key={p._id} product={p} />)
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default CategoryPage;
