import React from "react";
import styles from './ChatsContainer.module.css'
import ChatComponent from "./ChatComponent";
import { useState, useEffect } from "react";


function ChatsContainer({ currentChat, userChats, handleSetCurrentChat, userData, findedChat, value}) {

    // useEffect(() => {

    // }, [findedChat])

    return(
        <div className={styles["container"]}>
            {
                !findedChat && !value
                ?
                userChats.map((chat) => {
                    return (<ChatComponent key={chat._id} dataChat={chat} 
                        handleSetCurrentChat={handleSetCurrentChat}
                        currentChat={currentChat} userData={userData}
                    />)
                })
                :
                <div className={styles['subcontainer']}>
                    {userChats && userChats.map((chat) => {
                        return (<ChatComponent key={chat._id} dataChat={chat} 
                        handleSetCurrentChat={handleSetCurrentChat}
                        currentChat={currentChat} userData={userData}
                        />)
                    })}
                    <span>Глобальный поиск</span>
                    {findedChat && findedChat.map((chat) => {
                        return (<ChatComponent key={chat._id} dataChat={chat} 
                        handleSetCurrentChat={handleSetCurrentChat}
                        currentChat={currentChat} userData={userData}
                        />)
                    })}
                </div>
            }
            
        </div>
    );
}

export default ChatsContainer;