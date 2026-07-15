import { useNavigate } from 'react-router-dom';

function Lookbook() {
  const navigate = useNavigate();

  return (
    <section className="lookbook">
      <img
        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000"
        alt="Lookbook"
        className="lookbook-bg"
      />

      <div className="lookbook-overlay"></div>

      <div className="lookbook-content">
        <span>INBARE COLLECTION 2026</span>

        <h2>
          BUILT FOR
          <br />
          THE FEARLESS
        </h2>

        <p>
          Modern streetwear designed for creators,
          dreamers, and rule breakers.
        </p>

        <button onClick={() => navigate('/category/jackets')}>EXPLORE COLLECTION</button>
      </div>
    </section>
  );
}

export default Lookbook;
