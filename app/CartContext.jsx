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
      console.log(existingProductIndex);  
      if (existingProductIndex!==-1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity = 1; // Increment the quantity

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        
      
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
             
        }
            
      }

    case 'REMOVE_FROM_CART':
      const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);

      return {
        ...state,
        cart: updatedCart,
      };

    case 'INCREMENT_QUANTITY':
      const incrementedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity + 1 > item.itemsInStock) {
            alert('Selected number of items not available right now');
            return item;
          } else {
            return { ...item, quantity: item.quantity + 1 };
          }
        } else {
          return item;
        }
      });

      return {
        ...state,
        cart: incrementedCart,
      };

    case 'DECREMENT_QUANTITY':
      const decrementedCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          if (item.quantity - 1 < 0) {
            alert('Item quantity cannot be less than zero');
            return item;
          } else {
            return { ...item, quantity: Math.max(item.quantity - 1, 0) };
          }
        } else {
          return item;
        }
      });

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
