// Switcher.js
import React, { useState } from "react";
import styles from './Switcher.module.css';

function Switcher({ onChange }) {
    const [isRegister, setRegister] = useState(false);

    const handleToggleEnter = () => {
        const newState = false;
        setRegister(newState);
        if (onChange) {
            onChange(newState);
        }
    };

    const handleToggleRegister = () => {
        const newState = true;
        setRegister(newState);
        if (onChange) {
            onChange(newState);
        }
    };

    return (
        <div className={styles['switch-container']}>
            <div className={`${styles['tab']} ${!isRegister ? styles['active'] : styles['not-active']}`} onClick={handleToggleEnter}>
                <span className={styles['label']}>Вход</span>
            </div>
            <div className={`${styles['tab']} ${isRegister ? styles['active'] : styles['not-active']}`} onClick={handleToggleRegister}>
                <span className={styles['label']}>Регистрация</span>
            </div>
        </div>
    );
}

export default Switcher;