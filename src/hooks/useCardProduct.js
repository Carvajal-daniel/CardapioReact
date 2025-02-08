import { useContext } from 'react';
import { ContextProduct } from '../context/CardProduct'; // Caminho 

export const useProduct = () => {
  return useContext(ContextProduct);
};
