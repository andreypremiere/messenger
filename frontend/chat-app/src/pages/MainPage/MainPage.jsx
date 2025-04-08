import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.css"
import ChatsBar from "../../components/MainPage/LeftPanel/ChatsBar";
import RightPanel from "../../components/MainPage/RightPanel/RightPanel";
import { decodeJWT } from "../../utils/JwtProvider/JwtProvider";
import { useLocation } from "react-router-dom";

const chatsExample = [
    {chat_id: 1, nickname: 'Ivan', url: 'https://avatars.mds.yandex.net/i?id=4365ae8e173b59a915b5a8057ed767f3_l-4055448-images-thumbs&n=13'},
    {chat_id: 2, nickname: 'Vasya', url: 'https://cm.author.today/content/2021/04/25/u/tonyraut6351_637549537739902502.jpg'},
    {chat_id: 3, nickname: 'Gangster007', url: 'https://avatars.mds.yandex.net/i?id=36e6c48885a02134b4c0251c1bd8d3c4_l-10128025-images-thumbs&n=13'}
]


function MainPage() {
    const location = useLocation()
    const { jwt } = location.state
    const [jwtToken, setJwtToken] = useState(jwt)
    const [userData, setUserData] = useState({})
    const [currentChat, setCurrentChat] = useState({})
    const [userChats, setUserChats] = useState(chatsExample)

    useEffect(() => {
        setUserData(decodeJWT(jwtToken));
    }, [jwtToken]);
    
    useEffect(() => {
        console.log(userData.nickname);
        console.log(userData.userId);
    }, [userData]); 

    // useEffect(() => {
    //     setUserChats(chatsExample)
    // }, []);

    const handleSetCurrentChat = (chat) => {
        setCurrentChat(chat);
        console.log(chat);
    }

    return(
        <div className={styles["main-container"]}>
            {/* Левый sidebar который хранит чаты */}
            <ChatsBar userData={userData} jwtToken={jwtToken} currentChat={currentChat} userChats={userChats} handleSetCurrentChat={handleSetCurrentChat}></ChatsBar>   

            {/* Правая панель с чатом */}

            {Object.keys(currentChat).length === 0 ? 
            <div></div> : 
            <RightPanel userData={userData} jwtToken={jwtToken}></RightPanel>}

        </div>
    );
}

export default MainPage;