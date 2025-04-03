import React, { useState } from "react";
import styles from './SearchComponent.module.css'


function SearchComponent() {
    const [value, setValue] = useState('')

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    return(
        <div className={styles['search-container']}>
            <input type="text" value={value} onChange={handleOnChange} className={styles['input']}
            placeholder="Поиск чата"/>
        </div>
    );
}

export default SearchComponent;