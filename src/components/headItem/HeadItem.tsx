import React, { FunctionComponent } from 'react';
import { IHeadItem } from '../../types';
import s from './sortingItem.module.scss';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

export const HeadItem: FunctionComponent<IHeadItem> = ({ sort, isSorted, itemName, toggleSortParameter }) => {
  return (
    <>
      <th>
        {isSorted ? (
          <button
            className={s.button}
            onClick={() => toggleSortParameter({ sorting: sort.sorting, templateName: itemName })}
          >
            <span> {itemName}</span>
            {sort.templateName === itemName ? <Arrow className={sort.sorting} /> : <Arrow className={'default'} />}
          </button>
        ) : (
          `${itemName}`
        )}
      </th>
    </>
  );
};
