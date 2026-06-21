function FeaturedProducts() {
  return (
    <section className="featured">
      <h2>Featured Collection</h2>

      <div className="products">

        <div className="product-card">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800"
            alt="Oversized Tee"
          />
          <h3>Oversized Tee</h3>
          <span>LKR 4,500</span>
        </div>

        <div className="product-card">
          <img
            src="https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800"
            alt="Urban Hoodie"
          />
          <h3>Urban Hoodie</h3>
          <span>LKR 7,900</span>
        </div>

        <div className="product-card">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
            alt="Classic Jacket"
          />
          <h3>Classic Jacket</h3>
          <span>LKR 9,500</span>
        </div>

      </div>
    </section>
  );
}

export default FeaturedProducts;