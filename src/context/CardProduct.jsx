import { createContext, useState } from "react";

const ContextProduct = createContext();

const ProductProvider = ({ children }) => {
  const [nameProduct, setNameProduct] = useState('Burgers');

  
  return (
    <ContextProduct.Provider value={{ nameProduct, setNameProduct }}>
      {children}
    </ContextProduct.Provider>
  );
};

export { ContextProduct, ProductProvider };
