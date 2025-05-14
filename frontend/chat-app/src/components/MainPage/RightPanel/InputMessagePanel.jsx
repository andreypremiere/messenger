import React, { useRef, useState } from "react";
import styles from './InputMessagePanel.module.css'
import {ReactComponent as IconMic} from '../../../assets/icons/icon-mic.svg'
import {ReactComponent as IconSend} from '../../../assets/icons/icon-send.svg'
import {ReactComponent as IconPaperClip} from '../../../assets/icons/icon-paper-clip.svg'
import {ReactComponent as IconClose} from '../../../assets/icons/icon_close.svg'

function InputMessagePanel( {handleSendMessage} ) {
    const [message, setMessage] = useState('')
    const fileInputRef = useRef(null)
    const [pinnedFiles, setPinnedFiles] = useState([])

    const handleSetMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleCleanFiles = () => {
        setPinnedFiles([])
    }

    const prepareForSending = () => {
        if (pinnedFiles.length === 0) {
            console.log('Длина массива равна нулю')
        }
        else {
            handleSendMessage(pinnedFiles)
            setPinnedFiles([])

            // console.log('Длина массива больше нуля')

        }
    }

    const handleAddFile = () => {
        fileInputRef.current.click()
    }

    const handleRemoveFile = (fileName) => {
        setPinnedFiles(prev => prev.filter(file => file.name !== fileName));
    };

    const openFileDialog = (event) => {
        const file = event.target.files[0];  // Получаем первый выбранный файл
        if (file) {
            const reader = new FileReader();

            reader.onload = () => {
                const content = reader.result;
                const array = JSON.parse(content)
                setPinnedFiles([...pinnedFiles, { name: file.name, data: array }])
                console.log(pinnedFiles.length)
            };

            reader.onerror = () => {
                console.error("Ошибка при чтении файла");
            };

            reader.readAsText(file);  // Чтение файла как текста (можно использовать другие методы для других типов файлов)
        }

        event.target.value = null;
    };

    return(
        <div className={styles['main-container']}>
            <div className={styles['container']}>
                <div className={styles['hidden-container-icon']} onClick={handleAddFile}>
                    <IconPaperClip className={styles['icon']}></IconPaperClip>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={openFileDialog}></input>
                </div>

                <div className={styles['container-input']}>
                    {/* Выпадающий список файлов */}
                    {pinnedFiles.length > 0 && (
                        <div className={styles['files-list']}>
                            {pinnedFiles.map(file => (
                                <div key={file.name} className={styles['file-item']}>
                                    <span>{file.name}</span>
                                    <IconClose
                                        className={styles['close-icon']}
                                        onClick={() => handleRemoveFile(file.name)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <input type="text" id="message" className={styles['input']} value={message} onChange={handleSetMessage}/>
                </div>
                
                <div className={styles['container-icon']} onClick={() => {
                    prepareForSending(); 
                    setMessage('')
                }}>
                    <IconSend className={styles['icon']}/>
                </div>
            </div>
        </div>
    );
}

export default InputMessagePanel;