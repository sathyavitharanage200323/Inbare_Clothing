import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
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
// Hoodie
import hoodieImg from '../assets/Hoodie.jpg';

// Jhumkas
import jhumka1 from '../assets/Jhumka-1.jpg';
import jhumka2 from '../assets/Jhumka-2.jpg';
import jhumka3 from '../assets/Jhumka-3.jpg';
import jhumka4 from '../assets/Jhumka-4.jpg';
import jhumka5 from '../assets/Jhumka-5.jpg';
import jhumka6 from '../assets/Jhumka-6.jpg';
import jhumka61 from '../assets/Jhumka-6.1.jpg';
import jhumka62 from '../assets/Jhumka-6.2.jpg';
import jhumka63 from '../assets/Jhumka-6.3.jpg';
import jhumka7 from '../assets/Jhumka-7.jpg';
import jhumka8 from '../assets/Jhumka-8.jpg';
import jhumka9 from '../assets/Jhumka-9.jpg';
import jhumka10 from '../assets/Jhumka-10.jpg';

// Necklaces
import n1 from '../assets/N-1.jpg';
import n2 from '../assets/N-2.jpg';
import n3 from '../assets/N-3.jpg';
import n4 from '../assets/N-4.jpg';
import n5 from '../assets/N-5.jpg';

// Desi Bangles
import b1 from '../assets/b-1.jpg';
import b2 from '../assets/b-2.jpg';
import b3 from '../assets/b-3.jpg';
import b4 from '../assets/b-4.jpg';
import b5 from '../assets/b-5.jpg';
import b6 from '../assets/b-6.jpg';

// Earrings
import acc1 from '../assets/Accessories-1.jpg';
import acc2 from '../assets/Accessories-2.jpg';
import acc3 from '../assets/Accessories-3.jpg';
import acc4 from '../assets/Accessories-4.jpg';
import acc5 from '../assets/Accessories-5.jpg';

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
        price: 3500,
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
        price: 3800,
        img: washedBlack1,
        colors: [
          { hex: '#1a1a1a', img: washedBlack1, label: 'Black' },
          { hex: '#3b3b3b', img: washedBlack2, label: 'Washed' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      { id: 3, name: 'Oversized Graphic Tee', price: 4200, img: og1,
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
        price: 3600,
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
        price: 3200,
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
        price: 3900,
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
        price: 5500,
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
        price: 6000,
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
      { id: 1, name: 'Field Jacket – Burnt Clay', price: 6000, img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600', colors: null, sizes: ['S', 'M', 'L', 'XL'] },
      { id: 2, name: 'Leather Moto Jacket',       price: 6000, img: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=600', colors: null, sizes: ['S', 'M', 'L', 'XL'] },
    ],
  },
  'accessories': {
    label: 'Accessories',
    products: [
      {
        id: 1,
        name: 'Jhumkas',
        price: 4500,
        img: jhumka1,
        colors: [
          { img: jhumka1, label: 'Design 1' },
          { img: jhumka2, label: 'Design 2' },
          { img: jhumka3, label: 'Design 3' },
          { img: jhumka4, label: 'Design 4' },
          { img: jhumka5, label: 'Design 5' },
          { img: jhumka6, label: 'Design 6' },
          { img: jhumka7, label: 'Design 7' },
          { img: jhumka8, label: 'Design 8' },
          { img: jhumka9, label: 'Design 9' },
          { img: jhumka10, label: 'Design 10' },
        ],
        sizes: ['One Size'],
      },
      {
        id: 2,
        name: 'Necklaces',
        price: 5200,
        img: n1,
        colors: [
          { img: n1, label: 'Design 1' },
          { img: n2, label: 'Design 2' },
          { img: n3, label: 'Design 3' },
          { img: n4, label: 'Design 4' },
          { img: n5, label: 'Design 5' },
        ],
        sizes: ['One Size'],
      },
      {
        id: 3,
        name: 'Desi Bangle',
        price: 3800,
        img: b1,
        colors: [
          { img: b1, label: 'Design 1' },
          { img: b2, label: 'Design 2' },
          { img: b3, label: 'Design 3' },
          { img: b4, label: 'Design 4' },
          { img: b5, label: 'Design 5' },
          { img: b6, label: 'Design 6' },
        ],
        sizes: ['One Size'],
      },
      {
        id: 4,
        name: 'Earrings',
        price: 4200,
        img: acc1,
        colors: [
          { img: acc1, label: 'Design 1' },
          { img: acc2, label: 'Design 2' },
          { img: acc3, label: 'Design 3' },
          { img: acc4, label: 'Design 4' },
          { img: acc5, label: 'Design 5' },
        ],
        sizes: ['One Size'],
      },
    ],
  },
};

/* ── price filter ranges ── */
const priceRanges = [
  { label: 'All',               min: 0,    max: Infinity },
  { label: 'Under LKR 3,500',   min: 0,    max: 3500 },
  { label: 'LKR 3,500 – 4,500', min: 3500, max: 4500 },
  { label: 'LKR 4,500 – 5,500', min: 4500, max: 5500 },
  { label: 'Over LKR 5,500',    min: 5500, max: Infinity },
];

/* ── product card ── */
function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart, setCartOpen } = useCart();

  // if product has color variants, start with the first one
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );
  
  // auto-select size if only "One Size" exists
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.length === 1 && product.sizes[0] === 'One Size' ? 'One Size' : null
  );
  
  const [added, setAdded] = useState(false);

  // displayed image: color-specific if available, else default
  const displayImg = selectedColor ? selectedColor.img : product.img;

  function handleColorClick(color) {
    setSelectedColor(color);
  }

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
      setCartOpen(true); // open cart drawer after brief delay
    }, 600);
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
        <p className="cp-price">LKR {product.price.toLocaleString('en-US')}</p>

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

        {/* Size selector — only show if not "One Size" */}
        {!(product.sizes.length === 1 && product.sizes[0] === 'One Size') && (
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
    <>
      <CartDrawer />
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
    </>
  );
}

export default CategoryPage;
