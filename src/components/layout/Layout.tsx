import React from 'react';
import s from './layout.module.scss';
import { SideBar } from '../sideBar/SideBar';

export const Layout: React.FC = ({ children }) => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <SideBar />
        {children}
      </div>
    </div>
  );
};
