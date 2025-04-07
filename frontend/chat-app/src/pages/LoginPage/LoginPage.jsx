import React from "react";
import styles from './LoginPage.module.css'
import LoginFrame from "../../components/LoginPage/LoginFrame";
import ConfirmCode from "../../components/ConfirmationCodePage/ConfirmCode";

function LoginPage(){
    return(
        <div className={styles["main-container"]}>
            <LoginFrame/>
            {/* <ConfirmCode></ConfirmCode> */}
        </div>
    );
}

export default LoginPage;