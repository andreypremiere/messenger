import React, { useState } from "react";
import styles from './TopPanel.module.css'
import {ReactComponent as IconOnline} from '../../../assets/icons/icons-online.svg'
import {ReactComponent as IconPhone} from '../../../assets/icons/icon-phone.svg'
import {ReactComponent as IconCamera} from '../../../assets/icons/icon-cam.svg'
import {ReactComponent as IconAdditional} from '../../../assets/icons/icon-additional.svg'


function TopPanel({currentChat, userData}) {
    const [isOnline, setIsOnline] = useState(true)

    console.log("Текущий чат:", currentChat)

    return(
        <div className={styles['main-container']}>
            <div className={styles['group']} style={{ width: "200px" }}>
                <div className={styles['avatar']}>
                    <img className={styles["img"]} src={currentChat.url} alt="Аватар" />
                </div>
                <div className={styles["person-data"]}>
                    {
                        currentChat.name
                        ?
                        <span className={styles['nickname']}>{currentChat.name}</span>
                        : 
                        <span className={styles['nickname']}>{currentChat.participants.find(p => p.id !== userData.userId)?.nickname}</span>
                    }
                    <div className={styles['status']}>
                        {isOnline && <IconOnline className={styles['icon-online']}/>}
                        <span className={styles["text-status"]}>{isOnline ? 'online' : 'offline'}</span>
                    </div>
                </div>
            </div>

            <div className={styles['right-group']}>
                <div style={{gap: "2px"}}>
                    <div className={styles['icon-cont']}>
                        <IconPhone className={styles['icon']}></IconPhone>
                    </div>
                    <div className={styles['icon-cont']}>
                        <IconCamera className={styles['icon']}></IconCamera>
                    </div>
                </div>
                
                <div className={styles['icon-cont']}>
                    <IconAdditional className={styles['icon']}></IconAdditional>
                </div>
            </div>
        </div>
    )
}

export default TopPanel;