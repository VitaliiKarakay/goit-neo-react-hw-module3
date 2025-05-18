import { useId } from "react";
import styles from "./css/SearchBox.module.css";

const SearchBox = ({ value, handleChange }) => {
    const searchBoxId = useId();

    return (
        <div className={styles.searchCard}>
            <label htmlFor={searchBoxId}>Find contacts by name</label>
            <input
                id={searchBoxId}
                className={styles.searchInput}
                type="search"
                value={value}
                onChange={(event) => {
                    const newValue = event.target.value.trim().toLowerCase();
                    handleChange(newValue);
                }}
            />
        </div>
    );
};

export default SearchBox;