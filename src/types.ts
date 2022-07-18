interface Category {
  id: string;
  name: string;
}

export interface Product {
  name: string;
  category: Category;
  price: number;
  id: number;
  amount?: number;
}

export interface IProductContext {
  products?: Product[];
  setProducts?: (arg: Product[]) => void;
  basketProducts: Product[];
  setBasketProducts: (arg: Product[]) => void;
  sort: ISortParameter;
  setSort: (arg: ISortParameter) => void;
  categories?: ICategory[];
  setCategories: (arg: ICategory[]) => void;
  setFilteredCategories: (arg: ICategory[]) => void;
  filteredCategories?: ICategory[];
  addProductToBasket: (arg: Product) => void;
  removeProductToBasket: (arg: Product) => void;
}

export interface ISortParameter {
  sorting?: 'asc' | 'desc' | 'default';
  templateName: string;
}

export interface ICategory {
  id: string;
  name: string;
}
