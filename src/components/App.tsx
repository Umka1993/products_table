import React from 'react';
import '../globalStyles.scss';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '../pages/AppRouter';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
