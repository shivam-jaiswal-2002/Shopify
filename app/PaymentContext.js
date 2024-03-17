"use client";
import React, { createContext, useContext, useReducer } from 'react';

const PaymentContext = createContext();

const initialState = {
  products: [],
};

const paymentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_PAYMENT':
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    default:
      return state;
  }
};

const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  const addToPayment = (product) => {
    dispatch({ type: 'ADD_TO_PAYMENT', payload: product });
  };

  return (
    <PaymentContext.Provider
      value={{
        state,
        addToPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export { PaymentProvider, usePayment };
