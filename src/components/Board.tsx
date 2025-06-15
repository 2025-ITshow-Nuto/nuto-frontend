import React from "react";
import style from "../styles/Board.module.css";
import Booth from "./Booth";
import { useNavigate } from "react-router-dom";

interface BoothProps {
  booth: {
    booth_id: string;
    members: string[];
    s3_path: string;
    img: string;
    logo: string;
  };
  width?: number;
  fontSize?: number;
  logoWidth?: number;
  bottom?: number;
  path?: string;
}

const Board: React.FC<BoothProps> = ({
  booth,
  width,
  fontSize,
  logoWidth,
  bottom,
  path,
}) => {
  const navigate = useNavigate();
  // todo 함수이름 바꾸기
  const goB = (booth_id: string) => {
    // 부소소개 페이지 이동, 부스 이름 넘기기
    navigate(path, {
      state: {
        booth_id: booth_id,
      },
    });
  };
  return (
    <div
      className={style.body}
      style={{ width: width }}
      onClick={() => goB(booth.booth_id)}
    >
      <img
        src="/images/board.svg"
        alt="보드"
        className={style.boardImg}
        style={{ width: width }}
        loading="lazy"
      />
      <div className={style.BoothBox}>
        <Booth
          booth={booth}
          navi={{ go: true, path: booth.booth_id }}
          boardStyle={{
            logoWidth: logoWidth,
            bottom: bottom,
            fontSize: fontSize,
          }}
        />
      </div>
    </div>
  );
};

export default Board;
