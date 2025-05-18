import Contact from "./Contact";
import styles from "./css/ContactList.module.css";

const ContactList = ({ contacts, deleteContact, filtered }) => {
    const hasContacts = contacts.length > 0;

    return (
        <div>
            {hasContacts ? (
                <ul className={styles.contactList}>
                    {contacts.map(({ id, name, number }) => (
                        <li className={styles.contactItem} key={id}>
                            <Contact
                                id={id}
                                name={name}
                                phone={number}
                                deleteContact={deleteContact}
                            />
                        </li>
                    ))}
                </ul>
            ) : filtered ? (
                <p>Your contact list is empty</p>
            ) : (
                <p>No contacts found for your search query. Please try again.</p>
            )}
        </div>
    );
};

export default ContactList;