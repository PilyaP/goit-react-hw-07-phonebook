import PropTypes from 'prop-types';
import { ContactsItem } from './ContactList.styled';

const ContactList = ({ contacts, deleteContact }) => (
  <ul>
    {contacts.map(({ id, name, number }) => {
      return (
        <ContactsItem key={id}>
          <p className="contact-name">
            {name}: {number}
          </p>
          <button
            type="button"
            onClick={() => deleteContact(id)}
            className="bnt-name"
          >
            Delete
          </button>
        </ContactsItem>
      );
    })}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;


// const ContactList = ({ contacts }) => {
//   const dispatch = useDispatch();

//   const handleDeleteContact = id => {
//     dispatch(deleteContact(id));
//   };

//   return (
//     <ul>
//       {contacts.map(({ id, name, number }) => (
//         <ContactsItem key={id}>
//           <p className="contact-name">
//             {name}: {number}
//           </p>
//           <button
//             type="button"
//             onClick={() => handleDeleteContact(id)}
//             className="bnt-name"
//           >
//             Delete
//           </button>
//         </ContactsItem>
//       ))}
//     </ul>
//   );
// };

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default ContactList;