import { useState, useEffect } from "react";
import style from "../../styles/NutoGarden.module.css";
import axios from "axios";
import Nuto from "../../components/Nuto";
import DotIndicator from "../../components/DotIndicator";
import NutoPost from "./NutoPost";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

export interface FullPost {
  _id: string;
  name: string;
  polariodImage: string;
  nutoImage: string;
  location: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function NutoGarden() {
  const [nutos, setNutos] = useState<FullPost[][]>([]);
  const [index, setIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const booth = searchParams.get("booth");

  const navigate = useNavigate();
  const handleClick = (route: string) => {
    navigate(route);
  };

  useEffect(() => {
    const isWideScreen = window.innerWidth >= 1024;

    if (!isWideScreen) {
      navigate("/home"); // 모바일/태블릿은 즉시 이동
    }
  }, [navigate]);

  const chunkPost = (posts: FullPost[]) => {
    const result: FullPost[][] = [];
    for (let i = 0; i < posts.length; i += 6) {
      result.push(posts.slice(i, i + 6));
    }
    return result;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = booth
          ? `https://nuto.mirim-it-show.site/post/nuto-garden/${booth}`
          : `https://nuto.mirim-it-show.site/post`;

        const response = await axios.get(url);
        setNutos(chunkPost(response.data?.data || response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [navigate]);

  return (
    <div className={style.gardenContainer}>
      <header className={style.gardenHeader}>
        <img
          src="/images/logo.svg"
          alt="로고"
          width={203}
          height={44}
          style={{ marginTop: "5px", cursor: "pointer" }}
          onClick={() => handleClick("/nuto-garden")}
        />
        <span>
          <span
            className={style.goTomato}
            onClick={() => handleClick("/qr-page")}
          >
            응원 토마토 남기기
          </span>
          <span
            className={style.goBooth}
            onClick={() => handleClick("/show-booth")}
          >
            부스별 텃밭 보러가기
          </span>
        </span>
      </header>
      <div className={style.nutoContainer}>
        <img
          src="/images/nutoGardenBackImg.png"
          alt="토마토 줄기"
          className={style.backImg}
        />
        {nutos.length > 0 ? (
          nutos[index].map((nuto, idx) => (
            <Nuto nuto={nuto} idx={idx} key={nuto._id} />
          ))
        ) : (
          <></>
        )}
      </div>
      {index > 0 ? (
        <img
          src="/images/preGardenBtn.png"
          alt="이전 텃밭"
          className={style.preBtn}
          onClick={() => setIndex((pre) => pre - 1)}
        />
      ) : (
        <></>
      )}
      {index < nutos.length - 1 ? (
        <img
          src="/images/nextGardenBtn.png"
          alt="다음 텃밭"
          className={style.nextBtn}
          onClick={() => setIndex((pre) => pre + 1)}
        />
      ) : (
        <></>
      )}
      <DotIndicator len={nutos.length} index={index} setIndex={setIndex} />
      {/* {selectPost ? (
        <NutoPost
          postId={selectPost}
          selectPost={selectPost}
          setSelectPost={setSelectPost}
        />
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default NutoGarden;
