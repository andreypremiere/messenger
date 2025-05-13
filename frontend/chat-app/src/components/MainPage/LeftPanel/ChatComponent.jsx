import React from "react";
import styles from './ChatComponent.module.css'


function ChatComponent({currentChat, dataChat, handleSetCurrentChat, userData}) {
    const handleClick = (e) => {
        handleSetCurrentChat(dataChat);
    }

    // console.log(userData)
    // console.log(dataChat)
    // console.log(dataChat.participants.find(p => p.id !== userData.userId)?.nickname)

    return(
        <div className={`${styles["main-container"]} ${currentChat && (currentChat._id === dataChat._id ? styles['isActive'] : '')}`} onClick={handleClick}>
            <div className={styles["avatar"]}>
                <img className={styles["image"]} src='http://localhost:4566/user-avatars/user-1111.jpg' alt="Изображение" />
            </div>
            <div className={styles["data-chat"]}>
                {
                    dataChat.name
                    ?
                    <span className={styles['nickname']}>{dataChat.name}</span>
                    : 
                    <span className={styles['nickname']}>{dataChat.participants.find(p => p.id !== userData.userId)?.nickname}</span>
                }
                <div className={styles["last-message-container"]}>
                    <span className={`${styles["last-message"]} ${styles['person']}`}>Вы:</span>
                    <span className={styles["last-message"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, esse vel? Commodi hic dolorum eveniet laboriosam! Eius illum nesciunt earum ducimus, omnis, nostrum doloremque animi, assumenda ab vel sapiente corporis!</span>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent;