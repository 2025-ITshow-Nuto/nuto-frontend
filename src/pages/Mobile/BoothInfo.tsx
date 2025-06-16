import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/BoothInfo.module.css";
import Footer from "../../components/Footer";
import { boothsData } from "../../assets/json/booths";
import { Helmet } from "react-helmet";

function BoothInfo() {
  const boothId = useParams().boothId;
  const [booth] = boothsData.filter((booth) => booth.booth_id === boothId);
  const navigate = useNavigate();

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/nuto-garden"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  if (!booth)
    return <div>해당 부스의 정보가 아직 업데이트되지 않았습니다.</div>;

  return (
    <div className={style.body}>
      <Helmet>
        <title>booth explain</title>
      </Helmet>
      <div className={style.header}>
        <img
          src="/images/backButton.png"
          className={style.back}
          onClick={() => navigate("/booths")}
          alt="뒤로 가기"
        />
        <img src="/images/logo.svg" alt="로고이미지" className={style.logo} />
      </div>
      <img src={booth.img} alt="부스이미지" className={style.boothImg} />
      <div className={style.boothInfo}>
        <div>
          <h1 className={style.name} style={{ color: booth.mainColor }}>
            {booth.name}
          </h1>
          <p className={style.type}>{booth.type.join(" | ")}</p>
        </div>
        <div className={style.member}>
          <p>
            <span className="dept" style={{ fontWeight: "bold" }}>
              개발자
            </span>{" "}
            {booth.developer.join(", ")}
          </p>
          <p>
            <span className="dept" style={{ fontWeight: "bold" }}>
              디자이너
            </span>{" "}
            {booth.designer.join(", ")}
          </p>
        </div>
        <p className={style.comment}>{booth.comment}</p>
        <button
          className={style.nuto}
          onClick={() => navigate(`/booth-account/${boothId}`)}
        >
          부스 구경하기
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default BoothInfo;
