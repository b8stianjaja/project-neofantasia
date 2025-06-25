import React, { createContext, useState, useContext, useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

const themeMusicSrc = '/sfx/title-theme.wav'; 

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const themeSoundRef = useRef(null);
  const beatSoundRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  const [currentBeat, setCurrentBeat] = useState(null);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [playbackInfo, setPlaybackInfo] = useState({ seek: 0, duration: 0 });

  const startProgressTracking = useCallback(() => {
    clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      if (beatSoundRef.current) {
        setPlaybackInfo({ seek: beatSoundRef.current.seek() || 0, duration: beatSoundRef.current.duration() || 0 });
      }
    }, 100);
  }, []);
  
  const stopProgressTracking = useCallback(() => {
    clearInterval(progressIntervalRef.current);
  }, []);

  const playBeat = useCallback((track) => {
    // Always pause the theme when a beat action occurs
    themeSoundRef.current?.pause();

    // If it's the same track and it's just paused, resume it.
    if (currentBeat?.id === track.id && beatSoundRef.current) {
      beatSoundRef.current.play();
      return;
    }

    // Otherwise, play the new track.
    beatSoundRef.current?.unload();
    const newSound = new Howl({
      src: [track.audioSrc], html5: true,
      onplay: () => { setIsBeatPlaying(true); startProgressTracking(); },
      onpause: () => setIsBeatPlaying(false),
      onend: () => {
        setIsBeatPlaying(false);
        setCurrentBeat(null);
        stopProgressTracking();
        setPlaybackInfo({ seek: 0, duration: 0 });
        // When a beat ends, resume the theme
        themeSoundRef.current?.play();
      },
    });
    beatSoundRef.current = newSound;
    setCurrentBeat(track);
    newSound.play();
  }, [currentBeat, startProgressTracking, stopProgressTracking]);

  const pauseBeat = useCallback(() => {
    if (beatSoundRef.current?.playing()) {
      beatSoundRef.current.pause();
    }
  }, []);
  
  // THE FIX: This function now starts the theme music automatically
  const unlock = useCallback(() => {
    if (!themeSoundRef.current) {
      themeSoundRef.current = new Howl({
        src: [themeMusicSrc], loop: true, volume: 0.4, html5: true
      });
      // Play theme for the first time on first interaction
      themeSoundRef.current.play();
    }
  }, []);

  const seekTo = useCallback((percentage) => {
    if (beatSoundRef.current?.duration()) {
      beatSoundRef.current.seek(beatSoundRef.current.duration() * percentage);
    }
  }, []);

  useEffect(() => { return () => clearInterval(progressIntervalRef.current); }, []);

  const value = {
    unlock, // The only function needed by initial interaction
    playBeat, 
    pauseBeat,
    seekTo,
    currentTrack: currentBeat,
    isPlaying: isBeatPlaying,
    playbackInfo,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};