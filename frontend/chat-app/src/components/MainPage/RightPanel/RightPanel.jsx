import React from "react";
import styles from './RightPanel.module.css'
import TopPanel from "./TopPanel";
import ChatPanel from "./ChatPanel";
import InputMessagePanel from "./InputMessagePanel";

function RightPanel() {
    return(
        <div className={styles['main-container']}>
            {/* Верхняя панель */}
            <TopPanel></TopPanel>

            <div className={`${styles['container']}`}>
                {/* <div className={styles['filling-container']}>
                    <div className={styles['center-container']}>
                        
                    </div>
                </div> */}
                
                {/* Панель с чатом */}
                <ChatPanel></ChatPanel>

                {/* Панель для записи сообщения */}
                <InputMessagePanel></InputMessagePanel>
            </div>
        </div>
    );
}

export default RightPanel;