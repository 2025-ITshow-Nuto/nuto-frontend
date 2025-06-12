// hooks/useIdleRedirect.ts
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useIdleRedirect = (timeout = 60000, redirectPath = '/intro') => {
  const navigate = useNavigate();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      navigate(redirectPath);
    }, timeout);
  };

  useEffect(() => {
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];

    activityEvents.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer(); // 초기 타이머 설정

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
};
