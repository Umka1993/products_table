import React, { FunctionComponent } from 'react';
import { ISortParameter } from '../../types';
import s from './sortingItem.module.scss';
import { ReactComponent as Arrow } from '../../assets/arrow.svg';

interface IHeadItem {
  itemName: string;
  sort?: ISortParameter;
  isSorted: boolean;
  toggleSortParameter: (value: ISortParameter) => void;
}

export const HeadItem: FunctionComponent<IHeadItem> = ({ isSorted, itemName, sort, toggleSortParameter }) => {
  return (
    <>
      <th>
        {isSorted ? (
          <button
            className={s.button}
            onClick={() => toggleSortParameter({ sorting: sort?.sorting, templateName: itemName })}
          >
            <span> {itemName}</span>
            {<Arrow className={`${sort?.templateName === itemName ? sort?.sorting : 'default'}`} />}
          </button>
        ) : (
          `${itemName}`
        )}
      </th>
    </>
  );
};
