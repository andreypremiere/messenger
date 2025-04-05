import React, { useState } from "react";
import styles from './FormFrameRegister.module.css'
import Button from "./Button";
import { registerRequest } from "../../utils/LoginPage/LoginPageRequests";

function FormFrameRegister() {
    const patternPhone = "^\\+7(\\d{10})$";
    const patternEmail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";    
    const [personData, setPersonData] = useState(
        {
            numberPhone: '',
            nickname: '',
            email: ''
        }
    ) 

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPersonData({
            ...personData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerRequest(personData); // ждем ответа
        console.log('Запрос выполнен');
    }

    return(
        <div className={styles['form-frame']}>
            <div className={styles['container']}>
                <form className={styles['form']} onSubmit={handleSubmit}>
                    <input type='tel' name='numberPhone' id="phone" value={personData.numberPhone}
                        onChange={handleChange} placeholder="Номер телефона" 
                        pattern={patternPhone} className={styles['input']} required/>

                    <input type='email' name='email' id="email" value={personData.email}
                        onChange={handleChange} placeholder="Электронная почта" 
                        className={styles['input']} pattern={patternEmail} required/>

                    <input type='text' name='nickname' id="nickname" value={personData.nickname}
                        onChange={handleChange} placeholder="Никнейм" 
                        className={styles['input']} required/>

                    <Button text={'Зарегистрироваться'}/>
                </form>
            </div>
        </div>
    );
}

export default FormFrameRegister;