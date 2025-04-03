import React, { useState } from "react";
import Button from "./Button";
import styles from './ConfirmCode.module.css'

function ConfirmCode() {
    const [code, setCode] = useState('');

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    return(
        <div className={styles['form-frame']}>
            <div className={styles['container']}>
                <form>
                    <input type={'text'} id="code" value={code}
                    onChange={handleCode} placeholder='Введите код' 
                    required/>

                    <Button text={'Войти'}/>
                </form>
            </div>
        </div>
    );
}

export default ConfirmCode;