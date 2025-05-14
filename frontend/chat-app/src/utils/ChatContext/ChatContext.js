import React, { createContext, useState, useContext, useEffect, useRef } from "react";

// Создаем контекст
const ChatContext = createContext();

// Провайдер контекста
export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);  // Список чатов пользователя
    const [currentMessages, setCurrentMessages] = useState([]);  // сообщения текущего чата (выбранного)
    // const [currentChatId, setCurrentChatId] = useState(null);  //  id текущего чата

    const comingMessageCallback = useRef({callback: () => {}})
    const socketRef = useRef(null);

    const setComingMessageCallback = (callback) => {
        comingMessageCallback.current.callback = callback;
    }

    const connect = (user_id) => {
        socketRef.current = new WebSocket(`ws://localhost:5000/ws?user_id=${user_id}`);
        const socket = socketRef.current;

        socket.onopen = () => {
            console.log("WebSocket connected");
            getUserChats(user_id); // вызываем здесь
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('data после парса', data)

            if (data.type === 'get_chats') {
                // console.log(data.data)
                setChats(data.data)
            }
            else if (data.type === 'get_messages') {
                // console.log(data.data)
                setCurrentMessages(data.data)
            }
            else if (data.type === 'get_message') {
                console.log("Данные из провайдера при приеме:", data)
                // Исправить отправляемый результат на беке
                // console.log('typeof data:', typeof data);
                // console.log('is data an object?', data instanceof Object);

                comingMessageCallback.current.callback(data.data.data)
            }
            // Добавление сообщения для чата ml
            else if (data.type === 'response_message_ml') {
                console.log('Один документ пришел', data.data)
                comingMessageCallback.current.callback(data.data)
            }
            // Запрос истории сообщений
            else if (data.type === 'response_messages_ml') {
                console.log('История сообщений', data.data)
                setCurrentMessages(data.data)            
            }

        };
    };

    const getUserChats = (user_id) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({'type': 'get_chats', 'user_id': user_id}))
        }
    }

    const getCurrentMessages = (chat_id) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({'type': 'get_messages', 'chat_id': chat_id}))
        }
    }

    // Запрос сообщений для чата Ml
    const getCurrentMessagesML = (chat_id) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({'type': 'get_messages_ml', 'chat_id': chat_id}))
        }
    }

    const closeConnection = () => {
        if (socketRef.current) {
            socketRef.current.close();  // Закрываем WebSocket-соединение
            console.log("WebSocket connection closed");
        }
    };

    const sendMessage = (data) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({'type': 'send_message', 'data': data}))
        }
    }

    const sendRequestML = (data) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({'type': 'send_ml', 'data': data}))
        }
    }

    return (
        <ChatContext.Provider value={{ connect, closeConnection, getUserChats, chats, 
            getCurrentMessages, setCurrentMessages, currentMessages, sendMessage, 
            setComingMessageCallback, sendRequestML, getCurrentMessagesML

         }}>
            {children}
        </ChatContext.Provider>
    );
};

// Хук для использования контекста
export const useChat = () => useContext(ChatContext);
