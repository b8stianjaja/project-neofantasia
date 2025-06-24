import React, { createContext, useState, useContext, useRef, useCallback } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children, musicSrc }) => {
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef(new Audio(musicSrc));
  audioRef.current.loop = true;

  const play = useCallback(() => {
    if (isReady) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [isReady]);

  const pause = useCallback(() => {
    audioRef.current.pause();
  }, []);

  const unlockAudio = () => {
    if (!isReady) {
      setIsReady(true);
    }
  };

  const value = {
    unlock: unlockAudio,
    play,
    pause
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};