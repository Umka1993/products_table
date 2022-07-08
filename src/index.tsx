import React, { useState } from 'react';
import { render } from 'react-dom';
import ProductsContext from './context';
import App from './components/App';
import { Product } from './types';

const Main = () => {
  const [products, setProducts] = useState<Product[]>();

  return (
    <ProductsContext.Provider value={{ products: products, setProducts }}>
      <App />
    </ProductsContext.Provider>
  );
};

render(
  <>
    <Main />
  </>,
  document.getElementById('root'),
);
