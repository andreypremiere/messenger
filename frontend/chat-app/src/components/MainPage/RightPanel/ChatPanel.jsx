import React from "react";
import styles from "./ChatPanel.module.css"
import MessageComponent from "./MessageComponent";

const chatMessages = [
    { id: 1, id_user: 1, message: "Привет! Как у тебя дела?" },
    { id: 2, id_user: 2, message: "Привет! Все хорошо, спасибо! Как у тебя?" },
    { id: 3, id_user: 1, message: "Да тоже нормально, работаю над проектом." },
    { id: 4, id_user: 2, message: "Звучит интересно! Что за проект?" },
    { id: 5, id_user: 1, message: "Создаю приложение для чата. Хочу, чтобы оно выглядело современно и было удобным." },
    { id: 6, id_user: 2, message: "Отличная идея! Ты используешь React?" },
    { id: 7, id_user: 1, message: "Да, React + Spring Boot на бэке. Еще хочу сделать хранение сообщений в базе данных." },
    { id: 8, id_user: 2, message: "Здорово! Как ты будешь хранить сообщения? В PostgreSQL?" },
    { id: 9, id_user: 1, message: "Да, скорее всего в PostgreSQL. Еще подумаю, нужно ли кеширование." },
    { id: 10, id_user: 2, message: "Кеширование — это хорошая идея, особенно если сообщений будет много." },
    { id: 11, id_user: 1, message: "Согласен! Сейчас думаю, как лучше организовать фронтенд-часть." },
    { id: 12, id_user: 2, message: "Если нужно, могу помочь с UI-дизайном. У меня есть пара идей!" },
    { id: 13, id_user: 1, message: "Это было бы круто! Давай созвонимся, я покажу, что уже сделано." },
    { id: 14, id_user: 2, message: "Отлично, договорились! Когда тебе удобно?" },
    { id: 15, id_user: 1, message: "Завтра в 18:00 подойдет?" },
    { id: 16, id_user: 2, message: "Да, мне подходит! Тогда до завтра!" },
    { id: 17, id_user: 2, message: "Буб "},
    { id: 18, id_user: 2, message: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero sequi dicta, quaerat, culpa incidunt perspiciatis, doloremque dolorum at consequatur ut quo dolorem autem quidem delectus? Quod rem autem ipsa quae!"}
];


function ChatPanel() {
    // Добавить автоматическую прокрутку вниз при появлении сообщений


    return(
        <div className={styles['main-container']}>
            {/* Здесь отображение сообщений */}
            <div className={styles['messages-container']}>
                {chatMessages.map(msg => (
                    <MessageComponent key={msg.id} user_id={1} message={msg}></MessageComponent>
                ))}
            </div>
        </div>
    );
}

export default ChatPanel;