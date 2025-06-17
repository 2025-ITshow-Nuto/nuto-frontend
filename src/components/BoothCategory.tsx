import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/BoothCategory.module.css";
import ModalPortal from "../pages/Mobile/ModalPortal";

type dataType = {
  createdAt: string;
  location: string;
  name: string;
  nutoImage: string;
  password: string;
  polariodImage: string;
  s;
  updatedAt: string;
  _id: string;
};

function BoothCategory(props: { type: string; boothId: string }) {
  const [datas, setDatas] = useState<dataType[] | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectPost] = useState<dataType | null>(null);
  const [modalData, setModalData] = useState<string | null>(null);
  useEffect(() => {
    const getPolariod = async () => {
      try {
        const response = await axios.get(
          `https://nuto.mirim-it-show.site/post/nuto-garden/${props.boothId}`
        );
        setDatas(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getPolariod();
  }, [props.boothId]);

  const handleClick = (post: dataType) => {
    setOpenModal(true);
    setModalData(
      props.type === "polariod" ? post.polariodImage : post.nutoImage
    );
    setSelectPost(post);
  };

  return (
    <div className={style.dataContainer}>
      {datas &&
        datas.map((data) => {
          const imageSrc =
            props.type === "polariod" ? data.polariodImage : data.nutoImage;
          return (
            <img
              src={imageSrc}
              onClick={() => handleClick(data)}
              alt={data.createdAt}
            />
          );
        })}

      {openModal && (
        <ModalPortal>
          <div className={style.modalBackground}>
            <div
              className={style.modalContainer}
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                From.{" "}
                {datas.filter((data) => data._id === selectedPost._id)[0].name}
              </p>
              <img
                src={modalData}
                onClick={() => setOpenModal(false)}
                alt={modalData}
                className={style.modalImage}
              />
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}

export default BoothCategory;
