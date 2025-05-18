import { useState, useEffect } from 'react';
import './App.css';
import ContactList from "./components/ContactList.jsx";
import SearchBox from "./components/SearchBox.jsx";
import ContactForm from "./components/ContactForm.jsx";

const App = () => {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem("contactData") ?? [];
        return savedContacts.length ? JSON.parse(savedContacts) : [];
    });
    const [searchQuery, setQuery] = useState("");

    useEffect(() => {
        const componentData = JSON.stringify(contacts);
        localStorage.setItem("contactData", componentData);
    }, [contacts]);

    const createContact = (contact) => {
        setContacts((prevContacts) => [...prevContacts, contact]);
    };

    const deleteContact = (id) => {
        const filteredContacts = contacts.filter((contact) => contact.id !== id);
        setContacts(filteredContacts);
    };

    const searchResults = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="mainView">
            <h1>Phonebook</h1>
            <ContactForm createContact={createContact} />
            <SearchBox value={searchQuery} handleChange={setQuery} />
            <ContactList contacts={searchResults} deleteContact={deleteContact} />
        </div>
    );
};

export default App;