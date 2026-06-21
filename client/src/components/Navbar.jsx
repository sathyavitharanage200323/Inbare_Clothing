import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, X, Menu, ClipboardList, UserCircle } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [query,       setQuery]       = useState('');
  const [email,       setEmail]       = useState('');
  const [newsletter,  setNewsletter]  = useState(false);

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  }

  function handleEmailSubmit(e) {
    e.preventDefault();
    // hook up to auth later
    console.log('sign in with:', email, '| newsletter:', newsletter);
  }

  return (
    <>
      <header className="nb-header">
        {/* left — nav links */}
        <nav className="nb-nav">
          <Link to="/">Home</Link>
          <Link to="/category/t-shirts">T-Shirts</Link>
          <Link to="/category/hoodies">Hoodies</Link>
          <Link to="/category/jackets">Jackets</Link>
          <Link to="/category/accessories">Accessories</Link>
        </nav>

        {/* center — logo */}
        <Link to="/" className="nb-logo">INBARE</Link>

        {/* right — icons */}
        <div className="nb-icons">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Account" onClick={() => setAccountOpen(true)}>
            <User size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Bag" className="nb-bag">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button className="nb-hamburger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ── account modal ── */}
      {accountOpen && (
        <div className="nb-modal-overlay" onClick={() => setAccountOpen(false)}>
          <div className="nb-modal" onClick={(e) => e.stopPropagation()}>
            {/* header */}
            <div className="nb-modal-header">
              <h2>Sign in or create account</h2>
              <button className="nb-modal-close" onClick={() => setAccountOpen(false)} aria-label="Close">
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* sign in with shop */}
            <button className="nb-shop-btn">
              Sign in with shop
            </button>

            {/* divider */}
            <div className="nb-divider"><span>OR</span></div>

            {/* email form */}
            <form className="nb-email-form" onSubmit={handleEmailSubmit}>
              <div className="nb-email-wrap">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Continue">→</button>
              </div>
              <label className="nb-newsletter-label">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
                Email me with news and offers
              </label>
            </form>

            {/* quick links */}
            <div className="nb-modal-links">
              <button onClick={() => { navigate('/orders');  setAccountOpen(false); }}>
                <ClipboardList size={18} strokeWidth={1.5} />
                Orders
              </button>
              <button onClick={() => { navigate('/profile'); setAccountOpen(false); }}>
                <UserCircle size={18} strokeWidth={1.5} />
                Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── search overlay ── */}
      {searchOpen && (
        <div className="nb-search-overlay">
          <form onSubmit={handleSearch} className="nb-search-form">
            <Search size={20} strokeWidth={1.5} className="nb-search-icon" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="nb-search-input"
            />
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close">
              <X size={20} strokeWidth={1.5} />
            </button>
          </form>
        </div>
      )}

      {/* ── mobile drawer ── */}
      {menuOpen && (
        <div className="nb-drawer-overlay" onClick={() => setMenuOpen(false)}>
          <nav className="nb-drawer" onClick={(e) => e.stopPropagation()}>
            <button className="nb-drawer-close" onClick={() => setMenuOpen(false)}>
              <X size={22} strokeWidth={1.5} />
            </button>
            <Link to="/"                     onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/category/t-shirts"    onClick={() => setMenuOpen(false)}>T-Shirts</Link>
            <Link to="/category/hoodies"     onClick={() => setMenuOpen(false)}>Hoodies</Link>
            <Link to="/category/jackets"     onClick={() => setMenuOpen(false)}>Jackets</Link>
            <Link to="/category/accessories" onClick={() => setMenuOpen(false)}>Accessories</Link>
          </nav>
        </div>
      )}
    </>
  );
}

export default Navbar;
