import React, { useEffect, useState } from "react";
import styles from "./EnterForm.module.css"
import Button from "./Button";

function EnterForm({method}) {
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
            setPlaceholder('Auth код')
            setPattern(method)
        }
    }, [method]);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('Форма отправлена', )
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

                <Button text={'Получить код'} handleSubmit={handleSubmit}/>
            </form>
        </div>
    );
}

export default EnterForm;