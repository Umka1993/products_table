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
}

export interface IHeadItem {
  itemName: string;
  sorting: 'desc' | 'asc';
  isSorted: boolean;
  toggleSortParameter: () => void;
}

export interface ITableBody {
  sortParameter: 'desc' | 'asc';
  products: Product[];
  setProducts?: (arg: Product[]) => void;
}
