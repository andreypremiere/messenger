import React from "react";
import styles from './BottomBar.module.css'
import { ReactComponent as IconSettings } from '../../../assets/icons/icon-settings.svg';
import { ReactComponent as IconAccount } from '../../../assets/icons/icon-account.svg';
import { ReactComponent as IconNewChat } from '../../../assets/icons/icon-new-chat.svg';


function BottomBar() {
    return(
        <div className={styles['main-container']}>
            <div className={styles['group']}>
                <div className={styles['icon']}>
                    <IconSettings className={styles['svg']}/>
                </div>
                <div className={styles['icon']}>
                    <IconAccount className={styles['svg']}/>
                </div>
            </div>

            <div className={`${styles['icon']} ${styles['icon-chat']}`}>
                <IconNewChat className={styles['svg']}/>
            </div>
        </div>
    );
}

export default BottomBar;