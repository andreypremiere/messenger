import React from "react";
import styles from './ChatsContainer.module.css'
import ChatComponent from "./ChatComponent";


function ChatsContainer({chats}) {

    return(
        <div className={styles["container"]}>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
            <ChatComponent/>
        </div>
    );
}

export default ChatsContainer;