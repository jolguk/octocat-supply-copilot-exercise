import { useState, useEffect, useCallback } from 'react';
import './FartAnimation.css';

interface FartSoundProps {
  playSound: boolean;
  onSoundPlayed?: () => void;
  targetElementId?: string; // Optional ID of element to apply animation to
  soundVariation?: 'normal' | 'wet' | 'loud' | 'squeaky' | 'random'; // Different fart sound types
}

/**
 * A component that plays a fart sound when triggered and optionally adds a shake animation
 * 
 * @param {Object} props Component properties
 * @param {boolean} props.playSound Trigger to play the sound
 * @param {Function} props.onSoundPlayed Callback after sound is played
 * @param {string} props.targetElementId Optional ID of element to apply animation to
 * @param {string} props.soundVariation Type of fart sound to play (normal, wet, loud, squeaky, or random)
 * @returns {null} This component doesn't render anything visible
 */
const FartSound = ({ 
  playSound, 
  onSoundPlayed, 
  targetElementId,
  soundVariation = 'random' 
}: FartSoundProps) => {
  // Currently we only have one sound file, but this structure allows for multiple variations in the future
  const [audio] = useState(new Audio('/sounds/fart.mp3'));
  
  const playFartSound = useCallback(() => {
    if (playSound) {      // Play sound
      audio.currentTime = 0;
      
      // Add a random volume for more variety (between 0.7 and 1.0)
      audio.volume = 0.7 + (Math.random() * 0.3);
      
      // Add a random playback rate for pitch variation based on sound type
      switch(soundVariation) {
        case 'normal':
          audio.playbackRate = 1.0;
          break;
        case 'wet':
          audio.playbackRate = 0.8;
          break;
        case 'loud':
          audio.playbackRate = 1.2;
          audio.volume = 1.0; // Always full volume for loud farts
          break;
        case 'squeaky':
          audio.playbackRate = 1.5;
          break;
        case 'random':
        default:
          // Random playback rate between 0.7 and 1.5 for varied fart sounds
          audio.playbackRate = 0.7 + (Math.random() * 0.8);
          break;
      }
      
      try {
        // In test environments, play() might not return a Promise
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing fart sound:", error);
          });
        }
      } catch (error) {
        console.error("Error playing fart sound:", error);
      }
      
      // Apply animation if target element ID is provided
      if (targetElementId) {
        const targetElement = document.getElementById(targetElementId);
        if (targetElement) {
          targetElement.classList.add('fart-animation');
          
          // Animation duration based on sound type
          const animationDuration = soundVariation === 'wet' || soundVariation === 'loud' 
            ? 800 
            : 500;
            
          setTimeout(() => {
            targetElement.classList.remove('fart-animation');
          }, animationDuration);
        }
      }
      
      // Call callback if provided
      if (onSoundPlayed) {
        onSoundPlayed();
      }
    }
  }, [audio, playSound, onSoundPlayed, targetElementId, soundVariation]);
  
  useEffect(() => {
    playFartSound();
  }, [playSound, playFartSound]);
  
  return null; // This component doesn't render anything
};

export default FartSound;
