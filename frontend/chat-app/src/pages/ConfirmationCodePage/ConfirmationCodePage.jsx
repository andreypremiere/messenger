import React from "react";
import styles from "./ConfirmationCode.Page.module.css"
import ConfirmCode from "../../components/ConfirmationCodePage/ConfirmCode";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmationCodePage(){
    const location = useLocation()
    const {isRegister, userId} = location.state

    return(
        <div className={styles["main-container"]}>
            {/* <LoginFrame/> */}
            <ConfirmCode isRegister={isRegister} userId={userId}></ConfirmCode>
        </div>
    );
}

export default ConfirmationCodePage;