import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [curr, setCurr] = useState('');
  const [ordering, setOrdering] = useState('-spent_at')

  return (
    <>
      <Layout>
        <Form />
        <FiltersAndOrderings
        ordering={ordering}
        setOrdering={setOrdering}
        curr={curr}
        setCurr={setCurr} />
        <SpendingList
          curr={curr}
          ordering={ordering}
          spendings={spendings}
          setSpendings={setSpendings}
        />
      </Layout>
    </>
  );
}
