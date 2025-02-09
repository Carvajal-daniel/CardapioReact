import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { OpenProvider } from './context/ContextOpen';
import { ProductProvider } from './context/CardProduct';
import { OpenModalCard } from './context/OpenModal';

createRoot(document.getElementById('root')).render(
  <OpenProvider>
    <ProductProvider>
      <OpenModalCard>
        <App />
      </OpenModalCard>
    </ProductProvider>
  </OpenProvider>
);
