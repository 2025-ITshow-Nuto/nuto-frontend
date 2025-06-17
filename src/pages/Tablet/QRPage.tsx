import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import style from "../../styles/QRPage.module.css";
import { useNavigate } from "react-router-dom";

function QRPage() {
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <div className={style.qrContainer}>
      <header className={style.nutoHeader}>
        <img
          src="/images/logo.svg"
          alt="로고"
          width={203}
          height={44}
          style={{ marginTop: "5px", cursor: "pointer" }}
          onClick={() => handleClick("/nuto-garden")}
        />
        <span>
          <span
            onClick={() => handleClick("/show-booth")}
            className={style.goBooth}
          >
            부스별 텃밭 보러가기
          </span>
        </span>
      </header>
      <img
        src="/images/QR.jpg"
        alt="QR"
        style={{ width: "100vw", height: "100vh", scrollBehavior: "smooth" }}
      />
      <QRCodeCanvas value="https://nuto-frontend.vercel.app/home" />
    </div>
  );
}

export default QRPage;
