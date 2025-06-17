import React, { useState, useEffect } from "react";
import Board from "../../components/Board";
import style from "../../styles/BoothPage.module.css";
import { useNavigate } from "react-router-dom";
import { useIdleRedirect } from "../../hooks/useIdleTimer";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
});

function BoothPage() {
  const [booths, setBooths] = useState([]);
  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };

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
          };
        });
        setBooths(formattedBooths);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useIdleRedirect(60000, "/intro"); // 1분 동안 움직임이 없을 시 intro로 이동

  return (
    <div className={style.boothPageContainer}>
      <header className={style.nutoHeader}>
        <img
          src="/images/logo.svg"
          alt="로고"
          width={203}
          height={44}
          style={{ marginTop: "5px", cursor: "pointer" }}
          onClick={() => handleClick("/intro")}
          loading="lazy"
        />
        <span>
          <span
            onClick={() => handleClick("/nuto-garden")}
            className={style.goBooth}
          >
            응원 토마토 보러가기
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
        {booths.map((booth, index) => {
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
