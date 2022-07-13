import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context';
import { ISortParameter, IProductContext, Product } from '../../types';
import s from './productsList.module.scss';
import { HeadItem } from '../headItem/HeadItem';
import { TableBody } from '../tableBody/TableBody';
// import { NavLink } from 'react-router-dom';
import { ReactComponent as Basket } from '../../assets/basket.svg';
import { NavLink } from 'react-router-dom';

const ProductsList = () => {
  const tableHead = [
    { id: 1, name: 'Category', isSorted: true },
    { id: 2, name: 'Name', isSorted: false },
    { id: 3, name: 'Price', isSorted: true },
    { id: 4, name: 'Actions', isSorted: false },
  ];

  const { products, setProducts, basketProducts, sort, setSort } =
    useContext<Partial<IProductContext>>(ProductsContext);
  const [productsList, setProductsList] = useState<Product[] | null>();
  // const [sort, setSort] = useState<ISortParameter>(defaultSort);

  const toggleSortParameter = (sortParametersObj: ISortParameter) => {
    if (sortParametersObj.templateName === sort?.templateName && setSort) {
      switch (sortParametersObj.sorting) {
        case 'default':
          setSort({ templateName: sortParametersObj.templateName, sorting: 'asc' });
          break;
        case 'asc':
          setSort({ templateName: sortParametersObj.templateName, sorting: 'desc' });
          break;
        case 'desc':
          setSort({ templateName: sortParametersObj.templateName, sorting: 'default' });
          break;
      }
    } else {
      if (setSort) {
        setSort({ templateName: sortParametersObj.templateName, sorting: 'asc' });
      }
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
  }, []);

  useEffect(() => {
    setProductsList(products);
  }, [products]);

  if (productsList?.length) {
    return (
      <>
        <div className={s.basket}>
          <div className="container">
            <NavLink to={'/basket'} className={s.basketWrapper}>
              <Basket className={s.basketBody} />
              <span>{basketProducts?.length}</span>
            </NavLink>
          </div>
        </div>
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
                        // sort={sort}
                        itemName={headItem.name}
                        toggleSortParameter={toggleSortParameter}
                      />
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <TableBody productsList={productsList} setProductsList={setProductsList} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
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
