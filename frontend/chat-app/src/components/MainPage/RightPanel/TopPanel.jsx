import React, { useState } from "react";
import styles from './TopPanel.module.css'
import {ReactComponent as IconOnline} from '../../../assets/icons/icons-online.svg'
import {ReactComponent as IconPhone} from '../../../assets/icons/icon-phone.svg'
import {ReactComponent as IconCamera} from '../../../assets/icons/icon-cam.svg'
import {ReactComponent as IconAdditional} from '../../../assets/icons/icon-additional.svg'


function TopPanel() {
    const [isOnline, setIsOnline] = useState(true)

    return(
        <div className={styles['main-container']}>
            <div className={styles['group']} style={{ width: "200px" }}>
                <div className={styles['avatar']}>
                    <img className={styles["img"]} src="https://i.pinimg.com/736x/e2/7c/05/e27c05f2cd62c1116e8c9f81cdc74e35.jpg" alt="Аватар" />
                </div>
                <div className={styles["person-data"]}>
                    <span className={styles['nickname']}>Nickname</span>
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