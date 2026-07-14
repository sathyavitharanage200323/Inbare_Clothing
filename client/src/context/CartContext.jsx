import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            const saved = localStorage.getItem('guestCart');
            setItems(saved ? JSON.parse(saved) : []);
            return;
        }
        try {
            const res = await api.get('/cart');
            setItems(res.data.cart.items || []);
        } catch {
            setItems([]);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            localStorage.setItem('guestCart', JSON.stringify(items));
        }
    }, [items]);

    async function addToCart(product) {
        const token = localStorage.getItem('token');
        if (!token) {
            setItems((prev) => {
                const existing = prev.find(
                    (item) => item.productId === product.productId && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize
                );
                if (existing) {
                    return prev.map((item) =>
                        item.productId === product.productId && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    );
                }
                return [...prev, { ...product, qty: 1 }];
            });
            return;
        }
        setLoading(true);
        try {
            const res = await api.post('/cart/add', {
                productId: product.productId,
                quantity: 1,
                size: product.selectedSize || '',
                color: typeof product.selectedColor === 'object' ? (product.selectedColor?.label || '') : (product.selectedColor || ''),
            });
            setItems(res.data.cart.items);
        } catch (err) {
            console.error('Add to cart failed:', err);
        } finally {
            setLoading(false);
        }
    }

    async function removeFromCart(productId, selectedColor, selectedSize) {
        const token = localStorage.getItem('token');
        if (!token) {
            setItems((prev) => prev.filter(
                (item) => !(item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
            ));
            return;
        }
        try {
            const color = typeof selectedColor === 'object' ? (selectedColor?.label || '') : (selectedColor || '');
            const size = selectedSize || '';
            const res = await api.delete(`/cart/item/${encodeURIComponent(productId)}/${encodeURIComponent(size)}/${encodeURIComponent(color)}`);
            setItems(res.data.cart.items);
        } catch (err) {
            console.error('Remove from cart failed:', err);
        }
    }

    async function updateQty(productId, selectedColor, selectedSize, qty) {
        if (qty <= 0) {
            removeFromCart(productId, selectedColor, selectedSize);
            return;
        }
        const token = localStorage.getItem('token');
        if (!token) {
            setItems((prev) =>
                prev.map((item) =>
                    item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize
                        ? { ...item, qty }
                        : item
                )
            );
            return;
        }
        try {
            const color = typeof selectedColor === 'object' ? (selectedColor?.label || '') : (selectedColor || '');
            const size = selectedSize || '';
            const res = await api.put(`/cart/item/${encodeURIComponent(productId)}/${encodeURIComponent(size)}/${encodeURIComponent(color)}`, { quantity: qty });
            setItems(res.data.cart.items);
        } catch (err) {
            console.error('Update cart failed:', err);
        }
    }

    async function clearCart() {
        const token = localStorage.getItem('token');
        if (!token) {
            setItems([]);
            return;
        }
        try {
            await api.delete('/cart/clear');
            setItems([]);
        } catch (err) {
            console.error('Clear cart failed:', err);
        }
    }

    const totalItems = items.reduce((sum, item) => sum + (item.qty || item.quantity || 0), 0);
    const subtotal = items.reduce((sum, item) => sum + (item.price || 0) * (item.qty || item.quantity || 0), 0);

    return (
        <CartContext.Provider
            value={{
                cartOpen,
                setCartOpen,
                items,
                addToCart,
                removeFromCart,
                updateQty,
                clearCart,
                totalItems,
                subtotal,
                loading,
                fetchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}
