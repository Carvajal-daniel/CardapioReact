import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { OpenProvider } from './context/ContextOpen';
import { ProductProvider } from './context/CardProduct';

createRoot(document.getElementById('root')).render(
  <OpenProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </OpenProvider>
);
