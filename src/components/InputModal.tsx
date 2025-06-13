import { useState } from "react"
import ModalPortal from "../pages/Mobile/ModalPortal"
import styles from "../styles/InputModal.module.css"

type InputModalProps = {
    q: string,
    sendComment?: (name:string) => void,
    setShowInput: (val:boolean) => void
}

export default function InputModal({q, sendComment, setShowInput}:InputModalProps) {
    const [name, setName] = useState('')
    const handleClick = () => {
        if(name.trim() === '') return;
        setShowInput(false)
        sendComment(name)
    }

    return (
        <ModalPortal>
            <div className={styles.inputContainer}>
                <div className={styles.inputBox}>
                    <p className={styles.question}>{q}</p>
                    <input 
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className={styles.btn} onClick={handleClick}>확인</button>
                </div>
            </div>
        </ModalPortal>
    )
}