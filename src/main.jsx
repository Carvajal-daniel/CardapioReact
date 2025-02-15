import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { OpenProvider } from './context/ContextOpen';
import { ProductProvider } from './context/CardProduct';
import { OpenModalCard } from './context/OpenModal';
import { CartProvider } from './context/ContexCart';
import { AlertProvider } from './context/Alerts';

createRoot(document.getElementById('root')).render(

  <OpenProvider>
    <ProductProvider>
      <OpenModalCard>
        <CartProvider>
          <AlertProvider>
            <App />
          </AlertProvider>
        </CartProvider>
      </OpenModalCard>
    </ProductProvider>
  </OpenProvider>
);
