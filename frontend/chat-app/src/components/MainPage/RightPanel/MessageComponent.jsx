import React from "react";
import styles from './MessageComponent.module.css'


function MessageComponent({user_id, message}) {
    return(
        <div className={`${styles['container']} ${user_id === message.id_user ? styles['me-pos'] : styles['other-pos']}`}>
            <div className={`${styles['message']} ${user_id === message.id_user ? styles['me-back'] : styles['other-back']}`}>
                <span className={styles['text']}>
                    {message.message}
                </span>
            </div>
        </div>
    );
}

export default MessageComponent;