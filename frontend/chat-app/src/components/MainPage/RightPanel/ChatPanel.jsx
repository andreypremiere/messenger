import React, { useEffect, useState } from "react";
import styles from "./ChatPanel.module.css"
import MessageComponent from "./MessageComponent";
import { useChat } from "../../../utils/ChatContext/ChatContext";


function ChatPanel({userData, currentChat, messages}) {


    // 1. Добавить автоматическую прокрутку вниз при появлении сообщений

    // 2. Добавить эффект запроса первых 40 сообщений


    return(
        <div className={styles['main-container']}>
            {/* Здесь отображение сообщений */}
            <div className={styles['messages-container']}>
                {messages.map((msg) => {
                    console.log("Сообщение:", msg);
                    return <MessageComponent key={msg._id} user_id={userData.userId} message={msg}></MessageComponent>
                })}
            </div>
        </div>
    );
}

export default ChatPanel;