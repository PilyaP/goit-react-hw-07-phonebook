// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import { nanoid } from 'nanoid';
// import { Container } from './App.styled';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// import Filter from './Filter/Filter';

// const App = () => {
//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);

//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts) {
//       setContacts(JSON.parse(savedContacts));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   const formSubmit = ({ name, number }) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };

//     const isContactExist = contacts.some(
//       i =>
//         i.name.toLowerCase() === contact.name.toLowerCase() ||
//         i.number === contact.number
//     );

//     if (isContactExist) {
//       Notify.failure(`${name} is already in phonebook.`);
//     } else {
//       setContacts(prevContacts => [contact, ...prevContacts]);
//     }
//   };

//   const changeFilterInput = e => {
//     setFilter(e.target.value);
//   };

//   const findContacts = () => {
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   const deleteContact = id => {
//     const contactName = contacts.find(contact => contact.id === id).name;
//     setContacts(prevContacts =>
//       prevContacts.filter(contact => contact.id !== id)
//     );
//     Notify.warning(`${contactName} delete from phonebook.`);
//   };

//   return (
//     <Container>
//       <ContactForm onSubmit={formSubmit} title="Phonebook" />
//       <Filter
//         filter={filter}
//         changeFilterInput={changeFilterInput}
//         title="Contacts"
//       />
//       <ContactList contacts={findContacts()} deleteContact={deleteContact} />
//     </Container>
//   );
// };

// export default App;


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { addContact, deleteContact } from '../redux/contactSlice';
import { setFilter } from '../redux/filterSlice'; 
import { Notify } from 'notiflix';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { addContact, deleteContact } from 'redux/contactSlice';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();
// dispatch action
  const formSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isContactExist = contacts.some(
      i =>
        i.name.toLowerCase() === contact.name.toLowerCase() ||
        i.number === contact.number
    );

    if (isContactExist) {
      Notify.failure(`${name} is already in phonebook.`);
    } else {
      dispatch(addContact(contact))
    }
  };

  const changeFilterInput = e => {
    dispatch(setFilter(e.target.value));
  };

  const findContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleContactDelete = id => {
    const contactName = contacts.find(contact => contact.id === id).name;
    dispatch(deleteContact(id));
    Notify.warning(`${contactName} deleted from phonebook.`);
  };

  return (
    <Container>
      <ContactForm onSubmit={formSubmit} title="Phonebook" />
      <Filter
        filter={filter}
        changeFilterInput={changeFilterInput}
        title="Contacts"
      />
      <ContactList contacts={findContacts()} deleteContact={handleContactDelete} />
    </Container>
  );
};

export default App;
