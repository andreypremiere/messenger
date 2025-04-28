import React from "react";
import styles from './ChatsContainer.module.css'
import ChatComponent from "./ChatComponent";
import { useState, useEffect } from "react";


function ChatsContainer({ currentChat, userChats, handleSetCurrentChat, userData}) {
    return(
        <div className={styles["container"]}>
            {userChats.map((chat) => {
                return (<ChatComponent key={chat._id} dataChat={chat} 
                    handleSetCurrentChat={handleSetCurrentChat}
                    currentChat={currentChat} userData={userData}
                />)
            })}
        </div>
    );
}

export default ChatsContainer;