import React from "react";
import styles from './LoginPage.module.css'
import LoginFrame from "../../components/LoginPage/LoginFrame";

function LoginPage(){
    return(
        <div className={styles["main-container"]}>
            <LoginFrame/>
        </div>
    );
}

export default LoginPage;