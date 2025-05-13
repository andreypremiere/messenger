import React, { useEffect, useState } from "react";
import styles from './ChatsBar.module.css'
import SearchComponent from "./SearchComponent";
import ChatsContainer from "./ChatsContainer";
import BottomBar from "./BottomBar";
import getUsersByNickname from '../../../utils/MainPage/UsersRequests'

function ChatsBar({userData, jwtToken, currentChat, userChats, handleSetCurrentChat}) {
    const [value, setValue] = useState('')
    const [findedChat, setFindedChat] = useState([])

    const handlePerformSearch = async () => {
        let users = await getUsersByNickname(value);
        console.log(users)
    }

    useEffect(() => {
        if (!value) {
            setFindedChat(null)
        }
    }, [value])


    return(
        <div className={styles["sidebar"]}>
            <SearchComponent value={value} setValue={setValue} handlePerformSearch={handlePerformSearch}/>

            <ChatsContainer currentChat={currentChat} userChats={userChats} 
            handleSetCurrentChat={handleSetCurrentChat} userData={userData} 
            findedChat={findedChat} value={value}/>

            <BottomBar/>
        </div>
    );
}

export default ChatsBar;