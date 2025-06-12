import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "../../styles/Intro.module.css";
import introVideoSrc from '../../assets/video/intro.mp4';

const IntroPage = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  // 화면 크기 체크 (PC 이상만 영상 재생)
  useEffect(() => {
    const isWideScreen = window.innerWidth >= 1024;
    setIsDesktop(isWideScreen);

    if (!isWideScreen) {
      navigate('/home'); // 모바일/태블릿은 즉시 이동
    }
  }, [navigate]);

  // 영상 종료 후 이동
  useEffect(() => {
    if (!isDesktop || !videoRef.current) return;

    const handleEnded = () => {
      navigate('/show-booth');
    };

    const video = videoRef.current;
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [isDesktop, navigate]);

  if (isDesktop === null) return null; // 초기 로딩 중

  return (
    <video
      ref={videoRef}
      src={introVideoSrc}
      autoPlay
      muted
      playsInline
      className={style.fullscreenVideo}
    />
  );
};

export default IntroPage;
