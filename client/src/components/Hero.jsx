function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <img
        src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=1920"
        alt="Fashion Model"
        className="hero-image"
      />

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

        <button className="shop-btn">SHOP NOW</button>
      </div>
    </section>
  );
}

export default Hero;
