import { FaPhone } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import styles from "./css/Contact.module.css";

const Contact = ({ id, name, phone, deleteContact }) => {
    return (
        <div className={styles.contact} id={id}>
            <div className={styles.details}>
                <p className={styles.field}>
                    <IoMdContact /> {name}
                </p>
                <p className={styles.field}>
                    <FaPhone /> {phone}
                </p>
            </div>
            <button
                className={styles.btn}
                onClick={() => deleteContact(id)}
                type="button"
            >
                Delete
            </button>
        </div>
    );
};

export default Contact;