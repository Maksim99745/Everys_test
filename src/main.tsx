import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductsPage } from '@/pages/products';
import '@/app/styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ProductsPage />
  </StrictMode>
);
