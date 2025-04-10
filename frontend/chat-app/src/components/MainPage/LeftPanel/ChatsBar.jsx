import React from "react";
import styles from './ChatsBar.module.css'
import SearchComponent from "./SearchComponent";
import ChatsContainer from "./ChatsContainer";
import BottomBar from "./BottomBar";

function ChatsBar({userData, jwtToken, currentChat, userChats, handleSetCurrentChat}) {
    return(
        <div className={styles["sidebar"]}>
            <SearchComponent/>

            <ChatsContainer currentChat={currentChat} userChats={userChats} 
            handleSetCurrentChat={handleSetCurrentChat}/>

            <BottomBar/>
        </div>
    );
}

export default ChatsBar;