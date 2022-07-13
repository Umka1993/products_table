import React, { useContext } from 'react';
import { IProductContext } from '../../types';
import ProductsContext from '../../context';
import { TableBody } from '../../components/tableBody/TableBody';
import { NavLink } from 'react-router-dom';
import s from './basketPage.module.scss';
import { HeadItem } from '../../components/headItem/HeadItem';
import { ButtonActionProduct } from '../../components/buttonActionProduct/ButtonActionProduct';
import { ReactComponent as Basket } from '../../assets/basket.svg';

interface ITableHead {
  id: number;
  name: string;
}

export const BasketList = () => {
  const { setBasketProducts, basketProducts } = useContext<Partial<IProductContext>>(ProductsContext);

  const tableHead: ITableHead[] = [
    { id: 1, name: 'Category' },
    { id: 2, name: 'Name' },
    { id: 3, name: 'Quantity' },
    { id: 4, name: 'Price' },
    { id: 5, name: 'Actions' },
  ];

  console.log(basketProducts);
  if (basketProducts?.length) {
    return (
      <div className="container">
        <div>
          <NavLink className={s.goBack} to={'/'}>
            go back
          </NavLink>

          <div className={s.basketWrapper}>
            <Basket className={s.basketBody} />
            <span>{basketProducts?.length}</span>
          </div>
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
      <>
        <h1>Loading...</h1>
      </>
    );
  }
};
