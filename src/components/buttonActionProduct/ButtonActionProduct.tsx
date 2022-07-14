import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import s from '../tableBody/tableBody.module.scss';
import { IProductContext, Product } from '../../types';
import ProductsContext from '../../context';

interface IButtonActionProduct {
  product: Product;
  setBasketProducts: ((arg: Product[]) => void) | undefined;
  basketProducts: Product[];
}

export const ButtonActionProduct: FunctionComponent<IButtonActionProduct> = ({
  product,
  basketProducts,
  setBasketProducts,
}) => {
  const [selectedProduct, toggleSelect] = useState<Product>();

  let basketArr: Product[] = [];

  const addProductToBasket = (selectedProduct: Product) => {
    toggleSelect(selectedProduct);

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
    toggleSelect(selectedProduct);

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

  const hasSelected = () => {
    let amount: number | undefined;
    if (selectedProduct?.id === product.id) {
      basketProducts.forEach((basketProduct) => {
        if (selectedProduct && basketProduct.id === selectedProduct.id) {
          amount = basketProduct.amount;
        }
      });

      if (amount) {
        return amount;
      }
    } else {
      return 'Select';
    }
  };

  return (
    <div className={s.buttons__wrapper}>
      <button
        disabled={basketProducts.every((basketProduct) => basketProduct.id !== product.id)}
        className={s.buttons__del}
        onClick={() => removeProductToBasket(product)}
      >
        -
      </button>
      <div>
        <span> {hasSelected()}</span>
      </div>

      <button className={s.buttons__add} onClick={() => addProductToBasket(product)}>
        +
      </button>
    </div>
  );
};
