import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import tot1  from '../assets/tot-1.jpg';
import tot2  from '../assets/tot-2.jpg';
import tot3  from '../assets/tot-3.jpg';
import tot4  from '../assets/tot-4.jpg';
import tot5  from '../assets/tot-5.jpg';
import tot6  from '../assets/tot-6.jpg';
import tot7  from '../assets/tot-7.jpg';
import tot8  from '../assets/tot-8.jpg';
import tot9  from '../assets/tot-9.jpg';
import tot10 from '../assets/tot-10.jpg';
import './ToteBags.css';

const totes = [
  { id: 1,  name: 'The Natural Tote',      price: 19, img: tot1,  colors: ['#c8a97e','#ffffff','#000000'], sizes: ['One Size'] },
  { id: 2,  name: 'Washed Canvas Tote',    price: 22, img: tot2,  colors: ['#e8dcc8','#1f2937'],           sizes: ['One Size'] },
  { id: 3,  name: 'Heritage Carry Bag',    price: 25, img: tot3,  colors: ['#92400e','#000000','#ffffff'], sizes: ['One Size'] },
  { id: 4,  name: 'Minimal Market Tote',   price: 21, img: tot4,  colors: ['#ffffff','#6b7280','#000000'], sizes: ['One Size'] },
  { id: 5,  name: 'Linen Everyday Bag',    price: 28, img: tot5,  colors: ['#d4c5a9','#000000'],           sizes: ['One Size'] },
  { id: 6,  name: 'Studio Tote',           price: 32, img: tot6,  colors: ['#000000','#ffffff','#b45309'], sizes: ['One Size'] },
  { id: 7,  name: 'Archive Shopper',       price: 27, img: tot7,  colors: ['#9ca3af','#1f2937','#ffffff'], sizes: ['One Size'] },
  { id: 8,  name: 'Raw Edge Carry-All',    price: 24, img: tot8,  colors: ['#c8a97e','#4b5563'],           sizes: ['One Size'] },
  { id: 9,  name: 'Atelier Tote',          price: 35, img: tot9,  colors: ['#000000','#f5f0e8'],           sizes: ['One Size'] },
  { id: 10, name: 'Grand Market Bag',      price: 29, img: tot10, colors: ['#ffffff','#000000','#92400e'], sizes: ['One Size'] },
];

/* ── individual card ── */
function ToteCard({ tote }) {
  const [color,  setColor]  = useState(tote.colors[0]); // auto-select first color
  const [size,   setSize]   = useState(tote.sizes[0]);   // auto-select first size
  const [added,  setAdded]  = useState(false);
  const [hover,  setHover]  = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <article
      className={`tb-card ${hover ? 'hovered' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* image */}
      <div className="tb-img-wrap">
        <img src={tote.img} alt={tote.name} className="tb-img" />
        <div className="tb-img-overlay" />
      </div>

      {/* info panel */}
      <div className="tb-body">
        <div className="tb-top-row">
          <h3 className="tb-name">{tote.name}</h3>
          <span className="tb-price">${tote.price}</span>
        </div>

        {/* sizes */}
        <div className="tb-section">
          <p className="tb-label">Size</p>
          <div className="tb-sizes">
            {tote.sizes.map((s) => (
              <button
                key={s}
                className={`tb-size ${size === s ? 'active' : ''}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* add to bag */}
        <button
          className={`tb-add ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? (
            <><Check size={16} strokeWidth={2.5} /> Added to bag</>
          ) : (
            <><ShoppingBag size={16} strokeWidth={1.8} /> Add to bag</>
          )}
        </button>
      </div>
    </article>
  );
}

/* ── page ── */
export default function ToteBags() {
  const navigate = useNavigate();

  return (
    <div className="tb-page">
      {/* hero banner */}
      <div className="tb-hero">
        <div className="tb-hero-content">
          <p className="tb-eyebrow">The Accessory Edit</p>
          <h1 className="tb-hero-title">Canvas Tote Bags</h1>
          <p className="tb-hero-sub">
            Atelier-crafted carry pieces. Each bag is cut from single-weight canvas
            and finished by hand — made to last, made to be seen.
          </p>
        </div>
      </div>

      {/* back + count row */}
      <div className="tb-bar">
        <button className="tb-back" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} strokeWidth={2} /> Back
        </button>
        <span className="tb-total">{totes.length} pieces</span>
      </div>

      {/* grid */}
      <section className="tb-grid">
        {totes.map((t) => (
          <ToteCard key={t.id} tote={t} />
        ))}
      </section>
    </div>
  );
}
