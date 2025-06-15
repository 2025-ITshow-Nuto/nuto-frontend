import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Booth from "../../components/Booth";
import style from "../../styles/Search.module.css";
import { usePostInfo } from "../../context/PostInfoContext";
import { boothsData } from "../../assets/json/booths";
import { Helmet } from "react-helmet";

interface BoothType {
  booth_id: string;
  members: string[];
  s3_path: string;
  img: string;
  logo: string;
}

function Search() {
  const [booths, setBooths] = useState<BoothType[]>([]);
  const [inputText, setInputText] = useState("");
  const { location, setLocation } = usePostInfo();

  const fetchBooths = async (name: string) => {
    try {
      const booth = name.trim() || "";
      if (booth === "") {
        setBooths(boothsData);
      } else {
        const findBooths = boothsData.filter(
          (boothInfo) =>
            boothInfo.booth_id.includes(booth) ||
            boothInfo.members.includes(booth)
        );
        console.log(findBooths);
        setBooths(findBooths);
      }
    } catch (err) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchBooths(inputText);
  }, [inputText]);

  return (
    <div className={style.body}>
      <Helmet>
        <title>post search</title>
      </Helmet>
      <p className={style.text}>어느부스에 토마토를 남길까요?</p>
      <div className={style.searchContainer}>
        <input
          type="text"
          className={style.searchInput}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchBooths(inputText);
            }
          }}
        />
        <img
          src="/images/searchIcon.png"
          alt="Search Icon"
          className={style.searchIcon}
          onClick={() => fetchBooths(inputText)}
        />
        <img
          alt="Search Underbar"
          src="/images/searchUnderbar.png"
          className={style.searchUnderbar}
        />
      </div>
      <div className={style.boothContainer}>
        {booths.length > 0 ? (
          booths.map((booth) => (
            <div
              style={{ borderRadius: "10px", overflow: "hidden" }}
              onClick={() => setLocation(booth.booth_id)}
            >
              <Booth
                key={booth.booth_id}
                booth={booth}
                navi={{ go: true, path: "post" }}
                boardStyle={{ logoWidth: 112, bottom: 8, fontSize: 8 }}
              />
            </div>
          ))
        ) : (
          <p className={style.noBooth}>부스가 없습니다.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Search;
