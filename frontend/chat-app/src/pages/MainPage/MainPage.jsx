import React from "react";
import styles from "./MainPage.module.css"
import ChatsBar from "../../components/MainPage/LeftPanel/ChatsBar";
import RightPanel from "../../components/MainPage/RightPanel/RightPanel";

function MainPage() {
    return(
        <div className={styles["main-container"]}>
            {/* Левый sidebar который хранит чаты */}
            <ChatsBar></ChatsBar>   

            {/* Правая панель с чатом */}
            <RightPanel></RightPanel>
        </div>
    );
}

export default MainPage;