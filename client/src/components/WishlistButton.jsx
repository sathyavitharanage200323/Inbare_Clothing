import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './WishlistButton.css';

export default function WishlistButton({ productId, className = '' }) {
  const { user } = useAuth();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(productId);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleWishlist(productId);
  }

  return (
    <button
      className={`wl-btn ${active ? 'active' : ''} ${className}`}
      onClick={handleClick}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      title={!user ? 'Sign in to save' : undefined}
    >
      <Heart size={20} strokeWidth={1.5} fill={active ? 'currentColor' : 'none'} />
    </button>
  );
}
