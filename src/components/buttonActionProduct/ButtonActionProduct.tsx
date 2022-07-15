import React, { FunctionComponent, useEffect } from 'react';
import s from '../tableBody/tableBody.module.scss';
import { Product } from '../../types';

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
  let basketArr: Product[] = [];

  const addProductToBasket = (selectedProduct: Product) => {
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
    if (basketProducts.length) {
      basketProducts.forEach((basketProduct) => {
        if (basketProduct.id === product.id) {
          amount = basketProduct.amount;
        }
      });

      if (amount) {
        return amount;
      } else {
        return 'Select';
      }
    } else {
      return 'Select';
    }
  };

  useEffect(() => {
    hasSelected();
  }, []);

  return (
    <div className={s.buttons__wrapper}>
      <button
        disabled={basketProducts.every((basketProduct) => basketProduct.id !== product.id)}
        className={s.buttons__del}
        onClick={() => removeProductToBasket(product)}
      >
        -
      </button>
      <span> {hasSelected()}</span>
      <button className={s.buttons__add} onClick={() => addProductToBasket(product)}>
        +
      </button>
    </div>
  );
};
