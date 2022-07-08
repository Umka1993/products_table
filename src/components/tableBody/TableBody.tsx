import React, { useEffect } from 'react';
import { ITableBody } from '../../types';

export const TableBody: React.FC<ITableBody> = ({ products, sortParameter, setProducts }) => {
  const sorting = () => {
    if (products) {
      products?.sort(function () {
        if (sortParameter === 'asc') {
          return 1;
        }
        if (sortParameter === 'desc') {
          return -1;
        }
        return 0;
      });

      if (setProducts) {
        setProducts(products);
      }
    }
  };

  useEffect(() => {
    sorting();
  }, [sortParameter]);
  return (
    <>
      {products.map((product) => (
        <tr key={product.id}>
          <td>{product.category.name}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <button>(-)</button>
            Select
            <button>(+)</button>
          </td>
        </tr>
      ))}
    </>
  );
};
