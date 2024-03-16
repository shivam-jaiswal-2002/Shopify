// CartContext.jsx
"use client";
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cart: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.cart.findIndex((item) => item.id === action.payload.id);

      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity = 1;

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);

      return {
        ...state,
        cart: updatedCart,
      };

    case 'INCREMENT_QUANTITY':
      const incrementedCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      return {
        ...state,
        cart: incrementedCart,
      };

    case 'DECREMENT_QUANTITY':
      const decrementedCart = state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      );

      return {
        ...state,
        cart: decrementedCart,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const incrementQuantity = (productId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: { id: productId } });
  };

  const decrementQuantity = (productId) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: { id: productId } });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
