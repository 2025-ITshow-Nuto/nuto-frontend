import { useState } from "react"
import ModalPortal from "../pages/Mobile/ModalPortal"
import styles from "../styles/InputModal.module.css"

type InputModalProps = {
    q: string,
    postId?: string,
    send?: (val:string) => void,
    setShowInput: (val:boolean) => void
}

export default function InputModal({q, send, setShowInput}:InputModalProps) {
    const [val, setVal] = useState('')
    const handleClick = () => {
        if(val.trim() === '') return;
        console.log(val);
        setShowInput(false)
        send(val)
    }

    return (
        <ModalPortal>
            <div className={styles.inputContainer}>
                <div className={styles.inputBox}>
                    <p className={styles.question}>{q}</p>
                    <input 
                        className={styles.input}
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                    />
                    <button className={styles.btn} onClick={handleClick}>확인</button>
                </div>
            </div>
        </ModalPortal>
    )
}