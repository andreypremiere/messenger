import React from "react";
import styles from './ChatComponent.module.css'


function ChatComponent({currentChat, previusChat, dataChat, handleSetCurrentChat}) {
    const handleClick = (e) => {
        handleSetCurrentChat(dataChat);
    }

    return(
        <div className={`${styles["main-container"]} ${currentChat && (currentChat.chat_id === dataChat.chat_id ? styles['isActive'] : '')}`} onClick={handleClick}>
            <div className={styles["avatar"]}>
                <img className={styles["image"]} src={dataChat.url} alt="Изображение" />
            </div>
            <div className={styles["data-chat"]}>
                <span className={styles['nickname']}>{dataChat.nickname}</span>
                <div className={styles["last-message-container"]}>
                    <span className={`${styles["last-message"]} ${styles['person']}`}>Вы:</span>
                    <span className={styles["last-message"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, esse vel? Commodi hic dolorum eveniet laboriosam! Eius illum nesciunt earum ducimus, omnis, nostrum doloremque animi, assumenda ab vel sapiente corporis!</span>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent;