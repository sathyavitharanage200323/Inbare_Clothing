import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import './SearchResults.css';

// Import all product images
import classicWhite from '../assets/Classic White Tee-white.jpg';
import classicBlack from '../assets/Classic White Tee-black.jpg';
import washedBlack1 from '../assets/Washed Black Tee-1.jpg';
import washedBlack2 from '../assets/Washed Black Tee-2.jpg';
import og1 from '../assets/Oversized Graphic Tee-1.jpg';
import cropAll from '../assets/Crop Tee-all.jpg';
import cropBlack from '../assets/Crop Tee-1.jpg';
import cropWhite from '../assets/Crop Tee-2.jpg';
import cropBrown from '../assets/Crop Tee-3.jpg';
import ribAsh from '../assets/Rib Tee - ash.jpg';
import ribBlack from '../assets/Rib Tee - Black.jpg';
import ribLightAsh from '../assets/Rib Tee - lightash.jpg';
import ribPink from '../assets/Rib Tee - pink.jpg';
import ribRed from '../assets/Rib Tee - red.jpg';
import ribWhite from '../assets/Rib Tee - white.jpg';
import pocketBurgundy from '../assets/Longline Pocket Tee-1.jpg';
import pocketCharcoal from '../assets/Longline Pocket Tee-2.jpg';
import pocketWhite from '../assets/Longline Pocket Tee-3.jpg';
import hoodieNavy from '../assets/Classic Pullover Hoodie-1.jpg';
import hoodieBlack from '../assets/Classic Pullover Hoodie-2.jpg';
import hoodieBeige from '../assets/Classic Pullover Hoodie-3.jpg';
import hoodiePink from '../assets/Classic Pullover Hoodie-4.jpg';
import hoodieBlue from '../assets/Classic Pullover Hoodie-5.jpg';
import hoodieBrown from '../assets/Classic Pullover Hoodie-6.jpg';
import techBurgundy from '../assets/Zip-Up Tech Hoodie-3.jpg';
import techSlate from '../assets/Zip-Up Tech Hoodie-4.jpg';
import jhumka1 from '../assets/Jhumka-1.jpg';
import n1 from '../assets/N-1.jpg';
import b1 from '../assets/b-1.jpg';
import acc1 from '../assets/Accessories-1.jpg';
import tot1 from '../assets/tot-1.jpg';
import tot2 from '../assets/tot-2.jpg';
import tot3 from '../assets/tot-3.jpg';
import tot4 from '../assets/tot-4.jpg';
import tot5 from '../assets/tot-5.jpg';
import tot6 from '../assets/tot-6.jpg';
import tot7 from '../assets/tot-7.jpg';
import tot8 from '../assets/tot-8.jpg';
import tot9 from '../assets/tot-9.jpg';
import tot10 from '../assets/tot-10.jpg';

// All products data
const allProducts = [
  // T-Shirts
  { id: 't1', category: 'T-Shirts', name: 'Classic White Tee', price: 3500, img: classicWhite, colors: [{ hex: '#ffffff', img: classicWhite }, { hex: '#111111', img: classicBlack }], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 't2', category: 'T-Shirts', name: 'Washed Black Tee', price: 3800, img: washedBlack1, colors: [{ hex: '#1a1a1a', img: washedBlack1 }, { hex: '#3b3b3b', img: washedBlack2 }], sizes: ['S', 'M', 'L', 'XL'] },
  { id: 't3', category: 'T-Shirts', name: 'Oversized Graphic Tee', price: 4200, img: og1, colors: null, sizes: ['M', 'L', 'XL', 'XXL'] },
  { id: 't4', category: 'T-Shirts', name: 'Crop Top', price: 3600, img: cropAll, colors: [{ hex: '#111111', img: cropBlack }, { hex: '#ffffff', img: cropWhite }, { hex: '#4c3026', img: cropBrown }], sizes: ['XS', 'S', 'M', 'L'] },
  { id: 't5', category: 'T-Shirts', name: 'Essential Rib Tee', price: 3200, img: ribAsh, colors: [{ hex: '#7a7a7a', img: ribAsh }, { hex: '#111111', img: ribBlack }, { hex: '#bebebe', img: ribLightAsh }, { hex: '#e9b5b5', img: ribPink }, { hex: '#b91c1c', img: ribRed }, { hex: '#ffffff', img: ribWhite }], sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 't6', category: 'T-Shirts', name: 'Longline Pocket Tee', price: 3900, img: pocketBurgundy, colors: [{ hex: '#752531', img: pocketBurgundy }, { hex: '#3d3c42', img: pocketCharcoal }, { hex: '#ffffff', img: pocketWhite }], sizes: ['S', 'M', 'L', 'XL'] },
  
  // Hoodies
  { id: 'h1', category: 'Hoodies', name: 'Classic Pullover Hoodie', price: 5500, img: hoodieNavy, colors: [{ hex: '#1c2d42', img: hoodieNavy }, { hex: '#1e1e20', img: hoodieBlack }, { hex: '#d4c6bc', img: hoodieBeige }, { hex: '#c55c8f', img: hoodiePink }, { hex: '#2b84b5', img: hoodieBlue }, { hex: '#634c41', img: hoodieBrown }], sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  { id: 'h2', category: 'Hoodies', name: 'Zip-Up Tech Hoodie', price: 6000, img: techBurgundy, colors: [{ hex: '#3c2125', img: techBurgundy }, { hex: '#37424d', img: techSlate }], sizes: ['M', 'L', 'XL'] },
  
  // Accessories
  { id: 'a1', category: 'Accessories', name: 'Jhumkas', price: 4500, img: jhumka1, colors: null, sizes: ['One Size'] },
  { id: 'a2', category: 'Accessories', name: 'Necklaces', price: 5200, img: n1, colors: null, sizes: ['One Size'] },
  { id: 'a3', category: 'Accessories', name: 'Desi Bangle', price: 3800, img: b1, colors: null, sizes: ['One Size'] },
  { id: 'a4', category: 'Accessories', name: 'Earrings', price: 4200, img: acc1, colors: null, sizes: ['One Size'] },
  
  // Tote Bags
  { id: 'tb1', category: 'Tote Bags', name: 'The Natural Tote', price: 1200, img: tot1, colors: null, sizes: ['One Size'] },
  { id: 'tb2', category: 'Tote Bags', name: 'Washed Canvas Tote', price: 1400, img: tot2, colors: null, sizes: ['One Size'] },
  { id: 'tb3', category: 'Tote Bags', name: 'Heritage Carry Bag', price: 1600, img: tot3, colors: null, sizes: ['One Size'] },
  { id: 'tb4', category: 'Tote Bags', name: 'Minimal Market Tote', price: 1300, img: tot4, colors: null, sizes: ['One Size'] },
  { id: 'tb5', category: 'Tote Bags', name: 'Linen Everyday Bag', price: 1800, img: tot5, colors: null, sizes: ['One Size'] },
  { id: 'tb6', category: 'Tote Bags', name: 'Studio Tote', price: 2000, img: tot6, colors: null, sizes: ['One Size'] },
  { id: 'tb7', category: 'Tote Bags', name: 'Archive Shopper', price: 1700, img: tot7, colors: null, sizes: ['One Size'] },
  { id: 'tb8', category: 'Tote Bags', name: 'Raw Edge Carry-All', price: 1500, img: tot8, colors: null, sizes: ['One Size'] },
  { id: 'tb9', category: 'Tote Bags', name: 'Atelier Tote', price: 1900, img: tot9, colors: null, sizes: ['One Size'] },
  { id: 'tb10', category: 'Tote Bags', name: 'Grand Market Bag', price: 1800, img: tot10, colors: null, sizes: ['One Size'] },
];

/* ── product card ── */
function ProductCard({ product }) {
  const { addToCart, setCartOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes.length === 1 && product.sizes[0] === 'One Size' ? 'One Size' : null);
  const [added, setAdded] = useState(false);

  const displayImg = selectedColor ? selectedColor.img : product.img;

  function handleAdd() {
    if (!selectedSize) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
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
        <img src={displayImg} alt={product.name} className="sr-img-fade" key={displayImg} />
      </div>

      <div className="sr-info">
        <div className="sr-top">
          <h3>{product.name}</h3>
          <p className="sr-category">{product.category}</p>
        </div>
        <p className="sr-price">LKR {product.price.toLocaleString('en-US')}</p>

        {/* Color swatches */}
        {product.colors && (
          <div className="sr-section">
            <span className="sr-label">Color — <span className="sr-color-name">{selectedColor?.label || 'Selected'}</span></span>
            <div className="sr-colors">
              {product.colors.map((c) => (
                <button
                  key={c.hex}
                  className={`sr-color-swatch ${selectedColor?.hex === c.hex ? 'active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => setSelectedColor(c)}
                  aria-label={c.label}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        {!(product.sizes.length === 1 && product.sizes[0] === 'One Size') && (
          <div className="sr-section">
            <span className="sr-label">Size</span>
            <div className="sr-sizes">
              {product.sizes.map((s) => (
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

/* ── main search results page ── */
export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Filter products by search query (case-insensitive)
    const lowerQuery = query.toLowerCase();
    const filtered = allProducts.filter((p) => {
      return (
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
      );
    });
    setResults(filtered);
  }, [query]);

  return (
    <>
      <CartDrawer />
      <div className="sr-page">
        {/* header */}
        <div className="sr-header">
          <button className="sr-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} strokeWidth={2} /> Back
          </button>
          <h1>Search Results</h1>
        </div>

        {/* query display */}
        {query && (
          <div className="sr-query-info">
            <p>Showing results for <strong>"{query}"</strong></p>
            <span className="sr-count">{results.length} {results.length === 1 ? 'item' : 'items'} found</span>
          </div>
        )}

        {/* results grid */}
        {!query ? (
          <p className="sr-empty">Enter a search term to find products.</p>
        ) : results.length === 0 ? (
          <div className="sr-no-results">
            <p>No products found for "{query}"</p>
            <p className="sr-suggestion">Try searching for "tee", "hoodie", "tote", "accessories", or other product names.</p>
          </div>
        ) : (
          <div className="sr-grid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
