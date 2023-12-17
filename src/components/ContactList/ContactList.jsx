import React from 'react';
import PropTypes from 'prop-types';
import { PeopleList, Item, Text, Button } from './ContactList.styled';

const ContactList = ({ list, onDeleteContact }) => {
  return (
    <PeopleList>
      {list.map(contact => (
        <Item key={contact.id}>
          <Text>
            {contact.name}: {contact.number}
          </Text>
          <Button onClick={() => onDeleteContact(contact.id)}>Delete</Button>
        </Item>
      ))}
    </PeopleList>
  );
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;