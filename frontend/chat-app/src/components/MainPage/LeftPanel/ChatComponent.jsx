import React from "react";
import styles from './ChatComponent.module.css'


function ChatComponent({currentChat, dataChat, handleSetCurrentChat}) {
    const handleClick = (e) => {
        handleSetCurrentChat(dataChat);
    }

    return(
        <div className={`${styles["main-container"]} ${currentChat && (currentChat._id === dataChat._id ? styles['isActive'] : '')}`} onClick={handleClick}>
            <div className={styles["avatar"]}>
                <img className={styles["image"]} src='blob:https://web.telegram.org/548cb830-cac9-4c5f-bb25-1c9cf90c0439' alt="Изображение" />
            </div>
            <div className={styles["data-chat"]}>
                <span className={styles['nickname']}>{dataChat._id}</span>
                <div className={styles["last-message-container"]}>
                    <span className={`${styles["last-message"]} ${styles['person']}`}>Вы:</span>
                    <span className={styles["last-message"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, esse vel? Commodi hic dolorum eveniet laboriosam! Eius illum nesciunt earum ducimus, omnis, nostrum doloremque animi, assumenda ab vel sapiente corporis!</span>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent;