import React from "react";
import JSXStyle from "styled-jsx/style";

const stylesButton = `
    div {
        display: flex;
        width: 100%;
        justify-content: center;
    }

    button {
        display: flex;
        padding: 6px 20px;
        text-align: center;
        background: #444343;
        font-family: 'IBM Plex Mono', monospace;
        font-size: 16px;
        font-weight: 500;
        transition: box-shadow 0.3s ease;
        border-radius: 8px;
        color: white;
        border-style: none;
        cursor: pointer;    
    }

    button:hover {
        box-shadow: 0 0 6px 0 #8cc6ff;
    }

    button:active {
        background:rgb(44, 44, 44);
    }
`;

function Button({text, handleSubmit}) {
    return(
        <div>
            <button type="submit" onSubmit={handleSubmit}>{text}</button>
            <style jsx>{stylesButton}</style>
        </div>
    )
}

export default Button;

