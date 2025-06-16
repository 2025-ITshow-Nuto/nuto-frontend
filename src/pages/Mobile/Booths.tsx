import React, { useState, useEffect } from "react";
import style from "../../styles/Booths.module.css";
import Board from "../../components/Board";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { createClient } from "contentful";

function Booths() {
  const [booths, setBooths] = useState([]);
  const [boothsType, setBoothsType] = useState<"total" | "design">("total");
  const navigate = useNavigate();

  const client = createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
  });

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
            developer: booth.developer,
            designer: booth.designer,
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

  const setBoothType = (type: string) => {
    if (type === "design") {
      const designBooths = booths.filter(
        (booth) => booth.developer.length === 0
      );
      setBooths(designBooths);
      setBoothsType("design");
    } else {
      setBooths(booths);
      setBoothsType("total");
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
            boothsType === "total"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("total")}
        >
          전체
        </button>
        <button
          className={
            boothsType === "design"
              ? style.selectedBoothType
              : style.noneSelectedBoothType
          }
          onClick={() => setBoothType("design")}
        >
          디자인과
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
