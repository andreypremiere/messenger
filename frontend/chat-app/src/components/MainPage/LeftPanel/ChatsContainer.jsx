import React from "react";
import styles from './ChatsContainer.module.css'
import ChatComponent from "./ChatComponent";
import { useState, useEffect } from "react";


function ChatsContainer({ currentChat, userChats, handleSetCurrentChat}) {
    return(
        <div className={styles["container"]}>
            {userChats.map((chat) => {
                return (<ChatComponent key={chat.chat_id} dataChat={chat} 
                    handleSetCurrentChat={handleSetCurrentChat}
                    currentChat={currentChat}
                />)
            })}
        </div>
    );
}

export default ChatsContainer;