import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import ProductsContext from './components/context/productTableContext';
import App from './components/App';
import { ICategory, ISortParameter, Product } from './types';

const defaultSort: ISortParameter = {
  sorting: 'default',
  templateName: '',
};

const Index = () => {
  const [categories, setCategories] = useState<ICategory[]>();
  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>();
  const [products, setProducts] = useState<Product[]>();
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<ISortParameter>(defaultSort);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

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

  const addProductToBasket = (selectedProduct: Product) => {
    let basketArr: Product[] = [];

    if (basketProducts?.length) {
      basketArr = [...basketProducts];

      const isNewProduct = basketArr.every((basketProduct) => basketProduct.id !== selectedProduct.id);
      if (isNewProduct) {
        selectedProduct.amount = 1;
        basketArr?.push(selectedProduct);
      } else {
        basketArr.forEach((basketProduct) => {
          if (basketProduct.id === selectedProduct.id) {
            if (basketProduct.amount) {
              basketProduct.amount++;
            }
          }
        });
      }
    } else if (!basketProducts?.length) {
      selectedProduct.amount = 1;
      basketArr?.push(selectedProduct);
    }

    if (setBasketProducts) {
      setBasketProducts(basketArr);
    }
  };

  const removeProductToBasket = (selectedProduct: Product) => {
    let basketArr: Product[] = [];

    if (basketProducts) {
      basketArr = [...basketProducts];

      const isHasProduct = basketArr.some((basketProduct) => basketProduct.id === selectedProduct.id);

      if (isHasProduct) {
        const removeItem = () => {
          const newBasketArr = basketArr.filter((basketProduct) => basketProduct.id !== selectedProduct.id);
          if (setBasketProducts) {
            setBasketProducts(newBasketArr);
          }
        };

        const decrementAmount = () => {
          basketArr.forEach((basketProduct) => {
            if (basketProduct.id === selectedProduct.id && basketProduct.amount) {
              --basketProduct.amount;
            }
          });

          if (setBasketProducts) {
            setBasketProducts(basketArr);
          }
        };

        basketArr.forEach((basketProduct) => {
          if (basketProduct.id === selectedProduct.id && basketProduct.amount) {
            basketProduct.amount > 1 ? decrementAmount() : removeItem();
          }
        });
      }
    }
  };

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
        addProductToBasket,
        removeProductToBasket,
      }}
    >
      <App />
    </ProductsContext.Provider>
  );
};

render(
  <>
    <Index />
  </>,
  document.getElementById('root'),
);
