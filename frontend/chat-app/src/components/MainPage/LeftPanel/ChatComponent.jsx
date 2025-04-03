import React from "react";
import styles from './ChatComponent.module.css'


function ChatComponent() {
    return(
        <div className={styles['main-container']}>
            <div className={styles["avatar"]}>
                <img className={styles["image"]}src="https://i.pinimg.com/736x/e2/7c/05/e27c05f2cd62c1116e8c9f81cdc74e35.jpg" alt="Изображение" />
            </div>
            <div className={styles["data-chat"]}>
                <span className={styles['nickname']}>Nickname</span>
                <div className={styles["last-message-container"]}>
                    <span className={`${styles["last-message"]} ${styles['person']}`}>Вы:</span>
                    <span className={styles["last-message"]}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, esse vel? Commodi hic dolorum eveniet laboriosam! Eius illum nesciunt earum ducimus, omnis, nostrum doloremque animi, assumenda ab vel sapiente corporis!</span>
                </div>
            </div>
        </div>
    )
}

export default ChatComponent;