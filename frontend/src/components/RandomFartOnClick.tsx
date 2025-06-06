import React, { useState, useEffect } from 'react';
import FartSound from './effects/FartSound';

/**
 * A component that randomly plays a fart sound when users click around the page
 * 
 * @returns {JSX.Element} A component that doesn't render anything visible
 */
const RandomFartOnClick: React.FC = () => {
  const [playFartSound, setPlayFartSound] = useState(false);
  const [targetElement, setTargetElement] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    // Function to handle random fart sounds
    const handleRandomFart = (e: MouseEvent) => {
      // Only play the sound 5% of the time to avoid annoying the user
      if (Math.random() < 0.05) {
        // Get the clicked element
        const element = e.target as HTMLElement;
        
        // Set a unique ID on the element if it doesn't have one
        if (element && !element.id) {
          element.id = `random-fart-${Date.now()}`;
        }
        
        // Set the target element for animation
        if (element && element.id) {
          setTargetElement(element.id);
          setPlayFartSound(prev => !prev);
        }
      }
    };
    
    // Add click event listener to the document
    document.addEventListener('click', handleRandomFart);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleRandomFart);
    };
  }, []);
    return (
    <FartSound 
      playSound={playFartSound} 
      targetElementId={targetElement}
      onSoundPlayed={() => console.log('Random fart sound played!')} 
      soundVariation="random"
    />
  );
};

export default RandomFartOnClick;
