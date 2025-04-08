import React, { useEffect, useState } from "react";
import styles from "./EnterForm.module.css"
import Button from "./Button";
import { loginRequest } from "../../utils/LoginPage/LoginPageRequests";
import { useNavigate } from "react-router-dom";

function EnterForm({method}) {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('')
    const [placeholder, setPlaceholder] = useState('Номер телефона')
    const patternPhone = "^\\+7(\\d{10})$";
    const patternEmail = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    const [pattern, setPattern] = useState(patternPhone)

    useEffect(() => {
        if (method === 'tel') {
            setPlaceholder('Номер телефона')
            setPattern(patternPhone)
        }
        else if (method === 'email') {
            setPlaceholder('Email')
            setPattern(patternEmail)
        }
        else if (method === 'text') {
            setPlaceholder('Никнейм')
            setPattern(null)
        }
    }, [method]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const data = {
            nickname: (method === 'text' ? inputValue : null),
            numberPhone: (method === 'tel' ? inputValue : null),
            email: (method === 'email' ? inputValue : null)
        }

        const userId = await loginRequest(data); 

        if (userId != null) {
            navigate('/confirm', {state: {isRegister: false, userId: userId}})
        }
    }

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    return(
        <div className={styles['container']}>
            <form onSubmit={handleSubmit} className={styles['form']}>
                <input type={method} id="contact" value={inputValue}
                onChange={handleInputValue} placeholder={placeholder} 
                pattern={pattern} className={styles['input']} required/>

                <Button text={'Получить код'}/>
            </form>
        </div>
    );
}

export default EnterForm;