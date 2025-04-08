import React, { createContext, useState } from 'react';

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [productTerm, setProductTerm] = useState('');

  return (
    <ProductContext.Provider value={{ productTerm, setProductTerm }}>
      {children}
    </ProductContext.Provider>
  );
};
