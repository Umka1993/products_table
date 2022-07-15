import React from 'react';
import '../globalStyles.scss';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../pages/AppRouter';
import { Layout } from './layout/Layout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <AppRouter />
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default App;
