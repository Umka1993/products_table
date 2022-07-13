import React, { useContext, useEffect } from 'react';
import { IProductContext, ITableBody, Product } from '../../types';
import ProductsContext from '../../context';
import { sorting } from '../../helpers/sorting';
import s from './tableBody.module.scss';
import { ButtonActionProduct } from '../buttonActionProduct/ButtonActionProduct';

export const TableBody: React.FC<ITableBody> = ({ setProductsList, productsList }) => {
  const { products, setBasketProducts, basketProducts, sort } = useContext<Partial<IProductContext>>(ProductsContext);

  useEffect(() => {
    sorting({ sort, products, setProductsList });
  }, [sort?.templateName, sort?.sorting]);

  // let basketArr: Product[] = [];

  // const addProductToBasket = (selectedProduct: Product) => {
  //   if (basketProducts?.length) {
  //     basketArr = [...basketProducts];
  //
  //     const isNewProduct = basketArr.every((basketProduct) => basketProduct.id !== selectedProduct.id);
  //     if (isNewProduct) {
  //       selectedProduct.amount = 1;
  //       basketArr?.push(selectedProduct);
  //     } else {
  //       basketArr.forEach((basketProduct) => {
  //         if (basketProduct.id === selectedProduct.id) {
  //           if (basketProduct.amount) {
  //             basketProduct.amount++;
  //           }
  //         }
  //       });
  //     }
  //   } else if (!basketProducts?.length) {
  //     selectedProduct.amount = 1;
  //     basketArr?.push(selectedProduct);
  //   }
  //
  //   if (setBasketProducts) {
  //     setBasketProducts(basketArr);
  //   }
  // };
  //
  // const removeProductToBasket = (selectedProduct: Product) => {
  //   if (basketProducts) {
  //     basketArr = [...basketProducts];
  //
  //     const isHasProduct = basketArr.some((basketProduct) => basketProduct.id === selectedProduct.id);
  //
  //     if (isHasProduct) {
  //       const removeItem = () => {
  //         const newBasketArr = basketArr.filter((basketProduct) => basketProduct.id !== selectedProduct.id);
  //         if (setBasketProducts) {
  //           setBasketProducts(newBasketArr);
  //         }
  //       };
  //
  //       const decrementAmount = () => {
  //         basketArr.forEach((basketProduct) => {
  //           if (basketProduct.id === selectedProduct.id && basketProduct.amount) {
  //             --basketProduct.amount;
  //           }
  //         });
  //
  //         if (setBasketProducts) {
  //           setBasketProducts(basketArr);
  //         }
  //       };
  //
  //       basketArr.forEach((basketProduct) => {
  //         if (basketProduct.id === selectedProduct.id && basketProduct.amount) {
  //           basketProduct.amount > 1 ? decrementAmount() : removeItem();
  //         }
  //       });
  //     }
  //   }
  // };

  if (productsList && basketProducts && setBasketProducts) {
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
