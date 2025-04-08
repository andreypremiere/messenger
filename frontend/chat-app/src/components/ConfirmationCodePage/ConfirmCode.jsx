import React, { useEffect, useState } from "react";
import Button from "../LoginPage/Button";
import styles from './ConfirmCode.module.css'
import { verifyCodeRequest } from "../../utils/ConfirmationCodePage/ConfirmationCodePageRequests";
import { useNavigate } from "react-router-dom";


function ConfirmCode( {isRegister, userId} ) {
    const navigate = useNavigate()
    const [code, setCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(120);
    const [expired, setExpired] = useState(false);

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await verifyCodeRequest({userId: userId, codeConfirmation: code})
        console.log(token)
        navigate('/main', {state: {jwt: token.token}})
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer)
                    setExpired(true)
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [])

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(1, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    return(
        <div className={styles['form-frame']}>
            <div className={styles['container']}>
                <form className={styles["form"]} onSubmit={handleSubmit}>
                    <input type={'text'} id="code" value={code} className={styles["input"]}
                    inputMode="numeric" pattern="\d*" maxLength="6" onChange={handleCode} 
                    placeholder='Введите код' required/>

                    <Button text={'Отправить'}/>
                </form>
                <span
                    className={
                        expired
                            ? `${styles['repeat-code']} ${styles['active']}`
                            : styles['repeat-code']
                    }
                >
                    {expired ? 'Отправить код еще раз' : `Отправить код еще раз ${formatTime(timeLeft)}`}
                </span>
            </div>
        </div>
    );
}

export default ConfirmCode;