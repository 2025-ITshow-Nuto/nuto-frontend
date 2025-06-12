import style from "../styles/Post.module.css";
import { MdDelete } from "react-icons/md";
import bcrypt from "bcryptjs";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

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
};

interface PostProps {
  post: PostType;
  refetchPost: () => void;
  setSelectPost: (postId: string) => void;
}

function Post({ post, refetchPost, setSelectPost }: PostProps) {
  // console.log(process.env.REACT_APP_SALT_VALUE);
  const hashing = async (password: string) => {
    const salt = process.env.REACT_APP_SALT_VALUE;
    return await bcrypt.hash(password, salt);
  };

  const handleClick = async (postId: string) => {
    const password = prompt("포스트 비밀번호를 입력해주세요");
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

  return (
    <div className={style.post} key={post._id}>
      <div className={style.profile}>
        <div className={style.profileContainer}>
          <div
            className={style.profileImgContainer}
            style={{
              backgroundImage: `url(/images/booths/${post.location}.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <p className={style.profileName}>{post.location}</p>
        </div>
        <div onClick={() => handleClick(post._id)} className={style.deleteIcon}>
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
    </div>
  );
}

export default Post;
