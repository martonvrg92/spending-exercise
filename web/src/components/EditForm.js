import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';

export default function EdditForm(props) {
  const [state, setState] = useState({
    description: props.data.description,
    amount: props.data.amount,
    currency: props.data.currency,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/spending-update/${props.data.id}/`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        description: state.description,
        amount: state.amount,
        currency: state.currency,
      }),
    });
    window.location.reload()
    setState({
      description: props.data.description,
      amount: props.data.amount,
      currency: props.data.currency,
    })
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <>
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' />
      </FormStyles>
    </>
  );
}
