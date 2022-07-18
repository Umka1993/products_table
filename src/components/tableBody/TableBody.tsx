import React, { useContext, useEffect } from 'react';
import { IProductContext, ISortParameter, Product } from '../../types';
import ProductsContext from '../context/productTableContext';
import { sorting } from '../../helpers/sorting';
import s from './tableBody.module.scss';
import { ButtonActionProduct } from '../buttonActionProduct/ButtonActionProduct';

interface ITableBody {
  sort?: ISortParameter;
  setProductsList: (arg: Product[]) => void;
  productsList: Product[];
}

export const TableBody: React.FC<ITableBody> = ({ setProductsList, productsList, sort }) => {
  const { basketProducts, products = [] } = useContext<IProductContext>(ProductsContext);

  useEffect(() => {
    sorting({ sort, productsList, setProductsList, products });
  }, [sort?.templateName, sort?.sorting]);

  return (
    <>
      {productsList?.map((product) => (
        <tr key={product.id}>
          <td>{product.category.name}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td className={s.buttons}>
            <ButtonActionProduct basketProducts={basketProducts} product={product} />
          </td>
        </tr>
      ))}
    </>
  );
};
