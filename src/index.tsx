import React, { useState } from 'react';
import { render } from 'react-dom';
import ProductsContext from './context';
import App from './components/App';
import { IBasketProduct, Product } from './types';

const Main = () => {
  const [products, setProducts] = useState<Product[]>();
  const [basketProducts, setBasketProducts] = useState<IBasketProduct[]>([]);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        setProducts,
        basketProducts: basketProducts,
        setBasketProducts,
      }}
    >
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
