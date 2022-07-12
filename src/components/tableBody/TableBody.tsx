import React, { useContext, useEffect } from 'react';
import { IProductContext, ISortParameter, ITableBody, Product } from '../../types';
import ProductsContext from '../../context';
import { sorting } from '../../helpers/sorting';

export const TableBody: React.FC<ITableBody> = ({ sort, setProductsList, productsList }) => {
  const { products, setBasketProducts, basketProducts } = useContext<Partial<IProductContext>>(ProductsContext);

  useEffect(() => {
    sorting({ sort, products, setProductsList });
  }, [sort.templateName, sort.sorting]);

  const addProductToBasket = (selectedProduct: Product) => {
    if (basketProducts) {
      const basketArr: Product[] = [...basketProducts];
      products?.forEach((product) => {
        if (product.id === selectedProduct.id) {
          basketArr?.push(product);
        }
      });
      if (setBasketProducts) {
        setBasketProducts(basketArr);
      }
    }
  };

  // const removeProductToBasket = (selectedProduct: Product) => {};

  console.log('basketProducts', basketProducts);

  if (productsList) {
    return (
      <>
        {productsList.map((product) => (
          <tr key={product.id}>
            <td>{product.category.name}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              {/*<button onClick={() => removeProductToBasket(product)}>(-)</button>*/}
              Select
              <button onClick={() => addProductToBasket(product)}>(+)</button>
            </td>
          </tr>
        ))}
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};
