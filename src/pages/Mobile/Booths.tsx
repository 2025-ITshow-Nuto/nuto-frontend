import React, { useState, useEffect } from "react";
import style from "../../styles/Booths.module.css";
import Board from "../../components/Board";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
});

function Booths() {
  const [booths, setBooths] = useState([]);
  const [originalBooths, setOriginalBooths] = useState([]);
  const [boothsType, setBoothsType] = useState<
    "all" | "total" | "design" | "club" | "global"
  >("all");
  const navigate = useNavigate();

  const fetchBooths = async () => {
    const entries = await client.getEntries({
      content_type: process.env.REACT_APP_CONTENTFUL_CONTENT_TYPE,
    });
    return entries.items.map((item) => item.fields);
  };

  useEffect(() => {
    fetchBooths()
      .then((data) => {
        console.log(data);
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
            boothType: booth.boothType,
          };
        });
        setBooths(formattedBooths);
        setOriginalBooths(formattedBooths);
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

  const setBoothType = (type: string) => {
    if (type === "design") {
      const designBooths = originalBooths.filter(
        (booth) => booth.boothType === "design"
      );
      setBooths(designBooths);
      console.log(designBooths);
      setBoothsType("design");
    } else if (type === "club") {
      const clubBooths = originalBooths.filter(
        (booth) => booth.boothType === "club"
      );
      setBooths(clubBooths);
      setBoothsType("club");
    } else if (type === "global") {
      const globalBooths = originalBooths.filter(
        (booth) => booth.boothType === "global"
      );
      setBooths(globalBooths);
      setBoothsType("global");
    } else if (type === "total") {
      const totalBooths = originalBooths.filter(
        (booth) => booth.boothType === "total"
      );
      setBooths(totalBooths);
      setBoothsType("total");
    } else if (type === "all") {
      setBooths(originalBooths);
      setBoothsType("all");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/images/boothsBackground.png)",
        overflow: "hidden",
      }}
      className={style.body}
    >
      <Helmet>
        <title>booth explain</title>
      </Helmet>

      <p className={style.text}>다양한 부스들이 있는 텃밭을 구경해보세요!</p>
      <div className={style.boothTypeSelectContainer}>
        <button
          className={
            boothsType === "all"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("all")}
        >
          전체
        </button>
        <button
          className={
            boothsType === "total"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("total")}
        >
          협업
        </button>
        <button
          className={
            boothsType === "design"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("design")}
        >
          디자인
        </button>
        <button
          className={
            boothsType === "club"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("club")}
        >
          동아리
        </button>
        <button
          className={
            boothsType === "global"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("global")}
        >
          글로벌
        </button>
      </div>
      <div className={style.boardContainer}>
        {booths.length > 0 ? (
          booths.map((booth, index) => (
            <Board
              key={index}
              booth={booth}
              logoWidth={60}
              bottom={10}
              fontSize={8}
              width={155}
              path={`/booths/${booth.s3_path}`}
            />
          ))
        ) : (
          <p>등록된 부스가 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Booths;
