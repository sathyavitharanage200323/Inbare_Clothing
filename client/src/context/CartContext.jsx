import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([]);

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(id, selectedColor, selectedSize) {
    setItems((prev) => prev.filter(
      (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
    ));
  }

  function updateQty(id, selectedColor, selectedSize, qty) {
    if (qty <= 0) {
      removeFromCart(id, selectedColor, selectedSize);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
          ? { ...item, qty }
          : item
      )
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartOpen,
        setCartOpen,
        items,
        addToCart,
        removeFromCart,
        updateQty,
        totalItems,
        subtotal,
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
