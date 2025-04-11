import React from "react";
import styles from './RightPanel.module.css'
import TopPanel from "./TopPanel";
import ChatPanel from "./ChatPanel";
import InputMessagePanel from "./InputMessagePanel";
import { useChat } from "../../../utils/ChatContext/ChatContext";
import { useState, useEffect } from "react";

function RightPanel({userData, jwtToken, currentChat, currentMessages, handleSendMessage}) {
    const { connect, closeConnection, send, currentMes } = useChat();
    const [messages, setMessages] = useState([])

    return(
        <div className={styles['main-container']}>
            {/* Верхняя панель */}
            <TopPanel currentChat={currentChat}></TopPanel>

            <div className={`${styles['container']}`}>
                {/* Панель с чатом */}
                <ChatPanel userData={userData} currentChat={currentChat} messages={currentMessages}></ChatPanel>

                {/* Панель для записи сообщения */}
                <InputMessagePanel userData={userData} currentChat={currentChat} handleSendMessage={handleSendMessage}></InputMessagePanel>
            </div>
        </div>
    );
}

export default RightPanel;