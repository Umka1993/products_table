interface Category {
  id: string;
  name: string;
}

export interface Product {
  name: string;
  category: Category;
  price: number;
  id: number;
}

export interface IProductContext {
  products: Product[];
  setProducts?: (arg: Product[]) => void;
  basketProducts: Product[];
  setBasketProducts: (arg: Product[]) => void;
}

export interface IHeadItem {
  itemName: string;
  sort: ISortParameter;
  isSorted: boolean;
  toggleSortParameter: (value: ISortParameter) => void;
}

export interface ITableBody {
  sort: ISortParameter;
  setProductsList?: (arg: Product[]) => void;
  productsList: Product[];
}
export interface ISortParameter {
  sorting: 'asc' | 'desc' | 'default';
  templateName: string;
}
