import React, { FunctionComponent, useContext } from 'react';
import { IHeadItem, IProductContext } from '../../types';
import s from './sortingItem.module.scss';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';
import ProductsContext from '../../context';

export const HeadItem: FunctionComponent<IHeadItem> = ({ isSorted, itemName, toggleSortParameter }) => {
  const { sort } = useContext<Partial<IProductContext>>(ProductsContext);

  return (
    <>
      <th>
        {isSorted ? (
          <button
            className={s.button}
            onClick={() => toggleSortParameter({ sorting: sort?.sorting, templateName: itemName })}
          >
            <span> {itemName}</span>
            {sort?.templateName === itemName ? <Arrow className={sort?.sorting} /> : <Arrow className={'default'} />}
          </button>
        ) : (
          `${itemName}`
        )}
      </th>
    </>
  );
};
