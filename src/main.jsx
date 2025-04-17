import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from "./context/ProductContext";
import { ModalProvider } from './context/ModalContext.jsx';
import { CheckoutProvider } from './context/CheckoutContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <CheckoutProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </CheckoutProvider>
      </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
