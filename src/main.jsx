import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { OpenProvider } from './context/ContextOpen';
import { ProductProvider } from './context/CardProduct';
import { OpenModalCard } from './context/OpenModal';
import { CartProvider } from './context/ContexCart';

createRoot(document.getElementById('root')).render(

  <OpenProvider>
    <ProductProvider>
      <OpenModalCard>
        <CartProvider>
          <App />
        </CartProvider>
      </OpenModalCard>
    </ProductProvider>
  </OpenProvider>
);
