import React, { createContext, useState, useContext, useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [currentBeat, setCurrentBeat] = useState(null);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [playbackInfo, setPlaybackInfo] = useState({ seek: 0, duration: 0 });
  const beatSoundRef = useRef(null);
  const themeSoundRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const unlock = useCallback(() => {
    if (themeSoundRef.current?.state() === 'unloaded') {
      themeSoundRef.current.load();
    }
  }, []);

  useEffect(() => {
    themeSoundRef.current = new Howl({
      src: ['/sfx/title-theme.wav'],
      loop: true,
      volume: 0.2,
      html5: true,
    });
    return () => {
      themeSoundRef.current?.unload();
      beatSoundRef.current?.unload();
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgressTracking = useCallback(() => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      const sound = beatSoundRef.current;
      if (sound?.playing()) {
        const seek = sound.seek();
        const duration = sound.duration();
        setPlaybackInfo({ seek, duration });
      }
    }, 100);
  }, [stopProgressTracking]);

  const playBeat = useCallback((track) => {
    themeSoundRef.current?.pause();

    // Case 1: The user is resuming the *same* track.
    if (currentBeat?.id === track.id && beatSoundRef.current) {
      beatSoundRef.current.play();
      setIsBeatPlaying(true);
      startProgressTracking();
      return; // Exit early
    }

    // Case 2: The user is playing a *new* track. We must safely clean up the old one.
    if (beatSoundRef.current) {
      // FIX: Remove all event listeners before unloading to prevent race conditions.
      beatSoundRef.current.off('play').off('pause').off('end');
      beatSoundRef.current.unload();
    }

    // Now, create and play the new sound.
    const newSound = new Howl({
      src: [track.audioSrc],
      html5: true,
      onplay: () => {
        setIsBeatPlaying(true);
        startProgressTracking();
      },
      onpause: () => {
        setIsBeatPlaying(false);
        stopProgressTracking();
      },
      onend: () => {
        setIsBeatPlaying(false);
        setCurrentBeat(null);
        stopProgressTracking();
        setPlaybackInfo({ seek: 0, duration: 0 });
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

  const seekTo = useCallback((percentage) => {
    const sound = beatSoundRef.current;
    if (sound?.duration()) {
      sound.seek(sound.duration() * percentage);
    }
  }, []);

  const value = {
    unlock,
    playBeat,
    pauseBeat,
    seekTo,
    currentTrack: currentBeat,
    isPlaying: isBeatPlaying,
    playbackInfo,
  };

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};