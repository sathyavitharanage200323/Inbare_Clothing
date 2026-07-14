import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, X, Menu, ClipboardList, UserCircle, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { setCartOpen, totalItems } = useCart();
  const { user, logout } = useAuth();
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [query,       setQuery]       = useState('');

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery('');
    }
  }

  async function handleLogout() {
    await logout();
    setAccountOpen(false);
    navigate('/');
  }

  return (
    <>
      <header className="nb-header">
        <nav className="nb-nav">
          <Link to="/">Home</Link>
          <Link to="/category/t-shirts">T-Shirts</Link>
          <Link to="/category/hoodies">Hoodies</Link>
          <Link to="/category/jackets">Jackets</Link>
          <Link to="/category/accessories">Accessories</Link>
        </nav>

        <Link to="/" className="nb-logo">INBARE</Link>

        <div className="nb-icons">
          <button aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Account" onClick={() => setAccountOpen(true)}>
            <User size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Bag" className="nb-bag" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && <span className="nb-bag-count">{totalItems}</span>}
          </button>
          <button className="nb-hamburger" aria-label="Menu" onClick={() => setMenuOpen(true)}>
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {accountOpen && (
        <div className="nb-modal-overlay" onClick={() => setAccountOpen(false)}>
          <div className="nb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="nb-modal-header">
              <h2>{user ? `Hi, ${user.firstName}` : 'Sign in or create account'}</h2>
              <button className="nb-modal-close" onClick={() => setAccountOpen(false)} aria-label="Close">
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div className="nb-modal-links">
              {user ? (
                <>
                  <button onClick={() => { navigate('/profile'); setAccountOpen(false); }}>
                    <UserCircle size={18} strokeWidth={1.5} />
                    Profile
                  </button>
                  <button onClick={() => { navigate('/profile'); setAccountOpen(false); }}>
                    <ClipboardList size={18} strokeWidth={1.5} />
                    Orders
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut size={18} strokeWidth={1.5} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { navigate('/signin'); setAccountOpen(false); }}>
                    <UserCircle size={18} strokeWidth={1.5} />
                    Sign In
                  </button>
                  <button onClick={() => { navigate('/signup'); setAccountOpen(false); }}>
                    <UserCircle size={18} strokeWidth={1.5} />
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

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
