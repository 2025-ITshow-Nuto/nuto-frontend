import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import style from "../../styles/Home.module.css";
import Post from "../../components/Post";
import axios from "axios";
import { Helmet } from "react-helmet";
import ModalPortal from "./ModalPortal";
import Comment from "../../components/Comment";
import { AnimatePresence, motion } from 'framer-motion';

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

function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectPost, setSelectPost] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://nuto.mirim-it-show.site/post`);
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className={style.body}>
      <AnimatePresence>
        {selectPost && (
          <ModalPortal>
            <motion.div
              className={style.backgroundModal}
              initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
              animate={{ backgroundColor: 'rgba(54, 54, 54, 0.7)' }}
              exit={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectPost(null)}
            >
            </motion.div>
            <motion.div
              className={style.commentModal}
              initial={{bottom: '-100%'}}
              animate={{bottom: '0%'}}
              exit={{bottom: '-100%'}}
              transition={{duration: 0.5}}
              onClick={(e) => e.stopPropagation()}
            >
              <Comment postId={selectPost} setSelectPost={setSelectPost} />
            </motion.div>
          </ModalPortal>
        )}
      </AnimatePresence>

      <Helmet>
        <title>nuto home</title>
      </Helmet>

      <img alt="logo" src="/images/logo.svg" className={style.logo} />
      {posts.length === 0 ? (
        <p>게시물이 없습니다.</p>
      ) : (
        posts &&
        posts.map((post) => (
          <Post
            post={post}
            refetchPost={fetchPost}
            setSelectPost={setSelectPost}
          />
        ))
      )}
      <Footer />
    </div>
  );
}

export default Home;
