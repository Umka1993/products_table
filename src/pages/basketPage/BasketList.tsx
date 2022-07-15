import React, { useContext } from 'react';
import { IProductContext } from '../../types';
import ProductsContext from '../../context';
import { NavLink } from 'react-router-dom';
import s from './basketPage.module.scss';
import { ButtonActionProduct } from '../../components/buttonActionProduct/ButtonActionProduct';
import { Basket } from '../../components/basket/Basket';

interface ITableHead {
  id: number;
  name: string;
}

const tableHead: ITableHead[] = [
  { id: 1, name: 'Category' },
  { id: 2, name: 'Name' },
  { id: 3, name: 'Quantity' },
  { id: 4, name: 'Price' },
  { id: 5, name: 'Actions' },
];

export const BasketList = () => {
  const { setBasketProducts, basketProducts } = useContext<IProductContext>(ProductsContext);

  if (basketProducts?.length) {
    return (
      <div>
        <div className={s.header}>
          <NavLink className={s.goBack} to={'/'}>
            go back
          </NavLink>
          <Basket basketProducts={basketProducts} />
        </div>

        <table>
          <thead>
            <tr>
              {tableHead.map((tableHead) => (
                <th key={tableHead.id}>{tableHead.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {basketProducts.map((basketProduct) => (
              <tr key={basketProduct.id}>
                <td>{basketProduct.category.name}</td>
                <td>{basketProduct.name}</td>
                <td>{basketProduct.amount}</td>
                <td>{basketProduct.price}</td>
                <td>
                  <ButtonActionProduct
                    basketProducts={basketProducts}
                    product={basketProduct}
                    setBasketProducts={setBasketProducts}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="emptyBasket">
        <h1>Your basket is empty</h1>
        <NavLink className={s.goBack} to={'/'}>
          fill the basket
        </NavLink>
      </div>
    );
  }
};
