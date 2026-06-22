import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CategoryPage.css';

// Classic White Tee
import classicWhite from '../assets/Classic White Tee-white.jpg';
import classicBlack from '../assets/Classic White Tee-black.jpg';
// Washed Black Tee
import washedBlack1 from '../assets/Washed Black Tee-1.jpg';
import washedBlack2 from '../assets/Washed Black Tee-2.jpg';
// Oversized Graphic Tee
import og1 from '../assets/Oversized Graphic Tee-1.jpg';
import og2 from '../assets/Oversized Graphic Tee-2.jpg';
import og3 from '../assets/Oversized Graphic Tee-3.jpg';
import og4 from '../assets/Oversized Graphic Tee-4.jpg';
import og5 from '../assets/Oversized Graphic Tee-5.jpg';
import og6 from '../assets/Oversized Graphic Tee-6.jpg';
import og7 from '../assets/Oversized Graphic Tee-7.jpg';
import og8 from '../assets/Oversized Graphic Tee-8.jpg';
import og9 from '../assets/Oversized Graphic Tee-9.jpg';

// Crop Top
import cropAll from '../assets/Crop Tee-all.jpg';
import cropBlack from '../assets/Crop Tee-1.jpg';
import cropWhite from '../assets/Crop Tee-2.jpg';
import cropBrown from '../assets/Crop Tee-3.jpg';

// Essential Rib Tee
import ribAsh from '../assets/Rib Tee - ash.jpg';
import ribBlack from '../assets/Rib Tee - Black.jpg';
import ribLightAsh from '../assets/Rib Tee - lightash.jpg';
import ribPink from '../assets/Rib Tee - pink.jpg';
import ribRed from '../assets/Rib Tee - red.jpg';
import ribWhite from '../assets/Rib Tee - white.jpg';

// Longline Pocket Tee
import pocketBurgundy from '../assets/Longline Pocket Tee-1.jpg';
import pocketCharcoal from '../assets/Longline Pocket Tee-2.jpg';
import pocketWhite from '../assets/Longline Pocket Tee-3.jpg';

// Classic Pullover Hoodie
import hoodieNavy from '../assets/Classic Pullover Hoodie-1.jpg';
import hoodieBlack from '../assets/Classic Pullover Hoodie-2.jpg';
import hoodieBeige from '../assets/Classic Pullover Hoodie-3.jpg';
import hoodiePink from '../assets/Classic Pullover Hoodie-4.jpg';
import hoodieBlue from '../assets/Classic Pullover Hoodie-5.jpg';
import hoodieBrown from '../assets/Classic Pullover Hoodie-6.jpg';

// Zip-Up Tech Hoodie
import techBurgundy from '../assets/Zip-Up Tech Hoodie-3.jpg';
import techSlate from '../assets/Zip-Up Tech Hoodie-4.jpg';

/* ── mock product data per category ── */
const categoryData = {
  't-shirts': {
    label: 'T-Shirts',
    products: [
      {
        id: 1,
        name: 'Classic White Tee',
        price: 29,
        img: classicWhite,
        colors: [
          { hex: '#ffffff', img: classicWhite, label: 'White' },
          { hex: '#111111', img: classicBlack, label: 'Black' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 2,
        name: 'Washed Black Tee',
        price: 34,
        img: washedBlack1,
        colors: [
          { hex: '#1a1a1a', img: washedBlack1, label: 'Black' },
          { hex: '#3b3b3b', img: washedBlack2, label: 'Washed' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      { id: 3, name: 'Oversized Graphic Tee', price: 39, img: og1,
        colors: [
          { img: og1, label: 'Design 1' },
          { img: og2, label: 'Design 2' },
          { img: og3, label: 'Design 3' },
          { img: og4, label: 'Design 4' },
          { img: og5, label: 'Design 5' },
          { img: og6, label: 'Design 6' },
          { img: og7, label: 'Design 7' },
          { img: og8, label: 'Design 8' },
          { img: og9, label: 'Design 9' },
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
      {
        id: 4,
        name: 'Crop Top',
        price: 32,
        img: cropAll,
        colors: [
          { hex: '#111111', img: cropBlack, label: 'Black' },
          { hex: '#ffffff', img: cropWhite, label: 'White' },
          { hex: '#4c3026', img: cropBrown, label: 'Brown' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 5,
        name: 'Essential Rib Tee',
        price: 27,
        img: ribAsh,
        colors: [
          { hex: '#7a7a7a', img: ribAsh, label: 'Ash' },
          { hex: '#111111', img: ribBlack, label: 'Black' },
          { hex: '#bebebe', img: ribLightAsh, label: 'Light Ash' },
          { hex: '#e9b5b5', img: ribPink, label: 'Pink' },
          { hex: '#b91c1c', img: ribRed, label: 'Red' },
          { hex: '#ffffff', img: ribWhite, label: 'White' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 6,
        name: 'Longline Pocket Tee',
        price: 36,
        img: pocketBurgundy,
        colors: [
          { hex: '#752531', img: pocketBurgundy, label: 'Burgundy' },
          { hex: '#3d3c42', img: pocketCharcoal, label: 'Charcoal' },
          { hex: '#ffffff', img: pocketWhite, label: 'White' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  'hoodies': {
    label: 'Hoodies',
    products: [
      {
        id: 1,
        name: 'Classic Pullover Hoodie',
        price: 59,
        img: hoodieNavy,
        colors: [
          { hex: '#1c2d42', img: hoodieNavy, label: 'Navy' },
          { hex: '#1e1e20', img: hoodieBlack, label: 'Black' },
          { hex: '#d4c6bc', img: hoodieBeige, label: 'Beige' },
          { hex: '#c55c8f', img: hoodiePink, label: 'Pink' },
          { hex: '#2b84b5', img: hoodieBlue, label: 'Blue' },
          { hex: '#634c41', img: hoodieBrown, label: 'Brown' },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        id: 2,
        name: 'Zip-Up Tech Hoodie',
        price: 69,
        img: techBurgundy,
        colors: [
          { hex: '#3c2125', img: techBurgundy, label: 'Burgundy' },
          { hex: '#37424d', img: techSlate, label: 'Slate Blue' },
        ],
        sizes: ['M', 'L', 'XL'],
      },
    ],
  },
  'jackets': {
    label: 'Jackets',
    products: [
      { id: 1, name: 'Field Jacket – Burnt Clay', price: 149, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600', colors: null, sizes: ['S', 'M', 'L', 'XL'] },
      { id: 2, name: 'Leather Moto Jacket',       price: 199, img: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=600', colors: null, sizes: ['S', 'M', 'L', 'XL'] },
    ],
  },
  'accessories': {
    label: 'Accessories',
    products: [
      { id: 1, name: 'Merino Beanie',   price: 24, img: 'https://images.unsplash.com/photo-1510639077-A0B83FE4B67E?q=80&w=600', colors: null, sizes: ['One Size'] },
      { id: 2, name: 'Canvas Tote Bag', price: 19, img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600', colors: null, sizes: ['One Size'], link: '/tote-bags' },
    ],
  },
};

/* ── price filter ranges ── */
const priceRanges = [
  { label: 'All',        min: 0,   max: Infinity },
  { label: 'Under $30',  min: 0,   max: 30 },
  { label: '$30 – $60',  min: 30,  max: 60 },
  { label: '$60 – $120', min: 60,  max: 120 },
  { label: 'Over $120',  min: 120, max: Infinity },
];

/* ── product card ── */
function ProductCard({ product }) {
  const navigate = useNavigate();

  // if product has color variants, start with the matching color if it exists; otherwise null (e.g. group image)
  const [selectedColor, setSelectedColor] = useState(() => {
    if (product.colors) {
      return product.colors.find(c => c.img === product.img) || null;
    }
    return null;
  });
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded]               = useState(false);

  // displayed image: color-specific if available, else default
  const displayImg = selectedColor ? selectedColor.img : product.img;

  function handleColorClick(color) {
    setSelectedColor(color);
  }

  function handleAdd() {
    if (!selectedSize) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="cp-card">
      {/* image — swaps on color click */}
      <div
        className="cp-img-wrap"
        style={product.link ? { cursor: 'pointer' } : {}}
        onClick={() => product.link && navigate(product.link)}
      >
        <img
          src={displayImg}
          alt={product.name}
          className="cp-img-fade"
          key={displayImg} /* remount triggers CSS fade */
        />
        {product.link && <div className="cp-img-link-hint">View Collection →</div>}
      </div>

      <div className="cp-info">
        <h3
          style={product.link ? { cursor: 'pointer', textDecoration: 'underline' } : {}}
          onClick={() => product.link && navigate(product.link)}
        >
          {product.name}
        </h3>
        <p className="cp-price">${product.price}</p>

        {/* Color swatches — only shown when product has color variants */}
        {product.colors && (
          <div className="cp-section">
            <span className="cp-label">
              {product.colors[0].hex ? 'Color' : 'Design'} — <span className="cp-color-name">{selectedColor?.label || 'All'}</span>
            </span>
            <div className="cp-colors">
              {product.colors.map((c) => (
                'hex' in c ? (
                  /* plain color dot */
                  <button
                    key={c.hex}
                    className={`cp-color-swatch ${selectedColor?.hex === c.hex ? 'active' : ''}`}
                    style={{ background: c.hex }}
                    onClick={() => handleColorClick(c)}
                    aria-label={c.label}
                    title={c.label}
                  />
                ) : (
                  /* thumbnail swatch */
                  <button
                    key={c.img}
                    className={`cp-thumb-swatch ${selectedColor?.img === c.img ? 'active' : ''}`}
                    onClick={() => handleColorClick(c)}
                    aria-label={c.label}
                    title={c.label}
                  >
                    <img src={c.img} alt={c.label} />
                  </button>
                )
              ))}
            </div>
          </div>
        )}

        {/* Size selector */}
        <div className="cp-section">
          <span className="cp-label">Size</span>
          <div className="cp-sizes">
            {product.sizes.map((s) => (
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

/* ── main page ── */
function CategoryPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const data       = categoryData[slug];

  const [priceIdx,   setPriceIdx]   = useState(0);
  const [sizeFilter, setSizeFilter] = useState('All');

  if (!data) {
    return (
      <div className="cp-not-found">
        <p>Category not found.</p>
        <button onClick={() => navigate('/')}>← Back home</button>
      </div>
    );
  }

  const allSizes = ['All', ...new Set(data.products.flatMap((p) => p.sizes))];
  const range    = priceRanges[priceIdx];

  const filtered = data.products.filter((p) => {
    const inPrice = p.price >= range.min && p.price < range.max;
    const inSize  = sizeFilter === 'All' || p.sizes.includes(sizeFilter);
    return inPrice && inSize;
  });

  return (
    <div className="cp-page">
      <div className="cp-topbar">
        <button className="cp-back" onClick={() => navigate('/')}>← Back</button>
        <h1>{data.label}</h1>
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
          <div className="cp-filter-group">
            <h4>Size</h4>
            {allSizes.map((s) => (
              <label key={s} className="cp-radio">
                <input type="radio" name="size" checked={sizeFilter === s} onChange={() => setSizeFilter(s)} />
                {s}
              </label>
            ))}
          </div>
        </aside>

        <main className="cp-grid">
          {filtered.length === 0 ? (
            <p className="cp-empty">No products match your filters.</p>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </main>
      </div>
    </div>
  );
}

export default CategoryPage;
