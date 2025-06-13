import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import def from "../../styles/Default.module.css";
import style from "../../styles/BoothAccount.module.css";
import { useParams } from "react-router-dom";
import { boothsData } from "../../assets/json/booths";
import BoothCategory from "../../components/BoothCategory";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { usePostInfo } from "../../context/PostInfoContext";
import { Helmet } from "react-helmet";

function BoothAccount() {
  const boothId = useParams().boothId;
  const selectedBooth = boothsData.filter(
    (booth) => booth.booth_id === boothId
  )[0];
  const [type, setType] = useState<"nuto" | "polariod">("polariod");
  const navigate = useNavigate();
  const [totalPost, setTotalPost] = useState(0);
  const { setLocation } = usePostInfo();

  const handleClick = () => {
    setLocation(boothId);
    navigate("/post");
  };

  useEffect(() => {
    const getTotalPost = async () => {
      try {
        const response = await axios.get(
          `https://nuto.mirim-it-show.site/post/nuto-garden/${boothId}`
        );
        setTotalPost(response.data.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    getTotalPost();
  }, []);

  return (
    <div className={def.Body}>
      <Helmet>
        <title>booth explain</title>
      </Helmet>
      <Header prevSrc={`/booths/${boothId}`} nextSrc="-1" />
      <section className={style.Body}>
        <div className={style.AccountInfoContainer}>
          <img src={selectedBooth.img} alt={selectedBooth.img} />
          <div>
            <p>{totalPost}</p>
            <p>게시글</p>
          </div>
        </div>
        <div className={style.TitleContainer}>
          <p className={style.boothName}>{selectedBooth.name}</p>
          <p className={style.boothExplain}>{selectedBooth.type}</p>
        </div>
        <div className={style.ButtonContainer}>
          <button
            className={style.ExplainButton}
            onClick={() => navigate(`/booths/${boothId}`)}
          >
            소개
          </button>
          <button onClick={handleClick} className={style.NutoButton}>
            누토 남기기
          </button>
        </div>
        <div className={style.PostsContainer}>
          <button
            onClick={() => setType("polariod")}
            style={{
              fontWeight: type === "polariod" ? "bold" : "",
              borderBottom: type === "polariod" ? "1px solid #424242" : "",
            }}
          >
            폴라로이드
          </button>
          <button
            onClick={() => setType("nuto")}
            style={{
              fontWeight: type === "nuto" ? "bold" : "",
              borderBottom: type === "nuto" ? "1px solid #424242" : "",
            }}
          >
            토마토
          </button>
        </div>
        <BoothCategory type={type} boothId={boothId} />
      </section>

      <Footer />
    </div>
  );
}

export default BoothAccount;
