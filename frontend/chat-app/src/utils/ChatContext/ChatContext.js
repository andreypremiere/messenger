import React, { createContext, useState, useContext, useEffect, useRef } from "react";

// Создаем контекст
const ChatContext = createContext();

// Провайдер контекста
export const ChatProvider = ({ children }) => {
    // const [chats, setChats] = useState([]);  // Список чатов пользователя
    // const [currentMessages, setCurrentMessages] = useState([]);  // сообщения текущего чата (выбранного)
    // const [currentChatId, setCurrentChatId] = useState(null);  //  id текущего чата
    const[currentMes, setCurrentMes] = useState('')

    const socketRef = useRef(null);

    const connect = (user_id) => {
        socketRef.current = new WebSocket(`ws://localhost:5000/ws?user_id=${user_id}`);
        const socket = socketRef.current;

        socket.onopen = () => {
            console.log("WebSocket connected");
            // send({ type: "get_chats" });
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data)

                if (data.type === 'message') {
                    setCurrentMes(data.message)
                    console.log(data.message)
                }
        };
    };
        //     switch (data.type) {
        //         case "chat_list":
        //             setChats(data.chats);
        //             break;

        //         case "message_history":
        //             if (data.chatId === currentChatId) {
        //                 setCurrentMessages(data.messages);
        //             }
        //             break;

        //         case "new_message":
        //             if (data.chatId === currentChatId) {
        //                 setCurrentMessages(prev => [...prev, {
        //                     sender: data.sender,
        //                     content: data.content,
        //                     timestamp: data.timestamp
        //                 }]);
        //             }
        //             break;

        //         default:
        //             console.warn("Неизвестный тип WS:", data.type);
        //     }
        // };

        // socket.onclose = () => {
        //     console.log("WebSocket disconnected");
        // };

        // // Отправить сообщение через WebSocket
        // const send = (msg) => {
        //     if (socket.readyState === WebSocket.OPEN) {
        //         socket.send(JSON.stringify(msg));
        //     }
        // };

        // // Функции для отправки сообщений
        // const sendMessage = (chatId, content) => {
        //     send({ type: "send_message", chatId, content });
        // };

        // // Выбор чата
        // const selectChat = (chatId) => {
        //     setCurrentChatId(chatId);
        //     setCurrentMessages([]);
        //     send({ type: "get_messages", chatId });
        // };

    const send = () => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({type: 'message', message: 'Привет'}));
        }
    };

    const closeConnection = () => {
            if (socketRef.current) {
                socketRef.current.close();  // Закрываем WebSocket-соединение
                console.log("WebSocket connection closed");
            }
        };

    return (
        <ChatContext.Provider value={{ connect, closeConnection, send, currentMes }}>
            {children}
        </ChatContext.Provider>
    );
};

// Хук для использования контекста
export const useChat = () => useContext(ChatContext);
