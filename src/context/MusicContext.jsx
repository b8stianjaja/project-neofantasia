import React, { createContext, useState, useContext, useRef, useCallback, useEffect } from 'react';
import { Howl, Howler } from 'howler'; // Make sure Howler is imported
import beats from '../entities/beat/beats'; // Ensure this path is correct

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState(null); // No track active initially, consistent name
  const [isBeatPlaying, setIsBeatPlaying] = useState(false); // Internal state for playback status
  const [playbackInfo, setPlaybackInfo] = useState({ seek: 0, duration: 0 });

  const beatSoundRef = useRef(null); // Ref for the currently playing beat Howl instance
  const themeSoundRef = useRef(null); // Ref for the background theme music Howl instance
  const progressIntervalRef = useRef(null); // Ref for the progress tracking interval

  // Function to stop the progress tracking interval
  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Function to start the progress tracking interval
  const startProgressTracking = useCallback(() => {
    stopProgressTracking(); // Ensure only one interval is running
    progressIntervalRef.current = setInterval(() => {
      const sound = beatSoundRef.current;
      if (sound?.playing()) {
        setPlaybackInfo({ seek: sound.seek(), duration: sound.duration() });
      }
    }, 100); // Update every 100ms for smoother progress bar
  }, [stopProgressTracking]);

  // Centralized function to resume the AudioContext, crucial for browser policies
  const resumeAudioContext = useCallback(async () => {
    if (Howler.ctx && Howler.ctx.state !== 'running') {
      try {
        console.log(`AudioContext state before resume: ${Howler.ctx.state}. Attempting to resume...`);
        await Howler.ctx.resume();
        console.log(`AudioContext resumed successfully! New state: ${Howler.ctx.state}`);
      } catch (e) {
        console.error('Failed to resume AudioContext:', e);
        // This should ideally not happen after InteractionScreen unless context re-suspends aggressively
      }
    } else if (Howler.ctx) {
        console.log(`AudioContext is already ${Howler.ctx.state}. No resume needed.`);
    }
  }, []); // No dependencies needed as it operates directly on Howler.ctx

  // Function to select a track (doesn't automatically play it)
  const selectTrack = useCallback((track) => {
    if (activeTrack && activeTrack.id === track.id) {
        console.log(`Track "${track.title}" already selected.`);
        return;
    }
    console.log(`Selecting track: ${track.title}`);
    setActiveTrack(track);
    // If a different track was playing, stop it and reset its info
    if (beatSoundRef.current) {
        beatSoundRef.current.stop(); // Immediately stop the current sound
        setIsBeatPlaying(false);
        stopProgressTracking();
        setPlaybackInfo({ seek: 0, duration: 0 }); // Reset playback info for the newly selected track
    }
  }, [activeTrack, stopProgressTracking]);

  // Function to play a beat
  const playBeat = useCallback(async (trackToPlay) => {
    // Always attempt to resume AudioContext before playing. This handles re-suspension.
    await resumeAudioContext();

    const isPlayingSameTrack = activeTrack?.id === trackToPlay.id;

    // If the same track is already playing, do nothing
    if (isBeatPlaying && isPlayingSameTrack) { // Corrected: Using isBeatPlaying (internal state)
        console.log(`Track "${trackToPlay.title}" is already playing. No action.`);
        return;
    }

    // If we're changing to a different track
    if (!isPlayingSameTrack) {
        console.log(`Changing active track to: ${trackToPlay.title}`);
        setActiveTrack(trackToPlay);
        // Clean up the previous Howl instance if it exists
        if (beatSoundRef.current) {
            beatSoundRef.current.off('play').off('pause').off('end').off('playerror').off('loaderror');
            beatSoundRef.current.unload(); // Unload to free memory
            beatSoundRef.current = null;
        }
    }

    themeSoundRef.current?.pause(); // Pause the background theme music

    // If beatSoundRef.current exists and points to the correct track (already loaded or in process)
    if (beatSoundRef.current && beatSoundRef.current.src === trackToPlay.audioSrc) {
        if (!beatSoundRef.current.playing()) {
            console.log(`Resuming playback for: ${trackToPlay.title}`);
            beatSoundRef.current.play();
            setIsBeatPlaying(true);
        }
        return;
    }

    // If no sound is loaded, or it's a new track, create a new Howl instance
    console.log(`Loading and playing new sound for: ${trackToPlay.title}`);
    setIsBeatPlaying(true); // Optimistically set playing state

    const newSound = new Howl({
      src: [trackToPlay.audioSrc],
      html5: true, // Use HTML5 audio for better compatibility with autoplay policies
      onplay: () => {
        setIsBeatPlaying(true);
        startProgressTracking();
        setPlaybackInfo({ seek: newSound.seek(), duration: newSound.duration() }); // Set initial duration
        console.log(`Howl onplay: "${trackToPlay.title}" is now playing.`);
      },
      onpause: () => {
        setIsBeatPlaying(false);
        stopProgressTracking();
        console.log(`Howl onpause: "${trackToPlay.title}" has paused.`);
      },
      onend: () => {
        setIsBeatPlaying(false);
        stopProgressTracking();
        setPlaybackInfo({ seek: 0, duration: newSound.duration() }); // Reset seek to 0 on end
        console.log(`Howl onend: "${trackToPlay.title}" has ended.`);
        // Optionally, resume theme music here if desired:
        // themeSoundRef.current?.play();
      },
      onloaderror: (id, err) => {
        console.error('Howler Load Error for', trackToPlay.title, ':', err);
        setIsBeatPlaying(false);
      },
      onplayerror: (id, err) => {
        console.error('Howler Play Error for', trackToPlay.title, ':', err);
        setIsBeatPlaying(false);
        // Attempt to resume context again, as this error often means context is suspended
        resumeAudioContext();
      },
      onload: () => {
        // Once loaded, set duration if not already set by onplay
        if (newSound.duration() > 0) {
            setPlaybackInfo(prev => ({ ...prev, duration: newSound.duration() }));
        }
        console.log(`Howl onload: "${trackToPlay.title}" loaded. Duration: ${newSound.duration()}s`);
      }
    });

    beatSoundRef.current = newSound;
    beatSoundRef.current.src = trackToPlay.audioSrc; // Store the audio source for easy comparison
    newSound.play();

  }, [activeTrack, isBeatPlaying, startProgressTracking, stopProgressTracking, playbackInfo.duration, resumeAudioContext]);

  // Function to pause the currently playing beat
  const pauseBeat = useCallback(async () => { // Made async
    // Always attempt to resume AudioContext before pausing. This handles re-suspension.
    await resumeAudioContext();

    if (beatSoundRef.current?.playing()) {
      console.log(`Attempting to pause beat: ${activeTrack?.title}`);
      setIsBeatPlaying(false);
      beatSoundRef.current.pause();
    } else {
        console.log('Pause requested, but no beat is currently playing or sound ref is null. Ensuring state is false.');
        setIsBeatPlaying(false); // Ensure UI state is correct even if no sound was playing
    }
  }, [activeTrack, resumeAudioContext]);

  // Function to seek to a specific point in the active track
  const seekTo = useCallback((percentage) => {
    const sound = beatSoundRef.current;
    if (sound && sound.duration()) {
        const newSeek = sound.duration() * percentage;
        sound.seek(newSeek);
        setPlaybackInfo(prev => ({ ...prev, seek: newSeek })); // Immediately update seek state for responsiveness
    }
  }, []);

  // `unlock` function for initial user gesture (e.g., from a "click to enable sound" overlay)
  const unlock = useCallback(async () => { // Made async here too
    // Resume context first
    await resumeAudioContext();

    // Load theme sound if it's not loaded
    if (themeSoundRef.current?.state() === 'unloaded') {
      themeSoundRef.current.load();
    }

    // *** CRITICAL ADDITION: Play the theme sound only if not already playing and context is running ***
    if (Howler.ctx.state === 'running' && !themeSoundRef.current?.playing()) {
        console.log('Attempting to play theme music after unlock.');
        themeSoundRef.current?.play();
    }
  }, [resumeAudioContext]);

  // Effect to initialize theme music
  useEffect(() => {
    // Initialize the background theme music
    themeSoundRef.current = new Howl({
      src: ['/sfx/title-theme.wav'], // Make sure this path is correct
      loop: true,
      volume: 0.2,
      html5: true,
      preload: true, // Preload for faster start
      onplayerror: (id, err) => {
        console.warn('Theme music play error:', err, 'Attempting to resume context.');
        resumeAudioContext(); // Try to resume if theme music fails to play
      },
      onloaderror: (id, err) => {
        console.error('Theme music load error:', err);
      }
    });

    // Cleanup function: runs when the component unmounts
    return () => {
      themeSoundRef.current?.unload(); // Unload theme music
      beatSoundRef.current?.unload(); // Unload any active beat
      stopProgressTracking(); // Clear interval
    };
  }, [stopProgressTracking, resumeAudioContext]); // Dependencies for useEffect

  // The value provided by the MusicContext
  const value = {
    unlock, // For explicit user gesture if needed
    selectTrack, // To select a track without playing
    playBeat, // To play a specific beat
    pauseBeat, // To pause the current beat
    seekTo, // To change playback position
    activeTrack, // The currently active/selected track
    isPlaying: isBeatPlaying, // Whether the active track is currently playing
    playbackInfo, // Current seek position and total duration
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};