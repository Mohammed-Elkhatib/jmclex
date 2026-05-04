import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAudioStore } from '@/lib/useAudioStore';

export default function AudioSystem() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isMuted, hasUserInteracted, setUserInteracted, toggleMute, volume } = useAudioStore();

  // Handle user interaction to start audio
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setUserInteracted();
      }
    };

    // Listen for various user interactions
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [hasUserInteracted, setUserInteracted]);

  // Handle audio playback
  useEffect(() => {
    if (!audioRef.current) return;

    if (hasUserInteracted && !isMuted) {
      // Fade in audio
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });

      // Smooth fade in over 3 seconds
      let currentVolume = 0;
      const fadeInInterval = setInterval(() => {
        currentVolume += volume / 30; // 30 steps over ~3 seconds
        if (currentVolume >= volume) {
          currentVolume = volume;
          clearInterval(fadeInInterval);
        }
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      }, 100);

      return () => clearInterval(fadeInInterval);
    } else if (isMuted) {
      // Fade out audio
      let currentVolume = audioRef.current.volume;
      const fadeOutInterval = setInterval(() => {
        currentVolume -= 0.05;
        if (currentVolume <= 0) {
          currentVolume = 0;
          audioRef.current?.pause();
          clearInterval(fadeOutInterval);
        }
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      }, 100);

      return () => clearInterval(fadeOutInterval);
    }
  }, [hasUserInteracted, isMuted, volume]);

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="https://static.wixstatic.com/media/5e1235_ambient-piano-luxury.mp3"
        loop
        preload="auto"
      />

      {/* Sound Control Icon - Fixed Top Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={toggleMute}
        className="fixed top-24 right-8 z-40 p-3 rounded-full bg-background/80 backdrop-blur-md border border-accent-gold/30 text-optional-navy hover:bg-background hover:border-accent-gold/60 transition-all duration-300 group"
        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        <motion.div
          animate={{ scale: isMuted ? 1 : 1.1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-optional-navy group-hover:text-accent-gold transition-colors" />
          ) : (
            <Volume2 className="w-5 h-5 text-accent-gold group-hover:scale-110 transition-transform" />
          )}
        </motion.div>

        {/* Subtle glow effect when audio is playing */}
        {!isMuted && (
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-accent-gold/20 blur-md -z-10"
          />
        )}
      </motion.button>
    </>
  );
}
