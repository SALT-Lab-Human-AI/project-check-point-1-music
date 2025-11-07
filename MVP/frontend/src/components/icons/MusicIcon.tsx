import svgPaths from "../../imports/musicIconPaths";

interface MusicIconProps {
  className?: string;
  size?: number;
}

export function MusicIcon({ className = "", size = 100.416 }: MusicIconProps) {
  return (
    <div 
      className={`relative shrink-0 ${className}`}
      data-name="Music"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 101 101"
        width={size}
        height={size}
      >
        <g id="Music">
          <path
            d={svgPaths.p3abf3380}
            id="Icon"
            stroke="url(#paint0_linear_music)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8.36804"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_music"
            x1="50.2082"
            x2="50.2082"
            y1="12.5521"
            y2="87.8644"
          >
            <stop stopColor="#E76D57" />
            <stop offset="1" stopColor="#813D31" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
