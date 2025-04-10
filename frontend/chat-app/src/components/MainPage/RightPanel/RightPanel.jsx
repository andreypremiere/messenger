import React from "react";
import styles from './RightPanel.module.css'
import TopPanel from "./TopPanel";
import ChatPanel from "./ChatPanel";
import InputMessagePanel from "./InputMessagePanel";
import { useChat } from "../../../utils/ChatContext/ChatContext";
import { useState, useEffect } from "react";

function RightPanel({userData, jwtToken, currentChat,}) {
    const { connect, closeConnection, send, currentMes } = useChat();
    const [messages, setMessages] = useState([{'messageId': 0, 
            'sender': 2,
            'message': 'Привет'
        }])

    useEffect(() => {
        console.log('Запрос чатов')
        // Запрос сообщений с сервера
    }, [currentChat])

    const handleSendMessage = (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                messageId: prevMessages[prevMessages.length - 1].messageId + 1,
                sender: userData.userId,
                message: message,
            },
        ]);
        console.log(messages)
    }

    return(
        <div className={styles['main-container']}>
            {/* Верхняя панель */}
            <TopPanel currentChat={currentChat}></TopPanel>

            <div className={`${styles['container']}`}>
                {/* Панель с чатом */}
                <ChatPanel userData={userData} currentChat={currentChat} messages={messages}></ChatPanel>

                {/* Панель для записи сообщения */}
                <InputMessagePanel userData={userData} currentChat={currentChat} handleSendMessage={handleSendMessage}></InputMessagePanel>
            </div>
        </div>
    );
}

export default RightPanel;