import React, { useContext } from 'react';
import s from './sideBar.module.scss';
import { ICategory, IProductContext } from '../../types';
import ProductsContext from '../../context';

export const SideBar = () => {
  const {
    categories = [],
    filteredCategories,
    setFilteredCategories,
    products = [],
  } = useContext<IProductContext>(ProductsContext);

  const handleFilteredCategories = (selectedId: string) => {
    let newFilteredCategoryArr: ICategory[] = [];

    if (!filteredCategories?.length) {
      categories?.forEach((category) => {
        if (category.id === selectedId) {
          newFilteredCategoryArr.push(category);
        }
      });
    } else {
      const isFilteredCategory = filteredCategories.find((filteredCategory) => filteredCategory.id === selectedId);

      if (isFilteredCategory) {
        newFilteredCategoryArr = filteredCategories.filter((filteredCategory) => filteredCategory.id !== selectedId);
      } else {
        newFilteredCategoryArr = [...filteredCategories];
        categories.forEach((category) => {
          if (category.id === selectedId) {
            newFilteredCategoryArr.push(category);
          }
        });
      }
    }
    setFilteredCategories(newFilteredCategoryArr);
  };

  return (
    <div className={s.wrapper}>
      <h3>Products categories</h3>
      <form>
        {categories?.map((category) => (
          <label
            className={`${products?.every((product) => product.category.id !== category.id) ? s.disabled : ''}`}
            key={category.id}
            htmlFor={category.name}
            onChange={() => handleFilteredCategories(category.id)}
          >
            <input
              disabled={products?.every((product) => product.category.id !== category.id)}
              type="checkbox"
              name={category.name}
              id={category.name}
            />
            {category.name}
            <span>No products in this category</span>
          </label>

        ))}
      </form>
    </div>
  );
};
