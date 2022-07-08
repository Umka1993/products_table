import React, { FunctionComponent } from 'react';
import { IHeadItem } from '../../types';
import s from './sortingItem.module.scss';

export const HeadItem: FunctionComponent<IHeadItem> = ({ sorting, isSorted, itemName, toggleSortParameter }) => {
  return (
    <>
      <th>
        {isSorted ? (
          <button className={s.button} onClick={() => toggleSortParameter()}>
            {itemName}
            {sorting === 'asc' ? '↑' : '↓'}
          </button>
        ) : (
          `${itemName}`
        )}
      </th>
    </>
  );
};
