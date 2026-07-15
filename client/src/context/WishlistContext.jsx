import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchWishlist = useCallback(async () => {
        if (!user) {
            setItems([]);
            return;
        }
        setLoading(true);
        try {
            const res = await api.get('/wishlist/my');
            setItems(res.data.wishlist?.products || []);
        } catch {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    async function toggleWishlist(productId) {
        if (!user) return;
        try {
            const res = await api.post('/wishlist/toggle', { productId });
            setItems(res.data.wishlist?.products || []);
            return res.data;
        } catch (err) {
            console.error('Toggle wishlist failed:', err);
        }
    }

    function isInWishlist(productId) {
        return items.some((p) => (p._id || p) === productId);
    }

    return (
        <WishlistContext.Provider value={{ items, loading, toggleWishlist, isInWishlist, fetchWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used within WishlistProvider');
    return context;
}
