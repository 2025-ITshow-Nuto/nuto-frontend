import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Booth from "../../components/Booth";
import style from "../../styles/Search.module.css";
import { usePostInfo } from "../../context/PostInfoContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESSTOKEN,
});

function Search() {
  const [booths, setBooths] = useState([]);
  const [inputText, setInputText] = useState("");
  const { location, setLocation } = usePostInfo();
  const [originalBooths, setOriginalBooths] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const isWideScreen = window.innerWidth <= 500;

    if (!isWideScreen) {
      navigate("/nuto-garden"); // 태블릿/데스크톱은 즉시 이동
    }
  }, [navigate]);

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
        setOriginalBooths(formattedBooths);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const setSearchedBooth = async (name: string) => {
    try {
      if (name.trim() === "") {
        setBooths(originalBooths);
      } else {
        const findBooths = booths.filter((boothInfo) => {
          return (
            boothInfo.booth_id.includes(name) ||
            boothInfo.members.includes(name)
          );
        });
        setBooths(findBooths);
      }
    } catch (err) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
    console.log(name, booths);
  };

  useEffect(() => {
    setSearchedBooth(inputText);
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
              setSearchedBooth(inputText);
            }
          }}
        />
        <img
          src="/images/searchIcon.png"
          alt="Search Icon"
          className={style.searchIcon}
          onClick={() => setSearchedBooth(inputText)}
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
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: `${booth.mainColor}`,
              }}
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
