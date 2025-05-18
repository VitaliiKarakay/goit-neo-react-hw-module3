import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import styles from "./css/ContactForm.module.css";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name cannot exceed 50 characters")
        .required("Please enter a name"),
    number: Yup.string()
        .test(
            "is-valid-phone",
            "Please enter a valid phone number",
            (value) => {
                if (!value) return false;
                const phoneNumber = parsePhoneNumberFromString(value, "UA"); // Default country: Ukraine
                return phoneNumber ? phoneNumber.isValid() : false;
            }
        )
        .required("Please enter a phone number"),
});

const ContactForm = ({ createContact }) => {
    const handleSubmit = (values, actions) => {
        const { name, number } = values;

        const phoneNumber = parsePhoneNumberFromString(number, "UA");
        const formattedNumber = phoneNumber ? phoneNumber.format("E.164") : number;

        const contact = {
            id: nanoid(),
            name,
            number: formattedNumber,
        };

        createContact(contact);
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{ name: "", number: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <div className={styles.wrapper}>
                <Form className={styles.form}>
                    <label className={styles.field}>
                        <span className={styles.tag}>Name</span>
                        <Field className={styles.input} type="text" name="name" />
                        <ErrorMessage className={styles.error} name="name" component="span" />
                    </label>
                    <label className={styles.field}>
                        <span className={styles.tag}>Number</span>
                        <Field className={styles.input} type="tel" name="number" />
                        <ErrorMessage className={styles.error} name="number" component="span" />
                    </label>
                    <button className={styles.btn} type="submit">
                        Add contact
                    </button>
                </Form>
            </div>
        </Formik>
    );
};

export default ContactForm;