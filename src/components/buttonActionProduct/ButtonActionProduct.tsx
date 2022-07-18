import React, { FunctionComponent, useContext, useEffect } from 'react';
import s from '../tableBody/tableBody.module.scss';
import { IProductContext, Product } from '../../types';
import ProductsContext from '../context/productTableContext';

interface IButtonActionProduct {
  product: Product;
  basketProducts: Product[];
}

export const ButtonActionProduct: FunctionComponent<IButtonActionProduct> = ({ product, basketProducts }) => {
  const { addProductToBasket, removeProductToBasket } = useContext<IProductContext>(ProductsContext);

  useEffect(() => {
    hasSelected();
  }, []);

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
