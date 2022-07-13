import React, { useContext, useEffect } from 'react';
import { IBasketProduct, IProductContext, ISortParameter, ITableBody, Product } from '../../types';
import ProductsContext from '../../context';
import { sorting } from '../../helpers/sorting';
import { log } from 'util';

export const TableBody: React.FC<ITableBody> = ({ sort, setProductsList, productsList }) => {
  const { products, setBasketProducts, basketProducts } = useContext<Partial<IProductContext>>(ProductsContext);

  useEffect(() => {
    sorting({ sort, products, setProductsList });
  }, [sort.templateName, sort.sorting]);

  let basketArr: IBasketProduct[] = [];

  const addProductToBasket = (selectedProduct: Product) => {
    if (basketProducts?.length) {
      // console.log(basketProducts);
      basketArr = [...basketProducts];

      // basketArr.forEach((basketProduct) => {
      //   if (basketProduct.product.id === selectedProduct.id) {
      //     basketProduct.amount++;
      //   } else {
      //     const newBasketProduct = {
      //       amount: 1,
      //       product: selectedProduct,
      //     };
      //     debugger
      //     basketArr?.push(newBasketProduct);
      //     debugger
      //   }
      // });

      const isNewProduct = basketArr.some(
        (basketProduct) => basketProduct.product.id !== selectedProduct.id,
        // {
        // if (basketProduct.product.id === selectedProduct.id) {
        //   basketProduct.amount++;
        // } else {
        //   debugger
        //   const newBasketProduct = {
        //     amount: 1,
        //     product: selectedProduct,
        //   };
        //   basketArr?.push(newBasketProduct);
        // }
        // }
      );
      console.log('isNewProduct', isNewProduct);
    } else if (!basketProducts?.length) {
      const newBasketProduct = {
        amount: 1,
        product: selectedProduct,
      };
      basketArr?.push(newBasketProduct);
    }

    if (setBasketProducts) {
      setBasketProducts(basketArr);
    }
  };

  console.log('basketProducts', basketProducts);

  const removeProductToBasket = (selectedProduct: any) => {
    if (basketProducts) {
      basketProducts.forEach((products) => {
        if (products.product.id === selectedProduct.id) {
          console.log(';;;;;;');
        } else {
          console.log(';;;;;;');
        }
      });
    }
  };

  // console.log('basketProducts', basketProducts);

  if (productsList) {
    return (
      <>
        {productsList.map((product) => (
          <tr key={product.id}>
            <td>{product.category.name}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <button onClick={() => removeProductToBasket(product)}>(-)</button>
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
