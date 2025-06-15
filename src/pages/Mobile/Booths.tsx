import React, { useState, useEffect } from "react";
import style from "../../styles/Booths.module.css";
import Board from "../../components/Board";
import Footer from "../../components/Footer";
import axios from "axios";
import { boothsData } from "../../assets/json/booths";
import { Helmet } from "react-helmet";

interface Booth {
  booth_id: string;
  members: string[];
  s3_path: string;
  img: string;
  logo: string;
}

function Booths() {
  const [booths, setBooths] = useState<Booth[]>(boothsData);
  const [boothsType, setBoothsType] = useState<"total" | "design">("total");

  const setBoothType = (type: string) => {
    if (type === "design") {
      const designBooths = boothsData.filter(
        (booth) => booth.developer.length === 0
      );
      setBooths(designBooths);
      setBoothsType("design");
    } else {
      setBooths(boothsData);
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
