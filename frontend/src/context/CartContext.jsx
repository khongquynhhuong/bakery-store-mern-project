import React, { createContext, useContext, useCallback, useEffect, useState } from "react";

const CART_STORAGE_KEY = "bakery_cart";

function parsePrice(priceStr) {
  if (!priceStr || typeof priceStr !== "string") return 0;
  const num = parseInt(priceStr.replace(/[.\sđ]/g, ""), 10);
  return isNaN(num) ? 0 : num;
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Cart persist failed", e);
    }
  }, [items]);

  const addToCart = useCallback((cake) => {
    if (!cake || !cake._id) return;
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === cake._id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], quantity: next[i].quantity + 1 };
        return next;
      }
      return [
        ...prev,
        {
          id: cake._id,
          name: cake.name,
          price: cake.price,
          priceRaw: parsePrice(cake.price),
          image: cake.image || "",
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const updateQuantity = useCallback((id, delta) => {
    setItems((prev) =>
      prev
        .map((x) =>
          x.id === id
            ? { ...x, quantity: Math.max(0, x.quantity + delta) }
            : x
        )
        .filter((x) => x.quantity > 0)
    );
  }, []);

  const getCount = useCallback(() => {
    return items.reduce((sum, x) => sum + x.quantity, 0);
  }, [items]);

  const getTotal = useCallback(() => {
    return items.reduce((sum, x) => sum + x.priceRaw * x.quantity, 0);
  }, [items]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCount,
    getTotal,
    clearCart,
    parsePrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
