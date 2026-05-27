import { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      // Use cartItemId to differentiate same products with different sizes
      const size = product.size || 'L';
      const cartItemId = `${product.id}-${size}`;
      const existing = prev.find(item => item.cartItemId === cartItemId);
      
      if (existing) {
        return prev.map(item => item.cartItemId === cartItemId 
          ? { ...item, quantity: item.quantity + (product.quantity || 1) } 
          : item
        );
      }
      return [...prev, { ...product, cartItemId, size, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (idOrCartItemId) => setCart(prev => prev.filter(item => {
    const itemIdentifier = item.cartItemId || item.id;
    return itemIdentifier !== idOrCartItemId;
  }));
  
  const updateQuantity = (idOrCartItemId, amount) => {
    setCart(prev => prev.map(item => {
      const itemIdentifier = item.cartItemId || item.id;
      if (itemIdentifier === idOrCartItemId) {
        const newQ = item.quantity + amount;
        return { ...item, quantity: newQ > 0 ? newQ : 1 };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const removeMultipleFromCart = (ids) => setCart(prev => prev.filter(item => {
    const itemIdentifier = item.cartItemId || item.id;
    return !ids.includes(itemIdentifier);
  }));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, removeMultipleFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
