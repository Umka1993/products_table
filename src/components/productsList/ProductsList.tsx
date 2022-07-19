import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from '../context/productTableContext';
import { ISortParameter, IProductContext, Product } from '../../types';
import s from './productsList.module.scss';
import { HeadItem } from '../headItem/HeadItem';
import { TableBody } from '../tableBody/TableBody';
import { NavLink, useHistory } from 'react-router-dom';
import { Basket } from '../basket/Basket';

const tableHead = [
  { id: 1, name: 'Category', isSorted: true },
  { id: 2, name: 'Name', isSorted: false },
  { id: 3, name: 'Price', isSorted: true },
  { id: 4, name: 'Actions', isSorted: false },
];

const ProductsList = () => {
  const {
    products = [],
    basketProducts,
    sort,
    setSort,
    filteredCategories,
  } = useContext<IProductContext>(ProductsContext);
  const [productsList, setProductsList] = useState<Product[] | null>();
  const history = useHistory();
  useEffect(() => {
    if (filteredCategories?.length) {
      productsFilter();
    } else {
      setProductsList(products);
    }
  }, [products, filteredCategories]);

  const navigateToBasket = () => {
    history.push('/basket');
  };

  const toggleSortParameter = ({ templateName, sorting }: ISortParameter) => {
    if (templateName === sort?.templateName) {
      switch (sorting) {
        case 'default':
          setSort({ templateName, sorting: 'asc' });
          break;
        case 'asc':
          setSort({ templateName, sorting: 'desc' });
          break;
        case 'desc':
          setSort({ templateName, sorting: 'default' });
          break;
      }
    } else {
      setSort({ templateName, sorting: 'asc' });
    }
  };

  const productsFilter = () => {
    const filteredProducts: Product[] = [];
    products?.forEach((product) => {
      filteredCategories?.forEach((filteredCategory) => {
        if (product.category.id === filteredCategory.id) {
          filteredProducts.push(product);
        }
      });
    });

    setProductsList(filteredProducts);
  };

  const isBasketEmpty = !basketProducts?.length;

  if (productsList?.length) {
    return (
      <div>
        <div className={s.basket}>
          <button disabled={isBasketEmpty} onClick={() => navigateToBasket()} className={s.basketButton}>
            <Basket basketProducts={basketProducts} />
          </button>
        </div>
        <div className={s.table}>
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
                <TableBody productsList={productsList} setProductsList={setProductsList} sort={sort} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default ProductsList;
