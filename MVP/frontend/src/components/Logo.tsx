export default function Logo() {
  return (
    <div className="w-12 h-12 bg-gradient-to-br from-[#1a0f1f] via-[#3d2645] to-[#7e4a8a] rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-30"></div>
      
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        {/* Musical staff lines (simplified) */}
        <line x1="4" y1="12" x2="28" y2="12" stroke="white" strokeWidth="0.5" opacity="0.4"/>
        <line x1="4" y1="16" x2="28" y2="16" stroke="white" strokeWidth="0.5" opacity="0.4"/>
        <line x1="4" y1="20" x2="28" y2="20" stroke="white" strokeWidth="0.5" opacity="0.4"/>
        
        {/* Treble clef inspired mark (stylized) */}
        <path 
          d="M 8 20 Q 8 14, 11 12 Q 13 11, 14 13 Q 15 15, 13 17 Q 11 18, 10 16"
          stroke="white" 
          strokeWidth="1.5" 
          fill="none" 
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        
        {/* Hammer/Anvil shape representing "Forge" */}
        <g transform="translate(18, 8)">
          {/* Hammer head */}
          <rect x="0" y="6" width="8" height="3" fill="white" rx="0.5" opacity="0.95"/>
          {/* Hammer handle */}
          <path 
            d="M 4 9 L 3 16 L 5 16 L 4 9 Z" 
            fill="white" 
            opacity="0.85"
          />
          {/* Strike spark effect */}
          <circle cx="4" cy="10" r="0.8" fill="white" opacity="0.6"/>
          <circle cx="6" cy="11" r="0.6" fill="white" opacity="0.5"/>
          <circle cx="2" cy="11" r="0.6" fill="white" opacity="0.5"/>
        </g>
        
        {/* Musical notes being "forged" */}
        <circle cx="12" cy="16" r="1.2" fill="white" opacity="0.8"/>
        <line x1="12" y1="16" x2="12" y2="11" stroke="white" strokeWidth="1" opacity="0.8"/>
        
        {/* Harmonic resonance circles */}
        <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="0.3" opacity="0.2" fill="none"/>
        <circle cx="16" cy="16" r="9" stroke="white" strokeWidth="0.3" opacity="0.15" fill="none"/>
      </svg>
    </div>
  );
}
