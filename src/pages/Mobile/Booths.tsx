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
