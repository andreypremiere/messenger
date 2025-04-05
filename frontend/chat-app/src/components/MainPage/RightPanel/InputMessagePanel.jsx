import React, { useState } from "react";
import styles from './InputMessagePanel.module.css'
import {ReactComponent as IconMic} from '../../../assets/icons/icon-mic.svg'


function InputMessagePanel() {
    const [message, setMessage] = useState('')

    const handleSetMessage = (e) => {
        setMessage(e.target.value);
    };

    return(
        <div className={styles['main-container']}>
            <div className={styles['container']}>
                <input type="text" id="message" className={styles['input']} value={message} onChange={handleSetMessage}/>
                <div className={styles['container-icon']}>
                    <IconMic className={styles['icon']}/>
                </div>
            </div>
        </div>
    );
}

export default InputMessagePanel;