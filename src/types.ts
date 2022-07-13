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

export interface IBasketProduct {
  product: Product;
  amount: number;
}

export interface IProductContext {
  products: Product[];
  setProducts?: (arg: Product[]) => void;
  basketProducts: IBasketProduct[];
  setBasketProducts: (arg: IBasketProduct[]) => void;
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
