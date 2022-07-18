import { createContext } from 'react';
import { IProductContext } from '../../types';

const ProductsContext = createContext<IProductContext>({} as IProductContext);

export default ProductsContext;
