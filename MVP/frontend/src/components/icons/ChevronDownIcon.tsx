interface ChevronDownIconProps {
  isOpen?: boolean;
  className?: string;
  size?: number;
}

export function ChevronDownIcon({ 
  isOpen = false, 
  className = "",
  size = 32 
}: ChevronDownIconProps) {
  return (
    <div 
      className={`relative shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${className}`}
      data-name="Chevron down"
    >
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 32 32"
        width={size}
        height={size}
      >
        <g id="Chevron down">
          <path 
            d="M8 12L16 20L24 12" 
            id="Icon" 
            stroke="var(--stroke-0, #1E1E1E)" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3.2" 
          />
        </g>
      </svg>
    </div>
  );
}
