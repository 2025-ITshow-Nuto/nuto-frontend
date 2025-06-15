import React from "react";
import Board from "../../components/Board";
import style from "../../styles/BoothPage.module.css";
import { boothsData } from "../../assets/json/booths";
import { useNavigate } from "react-router-dom";
import { useIdleRedirect } from "../../hooks/useIdleTimer";

function BoothPage() {
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };

  useIdleRedirect(60000, "/intro"); // 1분 동안 움직임이 없을 시 intro로 이동

  return (
    <div className={style.boothPageContainer}>
      <header className={style.nutoHeader}>
        <img
          src="/images/logo.svg"
          alt="로고"
          width={203}
          height={44}
          style={{ marginTop: "5px" }}
          onClick={() => handleClick("/intro")}
          loading="lazy"
        />
        <span>
          <span
            onClick={() => handleClick("/nuto-garden")}
            className={style.goBooth}
          >
            응원 토마토 남기기
          </span>
        </span>
      </header>
      <img
        src="/images/Garden.jpg"
        alt="QR"
        style={{ width: "100vw", height: "100vh", scrollBehavior: "smooth" }}
        loading="lazy"
      />
      <div className={style.boothContainer}>
        {boothsData.map((booth, index) => {
          return (
            <div
              onClick={() =>
                handleClick(`/nuto-garden?booth=${booth.booth_id}`)
              }
            >
              <Board
                booth={booth}
                width={300}
                fontSize={16}
                bottom={13}
                logoWidth={112}
                path={`/nuto-garden?booth=${booth.booth_id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BoothPage;
