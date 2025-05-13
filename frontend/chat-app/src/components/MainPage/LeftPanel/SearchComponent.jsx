import React, { useEffect, useState } from "react";
import styles from './SearchComponent.module.css'
import {ReactComponent as IconClose} from '../../../assets/icons/icon_close.svg'


function SearchComponent({value, setValue, handlePerformSearch}) {

    const handleOnChange = (e) => {
        setValue(e.target.value)
    }

    const handleClean = (e) => {
        setValue('')
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            if (value) {
                console.log('Поиск начат')
                handlePerformSearch();
            }
            
        }, 1200)

        return () => clearTimeout(handler)
    }, [value])

    return(
        <div className={styles['search-container']}>
            <div className={styles['input-wrapper']}>
                <input type="text" value={value} onChange={handleOnChange} className={styles['input']}
                placeholder="Поиск чата"/>

                <IconClose className={styles['icon']} onClick={handleClean}></IconClose>
            </div>
            
        </div>
    );
}

export default SearchComponent;