import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context';
import { IProductContext } from '../../types';
import s from './productsList.module.scss';
import { HeadItem } from '../headItem/HeadItem';
import { TableBody } from '../tableBody/TableBody';

const ProductsList = () => {
  const { products, setProducts } = useContext<Partial<IProductContext>>(ProductsContext);
  const [sortParameter, setSortParameter] = useState<'desc' | 'asc'>('asc');
  const tableHead = [
    { id: 1, name: 'Category', isSorted: true },
    { id: 2, name: 'Name', isSorted: false },
    { id: 3, name: 'Price', isSorted: true },
    { id: 4, name: 'Actions', isSorted: false },
  ];

  const toggleSortParameter = () => {
    if (sortParameter === 'asc') {
      setSortParameter('desc');
    } else {
      setSortParameter('asc');
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/products/')
      .then((response) => response.json())
      .then((json) => {
        if (setProducts) {
          setProducts(json);
        }
      });
  }, [setProducts]);

  // console.log(products)
  // console.log(sortParameter)

  if (products?.length) {
    return (
      <div className={s.table}>
        <div className="container">
          <div className={s.wrapper}>
            <table>
              <thead>
                <tr>
                  {tableHead?.map((headItem) => (
                    <HeadItem
                      key={headItem.id}
                      isSorted={headItem.isSorted}
                      sorting={sortParameter}
                      itemName={headItem.name}
                      toggleSortParameter={toggleSortParameter}
                    />
                  ))}
                </tr>
              </thead>

              <tbody>
                <TableBody products={products} sortParameter={sortParameter} setProducts={setProducts} />
              </tbody>
            </table>
          </div>
        </div>
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

export default ProductsList;
