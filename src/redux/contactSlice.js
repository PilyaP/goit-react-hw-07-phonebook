import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [{ id: '12321', name: 'John', number: '123-12-15' }],
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
      //   state.contacts = [...state.contacts, action.payload];
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};
export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

// Action generator
export const { addContact, deleteContact } = contactsSlice.actions;
