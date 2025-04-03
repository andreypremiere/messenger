import React, { useState } from "react";
import SwitcherMethod from "./SwitcherMethod";
import EnterForm from "./EnterForm";


const styles = `
    .form-frame {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        padding: 14px;
        border-radius: 20px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
        background-color: white;
        box-sizing: border-box;
    }
`


function FormFrameLogin() {
    const [enterMethod, setEnterMethod] = useState('tel')

    const handleSetMethod = (method) => {
        setEnterMethod(method)
        console.log(method)
    }

    return(
        <div className='form-frame'>
            <SwitcherMethod handleSetMethod={handleSetMethod}></SwitcherMethod>
            
            <EnterForm method={enterMethod}/>

            <style jsx>{styles}</style>
        </div>
    );
}

export default FormFrameLogin;