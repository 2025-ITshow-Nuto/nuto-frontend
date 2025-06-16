import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "../../styles/BoothInfo.module.css";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
});

function BoothInfo() {
  const boothId = useParams().boothId;
  const [booths, setBooths] = useState([]);
  const booth = booths.find((booth) => booth.booth_id === boothId);
  const navigate = useNavigate();
  const currentScrollY = useRef(window.scrollY);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > currentScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      currentScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  const fetchBooths = async () => {
    const entries = await client.getEntries({
      content_type: process.env.REACT_APP_CONTENTFUL_CONTENT_TYPE,
    });
    return entries.items.map((item) => item.fields);
  };

  useEffect(() => {
    fetchBooths()
      .then((data) => {
        const formattedBooths = data.map((booth: any) => {
          return {
            booth_id: booth.boothId,
            members: booth.members,
            s3_path: booth.s3Path,
            img: booth.img?.fields?.file.url || "",
            logo: booth.logo?.fields?.file.url || "",
            type: booth.type,
            designer: booth.designer,
            developer: booth.developer,
            comment: booth.comment.content[0].content[0].value,
            name: booth.name,
            mainColor: booth.mainColor,
          };
        });
        setBooths(formattedBooths);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/nuto-garden"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

  const getTextColor = (bgColor: string) => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance < 120 ? "white" : "black";
  };

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
          {booth.developer?.length > 0 && (
            <p>
              <span className="dept" style={{ fontWeight: "bold" }}>
                개발자
              </span>{" "}
              {booth.developer.join(", ")}
            </p>
          )}
          <p>
            <span className="dept" style={{ fontWeight: "bold" }}>
              디자이너
            </span>{" "}
            {booth.designer.join(", ")}
          </p>
        </div>
        <p className={style.comment} style={{ whiteSpace: "pre-line" }}>
          {booth.comment.replaceAll("<br/>", "\n")}
        </p>

        <button
          className={`${style.nuto} ${!visible ? style.nutoHide : ""}`}
          onClick={() => navigate(`/booth-account/${boothId}`)}
          style={{
            color: `${getTextColor(booth.mainColor)}`,
            backgroundColor: `${booth.mainColor}`,
          }}
        >
          부스 구경하기
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default BoothInfo;
