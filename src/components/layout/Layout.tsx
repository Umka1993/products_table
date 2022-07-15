import React, { FunctionComponent, ReactNode } from 'react';
import s from './layout.module.scss';
import { SideBar } from '../sideBar/SideBar';

interface ILayout {
  children: ReactNode;
}

export const Layout: FunctionComponent<ILayout> = ({ children }) => {
  return (
    <div className="container">
      <div className={s.wrapper}>
        <SideBar />
        {children}
      </div>
    </div>
  );
};
