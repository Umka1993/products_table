import React, { useContext, useEffect } from 'react';
import { IProductContext, ISortParameter, Product } from '../../types';
import ProductsContext from '../../context';
import { sorting } from '../../helpers/sorting';
import s from './tableBody.module.scss';
import { ButtonActionProduct } from '../buttonActionProduct/ButtonActionProduct';

interface ITableBody {
  sort?: ISortParameter;
  setProductsList: (arg: Product[]) => void;
  productsList: Product[];
}

export const TableBody: React.FC<ITableBody> = ({ setProductsList, productsList, sort }) => {
  const { setBasketProducts, basketProducts } = useContext<IProductContext>(ProductsContext);

  useEffect(() => {
    sorting({ sort, productsList, setProductsList });
  }, [sort?.templateName, sort?.sorting]);

  if (productsList && basketProducts) {
    return (
      <>
        {productsList.map((product) => (
          <tr key={product.id}>
            <td>{product.category.name}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className={s.buttons}>
              <ButtonActionProduct
                basketProducts={basketProducts}
                product={product}
                setBasketProducts={setBasketProducts}
              />
            </td>
          </tr>
        ))}
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
