import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from './ContactForm.styled';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeInput = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleAddNewContactOnSubmit = e => {
    e.preventDefault();

    if (
      e.target.name.value.trim() === '' ||
      e.target.number.value.trim() === ''
    ) {
      return;
    }

    addContact({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <Form onSubmit={handleAddNewContactOnSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          value={name}
          required
          onChange={handleChangeInput}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          required
          onChange={handleChangeInput}
        />
      </Label>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};