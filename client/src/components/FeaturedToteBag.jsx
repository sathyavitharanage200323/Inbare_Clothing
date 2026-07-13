import { useNavigate } from 'react-router-dom';
import './FeaturedToteBag.css';

function FeaturedToteBag() {
  const navigate = useNavigate();

  return (
    <section className="ftb-section">
      <div className="ftb-container">
        {/* image side */}
        <div className="ftb-img-wrap" onClick={() => navigate('/tote-bags')}>
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800"
            alt="Canvas Tote Bag"
            className="ftb-img"
          />
          <div className="ftb-overlay">
            <span className="ftb-view-link">View Collection →</span>
          </div>
        </div>

        {/* info side */}
        <div className="ftb-info">
          <p className="ftb-eyebrow">Featured Accessory</p>
          <h2 className="ftb-title">Canvas Tote Bag</h2>

          <p className="ftb-desc">
            Essential carry piece crafted from durable canvas. 
            Minimalist design, maximum utility — perfect for everyday errands or weekend markets.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FeaturedToteBag;
