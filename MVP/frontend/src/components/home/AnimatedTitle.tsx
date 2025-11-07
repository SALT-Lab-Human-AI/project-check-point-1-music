import { useEffect, useState } from 'react';
import svgPaths from "../../imports/uploadIconPaths";

export function AnimatedTitle() {
  const [displayText, setDisplayText] = useState('');
  const [showLightning, setShowLightning] = useState(false);
  const fullText = 'Create harmonies in a ';

  useEffect(() => {
    let currentIndex = 0;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          // Show lightning after typing is done
          setTimeout(() => {
            setShowLightning(true);
          }, 100);
        }
      }, 90); // ~90ms per character for 2 second total

      return () => clearInterval(interval);
    }, 500); // 0.5s initial delay

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className="absolute content-stretch flex gap-[12px] sm:gap-[16px] md:gap-[20px] h-[36px] sm:h-[48px] md:h-[56px] lg:h-[60px] items-center left-1/2 top-[30px] sm:top-[35px] md:top-[40px] -translate-x-1/2 px-4">
      <p 
        className="font-['Figtree:Bold',_sans-serif] font-bold leading-[normal] text-[#201315] text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-center"
      >
        {displayText}
      </p>
      {showLightning && (
        <div 
          className="h-[36px] sm:h-[48px] md:h-[56px] lg:h-[60px] relative shrink-0 w-[26px] sm:w-[32px] md:w-[38px] lg:w-[44px] animate-lightning" 
          data-name="lightning_component"
        >
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72 97">
            <path d={svgPaths.peefa680} fill="url(#paint0_linear_1_28)" id="lightning_component" />
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_28" x1="35.7734" x2="35.7734" y1="0" y2="96.9175">
                <stop stopColor="#E76D57" />
                <stop offset="1" stopColor="#464646" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
}
