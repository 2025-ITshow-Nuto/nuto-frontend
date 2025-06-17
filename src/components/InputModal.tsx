import { useState } from "react";
import ModalPortal from "../pages/Mobile/ModalPortal";
import styles from "../styles/InputModal.module.css";
import { AiFillEyeInvisible } from "react-icons/ai";
import { MdVisibility } from "react-icons/md";

type InputModalProps = {
  q: string;
  setState: (val?: string) => void;
  setShowInput: (val: boolean) => void;
};

export default function InputModal({
  q,
  setState,
  setShowInput,
}: InputModalProps) {
  const [val, setVal] = useState("");
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    if (val.trim() === "") return;
    setShowInput(false);
    setState(val);
  };

  return (
    <ModalPortal>
      <div
        className={styles.inputContainer}
        onClick={() => {
          setShowInput(false);
        }}
      >
        <div className={styles.inputBox} onClick={(e) => e.stopPropagation()}>
          <p className={styles.question}>{q}</p>
          <input
            className={styles.input}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            type={visible ? "text" : "password"}
          />
          <div
            onClick={() => setVisible(!visible)}
            className={styles.visibleContainer}
          >
            {visible ? <AiFillEyeInvisible /> : <MdVisibility />}
          </div>
          <button className={styles.btn} onClick={handleClick}>
            확인
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}
