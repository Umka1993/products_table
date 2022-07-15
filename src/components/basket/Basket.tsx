import React, { FunctionComponent } from 'react';
import s from './basket.module.scss';
import { ReactComponent as BasketIcon } from '../../assets/basket.svg';
import { Product } from '../../types';

interface IBasket {
  basketProducts: Product[];
}

export const Basket: FunctionComponent<IBasket> = ({ basketProducts }) => {
  return (
    <div className={s.basketWrapper}>
      <BasketIcon className={s.basketBody} />
      <span>{basketProducts?.length}</span>
    </div>
  );
};
