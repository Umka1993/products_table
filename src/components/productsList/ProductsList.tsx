import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../../context';
import { ISortParameter, IProductContext, Product } from '../../types';
import s from './productsList.module.scss';
import { HeadItem } from '../headItem/HeadItem';
import { TableBody } from '../tableBody/TableBody';
// import { NavLink } from 'react-router-dom';
import { ReactComponent as Basket } from '../../assets/basket.svg';

const ProductsList = () => {
  const tableHead = [
    { id: 1, name: 'Category', isSorted: true },
    { id: 2, name: 'Name', isSorted: false },
    { id: 3, name: 'Price', isSorted: true },
    { id: 4, name: 'Actions', isSorted: false },
  ];

  const defaultSort: ISortParameter = {
    sorting: 'default',
    templateName: '',
  };

  const { products, setProducts, basketProducts } = useContext<Partial<IProductContext>>(ProductsContext);
  const [productsList, setProductsList] = useState<Product[] | null>();
  const [sort, setSort] = useState<ISortParameter>(defaultSort);

  const toggleSortParameter = (sortParametersObj: ISortParameter) => {
    if (sortParametersObj.templateName === sort.templateName) {
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
      setSort({ templateName: sortParametersObj.templateName, sorting: 'asc' });
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

  if (productsList?.length && Object.keys(sort).length) {
    return (
      <>
        <div className={s.basket}>
          <div className="container">
            <div className={s.basketWrapper}>
              <Basket className={s.basketBody} />
              <span>{basketProducts?.length}</span>
            </div>
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
                        sort={sort}
                        itemName={headItem.name}
                        toggleSortParameter={toggleSortParameter}
                      />
                    ))}
                  </tr>
                </thead>

                <tbody>
                  <TableBody sort={sort} productsList={productsList} setProductsList={setProductsList} />
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
