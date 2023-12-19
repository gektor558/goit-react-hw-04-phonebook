import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList.jsx';
import Notification from '../Notification/Notification';
import { Wrapper } from './App.Styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.target.value);
  };

  const handleAddContact = contactData => {
    const nameExists = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() ===
        contactData.name.toLowerCase().trim()
    );

    if (nameExists) {
      toast.info(`${contactData.name} is already in your contacts.`);
      return;
    } else {
      const newContact = { id: nanoid(), ...contactData };
      setContacts(prev => [newContact, ...prev]);
      setPrevContacts(contacts);
    }
  };

  const handleContactFilter = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  const handleDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Wrapper>
        <h1>Phonebook</h1>
        <ContactForm addContact={handleAddContact} />
        <h2>Contacts List</h2>
        <Filter filteredContacts={handleChangeFilter} />
        {contacts.length ? (
          <ContactList
            list={handleContactFilter()}
            onDeleteContact={handleDeleteContact}
          />
        ) : (
          <Notification message="Your contact list is empty" />
        )}
      </Wrapper>
    </>
  );
};