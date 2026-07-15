import { useNavigate } from 'react-router-dom';
import heroVideo from "../assets/hearo.mp4";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">
      {/* Video pinned to the right */}
      <div className="hero-video-wrap">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        />
        {/* Fade from left so text stays readable */}
        <div className="hero-video-fade" />
      </div>

      {/* Dark base so left side is never bare */}
      <div className="hero-bg" />

      <div className="hero-content">
        <p className="tagline">NEW SEASON 2026</p>

        <h1>
          WEAR YOUR
          <br />
          CONFIDENCE
        </h1>

        <p className="description">
          Premium streetwear crafted for those who create their own path.
        </p>

        <button className="shop-btn" onClick={() => navigate('/category/t-shirts')}>SHOP NOW</button>
      </div>
    </section>
  );
}

export default Hero;
