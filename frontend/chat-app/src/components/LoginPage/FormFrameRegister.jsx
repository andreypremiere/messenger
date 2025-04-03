import React, { useState } from "react";
import styles from './FormFrameRegister.module.css'
import Button from "./Button";

function FormFrameRegister() {
    const patternPhone = "^\\+7(\\d{10})$";
    const patternEmail = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    const [personData, setPersonData] = useState(
        {
            numberPhone: '',
            nickname: '',
        }
    ) 

    const handleChange = (e) => {
        const {name, value} = e.target;

        setPersonData({
            ...personData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(personData);
    }

    return(
        <div className={styles['form-frame']}>
            <div className={styles['container']}>
                <form className={styles['form']} onSubmit={handleSubmit}>
                    <input type='tel' name='numberPhone' id="phone" value={personData.numberPhone}
                        onChange={handleChange} placeholder="Номер телефона" 
                        pattern={patternPhone} className={styles['input']} required/>

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