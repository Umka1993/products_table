import { createContext } from 'react';
import { IProductContext } from './types';

const ProductsContext = createContext<Partial<IProductContext>>({});

export default ProductsContext;
