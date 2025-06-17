import style from "../styles/Post.module.css";
import { MdDelete } from "react-icons/md";
import bcrypt from "bcryptjs";
import axios from "axios";
import InputModal from "./InputModal";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

interface Comment {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

type PostType = {
  _id: string;
  name: string;
  polariodImage: string;
  nutoImage: string;
  location: string;
  password: string;
  comments: Comment[];
  logoImage: string;
};

interface PostProps {
  post: PostType;
  refetchPost: () => void;
  setSelectPost: (postId: string) => void;
}

function Post({ post, refetchPost, setSelectPost }: PostProps) {
  // console.log(process.env.REACT_APP_SALT_VALUE);
  const [showInput, setShowInput] = useState(false);
  const [postId, setPostId] = useState("");
  const [password, setPassword] = useState("");
  const hashing = async (password: string) => {
    const salt = process.env.REACT_APP_SALT_VALUE;
    return await bcrypt.hash(password, salt);
  };

  console.log(post);

  const handleClick = async () => {
    const hashedPassword = await hashing(password);

    // console.log(postId, hashedPassword);

    try {
      await axios.delete("https://nuto.mirim-it-show.site/post", {
        data: {
          id: postId,
          pw: hashedPassword,
        },
      });

      refetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (password.trim() === "") return;
    handleClick();
  }, [password]);

  return (
    <div className={style.post} key={post._id}>
      <div className={style.profile}>
        <div className={style.profileContainer}>
          <img
            src={post.logoImage}
            alt={post._id}
            className={style.profileImgContainer}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <p className={style.profileName}>{post.location}</p>
        </div>
        <div
          onClick={() => {
            setPostId(post._id);
            setShowInput(true);
          }}
          className={style.deleteIcon}
        >
          <MdDelete />
        </div>
      </div>
      <div
        className={style.postContainer}
        style={{ width: "100%", boxSizing: "content-box" }}
      >
        <Swiper pagination={{ clickable: true }} modules={[Pagination]}>
          <SwiperSlide>
            <img
              alt="polariodImage"
              src={post.polariodImage}
              className={style.postImg}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img alt="nutoImg" src={post.nutoImage} className={style.postImg} />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={style.postInfo}>
        <img
          src="/images/commentImg.png"
          className={style.commentImg}
          onClick={() => setSelectPost(post._id)}
          alt="Comment Icon"
        />
        <div className={style.infoContainer}>
          <span className={style.writerText}>작성자 |</span>
          <span className={style.writer}>{post.name}</span>
        </div>
      </div>
      {showInput && (
        <InputModal
          q="포스트 비밀번호를 입력해주세요"
          setState={setPassword}
          setShowInput={setShowInput}
        />
      )}
    </div>
  );
}

export default Post;
