import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProductsList from '../components/productsList/ProductsList';
import { BasketList } from './basketPage/BasketList';

export const AppRouter = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/">
        <ProductsList />
      </Route>

      <Route exact path="/basket">
        <BasketList />
      </Route>
    </Switch>
  );
};
