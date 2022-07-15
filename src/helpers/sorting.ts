import { ISortParameter, Product } from '../types';

interface ISorting {
  sort?: ISortParameter;
  productsList?: Product[];
  setProductsList: (arg: Product[]) => void;
}

export const sorting = ({ sort, productsList, setProductsList }: ISorting): void => {
  if (productsList) {
    const newProducts = [...productsList];
    const sortTemplate = sort?.templateName.toLocaleLowerCase();
    newProducts?.sort(function (a, b) {
      if (sortTemplate === 'category') {
        switch (sort?.sorting) {
          case 'asc':
            return a.category.name > b.category.name ? 1 : -1;
          case 'desc':
            return a.category.name < b.category.name ? 1 : -1;
        }
      } else if (sortTemplate === 'price') {
        switch (sort?.sorting) {
          case 'asc':
            return a.price > b.price ? 1 : -1;
          case 'desc':
            return a.price < b.price ? 1 : -1;
        }
      } else {
        switch (sort?.sorting) {
          case 'default':
            return a.category.name > b.category.name ? 1 : 1;
          default:
            return 1;
        }
      }
      return 0;
    });

    setProductsList(newProducts);
  }
};
