import React, { useState, useEffect } from "react";
import BusinessCard from "../../components/BusinessCard";
import Members from "../../components/Members";
import { profiles } from "../../assets/json/profiles";
import style from "../../styles/Chat.module.css";
import Footer from "../../components/Footer";
import Chatting from "../../components/Chatting";
import axios from "axios";
import NutoPage from "../../components/NutoExplain";
import { Helmet } from "react-helmet";
import { usePostInfo } from "../../context/PostInfoContext";
import { useNavigate } from "react-router-dom";

type defaultChat = {
  type: "default-chat";
  data: {
    name: string;
    comment: string;
    img: string;
  };
};

type userChat = {
  type: "user-chat";
  data: {
    comment: string;
  };
};

function Chat() {
  const { name } = usePostInfo();
  const [profile, setProfile] = useState(profiles[0]);
  const [message, setMessage] = useState("");
  const [chattings, setChattings] = useState<(defaultChat | userChat)[]>([
    {
      type: "default-chat",
      data: {
        name: profile.name,
        comment: profile.comment,
        img: profile.img,
      },
    },
  ]);
  const [showcase, setShowcase] = useState("nuto");
  const navigate = useNavigate();

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/nuto-garden"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  const changeMember = (idx: number) => {
    console.log(idx, showcase);
    if (idx >= 0) {
      const changeDefaultChat: defaultChat = {
        type: "default-chat",
        data: {
          name: profiles[idx].name,
          comment: profiles[idx].comment,
          img: profiles[idx].img,
        },
      };

      setChattings([changeDefaultChat]);
      setProfile(profiles[idx]);
      setShowcase("members");
    } else {
      setShowcase("nuto");
    }
  };

  const inputedMessage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const chkText = async (text: string) => {
      text = text.replace(/\n/g, " ");

      const response = await axios.post(
        "https://nuto.mirim-it-show.site/check",
        {
          text: text,
        }
      );

      return response.data.label;
    };

    const able = await chkText(message);

    const negativeEmotions = [
      "anger",
      "annoyance",
      "confusion",
      "disappointment",
      "disapproval",
      "disgust",
      "embarrassment",
      "fear",
      "grief",
      "nervousness",
      "realization",
      "remorse",
      "sadness",
      "surprise",
    ];

    console.log(JSON.parse(able).label);

    if (!negativeEmotions.includes(JSON.parse(able).label)) {
      const newChatting: userChat = {
        type: "user-chat",
        data: { comment: message },
      };

      await axios.post(`https://nuto.mirim-it-show.site/message`, {
        name: profile.name,
        message: message,
        sender: name,
      });

      await axios.post(`https://nuto.mirim-it-show.site/message/email`, {
        to: profile.email,
        content: message,
      });

      setChattings([...chattings, newChatting]);
    } else {
      alert("부정적인 내용의 메시지는 보낼 수 없습니다.");
    }
    setMessage("");
  };

  return (
    <div className={style.Body}>
      <Helmet>
        <title>chat</title>
      </Helmet>
      <header>
        <img alt="logo" src="/images/logo.svg" className={style.logo} />
      </header>
      <div className={style.sendMessageContainer}>
        <Members type="send" profiles={profiles} changeMember={changeMember} />
        {showcase === "members" ? (
          <>
            <BusinessCard profile={profile} />
            <Chatting chattings={chattings} />

            <div className={style["message-container"]}>
              <div className={style["input-container"]}>
                <input
                  placeholder="텍스트 입력"
                  value={message}
                  onChange={inputedMessage}
                />
              </div>
              <img
                src="/images/sendButton.png"
                alt="sendButton"
                onClick={sendMessage}
              />
            </div>
          </>
        ) : (
          <NutoPage />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
