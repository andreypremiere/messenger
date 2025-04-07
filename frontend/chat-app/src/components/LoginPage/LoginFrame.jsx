import React, { useState } from "react";
import styles from './LoginFrame.module.css'
import Switcher from "./Switcher";
import FormFrameLogin from "./FormFrameLogin";
import ConfirmCode from "../ConfirmationCodePage/ConfirmCode";
import FormFrameRegister from "./FormFrameRegister";

function LoginFrame() {
    const [registerState, setRegisterState] = useState(false);

    const handleRegisterStateChange = (newState) => {
        setRegisterState(newState);
        console.log('Состояние переключателя: ', newState)
    }

    return(
        <div className={styles['main-frame']}>
            <Switcher onChange={handleRegisterStateChange}/>

            {registerState ? <FormFrameRegister/> : <FormFrameLogin/>}

            {/* Это включаем, когда в formframe нажимаем отправить код */}
            {/* <ConfirmCode/> */}
        </div>
    );
}

export default LoginFrame;