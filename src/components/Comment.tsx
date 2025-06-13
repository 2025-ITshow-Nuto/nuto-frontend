import axios from "axios";
import styles from "../styles/Comment.module.css";
import { useEffect, useState } from "react";
import { format, toZonedTime } from "date-fns-tz";
import ChatBox from "./ChatBox";
import { motion, useDragControls, useAnimation } from "framer-motion";
import { parseISO } from "date-fns";

const timeZone = "Asia/Seoul";

function Comment({
  postId,
  setSelectPost,
}: {
  postId: string;
  setSelectPost: (string) => void;
}) {
  const controls = useDragControls();
  const animation = useAnimation();
  const [otherComment, setOtherComment] = useState([]);
  const [comment, setComment] = useState("");

  const close = (e) => {
    if (e.target === e.currentTarget) {
      setSelectPost(null);
    }
  };

  const sendComment = async () => {
    const name = prompt("이름을 입력해주세요");
    await axios.post("https://nuto.mirim-it-show.site/post/comment", {
      name,
      comment,
      postId,
    });
    setComment("");
    fetch();
  };

  const fetch = async () => {
    const response = await axios.get(
      `https://nuto.mirim-it-show.site/post/comment/${postId}`
    );
    setOtherComment(response.data.comments);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDragEnd = (event, info) => {
    if (info.offset.y > 90) {
      setSelectPost(null);
    } else {
      animation.start({
        y: 0,
        transition: { type: "tween", duration: 0.3, ease: "easeOut" },
      });
    }
  };

  return (
    <motion.div
      className={styles.container}
      drag="y"
      dragControls={controls}
      dragListener={false}
      onDragEnd={handleDragEnd}
      animate={animation}
      initial={{ y: 0 }}
    >
      <motion.div
        className={styles.handle}
        onPointerDownCapture={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
      >
        <div className={styles.bar}></div>
      </motion.div>
      <div className={styles.commentContainer}>
        <div>
          {otherComment &&
            otherComment.map((comment, i) => {
              const rawDate = comment.createdAt;
              const parsedDate = parseISO(rawDate);
              const zonedDate = toZonedTime(parsedDate, timeZone);
              const formatted = format(zonedDate, "MM-dd HH:mm", { timeZone });
              return (
                <div className={styles.commentBox}>
                  <p>{comment.name}</p>
                  <ChatBox
                    type="check"
                    time={formatted}
                    comment={comment.comment}
                  />
                </div>
              );
            })}
        </div>
        <div className={styles.messageContainer}>
          <div className={styles.inputContainer}>
            <input
              placeholder="텍스트 입력"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.input}
            />
          </div>
          <img
            src="/images/sendButton.png"
            alt="sendButton"
            onClick={sendComment}
            className={styles.sendBtn}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Comment;
