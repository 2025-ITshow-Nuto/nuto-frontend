import React, { useState } from "react";
import style from "../styles/NutoExplain.module.css";
import Footer from "./Footer";

function NutoPage() {
  const [booth] = useState({
    name: "누토",
    type: ["웹사이트", "앱"],
    img: "/images/booths/nutoIntroduce.svg",
    developer: ["오지은", "이소리", "장하영"],
    designer: ["조혜원", "박새봄"],
    comment:
      "이번 프로젝트는 졸업 전시를 더욱 특별하게 기록하고, 학생들의 배움과 성장을 관객들과 소통할 수 있도록 기획되었습니다. 각 부스에는 학생들의 열정과 창의성이 담겨 있으며, 이를 응원하고 기억할 수 있도록 디지털 응원 메시지 시스템을 도입했습니다. <br/><br/>🔗 QR 코드로 간편하게 접속하여, 각 부스를 둘러보고 응원의 한마디를 남길 수 있습니다. 🍅 '토마토 텃밭'이라는 컨셉을 활용해, 한 마디 한 마디가 씨앗이 되어 성장하는 의미를 담았습니다. <br/><br/>관람객들은 학생들에게 따뜻한 격려를 전하고, 남겨진 메시지는 마치 정성껏 가꾼 텃밭처럼 쌓여갑니다.",
    members: ["오지은", "이소리", "장하영", "조혜원", "박새봄"],
    booth_id: "nuto",
    s3_path: "nuto",
    logo: "/images/boothName.svg",
    mainColor: "#C5362E",
  });

  if (!booth)
    return <div>해당 부스의 정보가 아직 업데이트되지 않았습니다.</div>;

  return (
    <div className={style.body}>
      <img alt="boothImg" src={booth.img} className={style.boothImg} />
      <div className={style.boothInfo}>
        <h1 className={style.name}>{booth.name}</h1>
        <p className={style.type}>{booth.type.join(" | ")}</p>
        <div className={style.member}>
          <p>
            <span className={style.dept} style={{ fontWeight: "bold" }}>
              개발자{" "}
            </span>
            {booth.developer.join(", ")}
          </p>
          <p>
            <span className={style.dept} style={{ fontWeight: "bold" }}>
              디자이너{" "}
            </span>
            {booth.designer.join(", ")}
          </p>
        </div>
        <p className={style.comment}>{booth.comment}</p>
      </div>
      <Footer />
    </div>
  );
}

export default NutoPage;
