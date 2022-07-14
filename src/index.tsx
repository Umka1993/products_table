import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import ProductsContext from './context';
import App from './components/App';
import { ISortParameter, Product } from './types';

const Main = () => {
  useEffect(() => {
    fetch('http://localhost:3001/api/products/')
      .then((response): Promise<Product[]> => response.json())
      .then((json) => {
        // if (setProducts) {
        setProducts(json);
        // }
      });
  }, []);

  const [products, setProducts] = useState<Product[]>();
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);

  const defaultSort: ISortParameter = {
    sorting: 'default',
    templateName: '',
  };
  const [sort, setSort] = useState<ISortParameter>(defaultSort);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        basketProducts,
        setBasketProducts,
        sort,
        setSort,
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
