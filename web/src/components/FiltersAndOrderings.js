import React from 'react';

import { FiltersWrapper, Orderings, CurrencyFilters, CurrencyButton } from '../styles/ComponentStyles';

export default function CurrencyFilter({
  setCurr,
  setOrdering, 
}) { 

  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={(e) => setOrdering(e.currentTarget.value)}>
            <option value='-spent_at'>Sort by Date descending (default)</option>
            <option value='spent_at'>Sort by Date ascending</option>
            <option value='-amount'>Sort by Amount descending</option>
            <option value='amount'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
              onClick={() => setCurr('')}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='HUF'
              onClick={() => setCurr('HUF')}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='USD'
              onClick={() => setCurr('USD')}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
