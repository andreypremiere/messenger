import React, { useState } from "react";
import styles from './SwitcherMethod.module.css'

function SwitcherMethod({handleSetMethod}) {
    const [methodSwitcher, setMethodSwitcher] = useState('phone')

    const handleSetMethodSwitcher = (method) => {
        if (method === 'phone') {
            handleSetMethod('tel')
        }
        else if (method === 'email') {
            handleSetMethod('email')
        }
        else if (method === 'nick') {
            handleSetMethod('text')
        }

        setMethodSwitcher(method);
    }

    return(
        <div>
            <span className={`${styles['span']} ${methodSwitcher === 'phone' ? styles['isActive'] : styles['defaultActive']}`} onClick={() => handleSetMethodSwitcher('phone')}>по телефону</span>
            <span className={`${styles['span']} ${methodSwitcher === 'email' ? styles['isActive'] : styles['defaultActive']}`} onClick={() => handleSetMethodSwitcher('email')}>по email</span>
            <span className={`${styles['span']} ${methodSwitcher === 'nick' ? styles['isActive'] : styles['defaultActive']}`} onClick={() => handleSetMethodSwitcher('nick')}>по никнейму</span>
        </div>
    );
};

export default SwitcherMethod;