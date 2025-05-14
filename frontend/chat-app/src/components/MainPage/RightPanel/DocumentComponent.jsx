import React from "react";
import styles from './DocumentComponent.module.css'


function DocumentComponent({user_id, message}) {
    const handleExport = () => {
        const jsonStr = JSON.stringify(message.data, null, 2); // красиво отформатировано
        const blob = new Blob([jsonStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = message.file_name || "file.json";
        a.click();

        URL.revokeObjectURL(url); // освободить память
    };

    return(
        <div className={`${styles['container']} ${user_id === message.sender ? styles['me-pos'] : styles['other-pos']}`}>
            <div className={`${styles['message']} ${user_id === message.sender ? styles['me-back'] : styles['other-back']}`}>
                <span className={styles['file']} onClick={handleExport}>
                    {message.file_name}
                </span>
            </div>
        </div>
    );
}

export default DocumentComponent;