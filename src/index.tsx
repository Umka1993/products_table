import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import ProductsContext from './context';
import App from './components/App';
import { ICategory, ISortParameter, Product } from './types';

const defaultSort: ISortParameter = {
  sorting: 'default',
  templateName: '',
};

const Main = () => {
  const [categories, setCategories] = useState<ICategory[]>();
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>();
  const [products, setProducts] = useState<Product[]>();
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<ISortParameter>(defaultSort);

  async function getProducts() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}products`);
    const data: Product[] = await response.json();
    setProducts(data);
  }

  async function getCategories() {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}product/categories/`);
    const data: ICategory[] = await response.json();
    setCategories(data);
  }

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        basketProducts,
        setBasketProducts,
        sort,
        setSort,
        categories,
        setCategories,
        filteredCategories,
        setFilteredCategories,
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
