import svgPaths from "../../imports/uploadIconPaths";

interface UploadCloudIconProps {
  isHovering?: boolean;
  className?: string;
  size?: number;
}

export function UploadCloudIcon({ 
  isHovering = false, 
  className = "",
  size = 120
}: UploadCloudIconProps) {
  return (
    <div 
      className={`relative shrink-0 transition-transform duration-300 ${isHovering ? 'scale-110' : ''} ${className}`}
      data-name="Upload cloud"
    >
      <svg 
        className="block size-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox="0 0 204 204"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="cloudGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C0C0C0" />
            <stop offset="100%" stopColor="#8A8A8A" />
          </linearGradient>
        </defs>
        <g id="Upload cloud">
          <path 
            d={svgPaths.p32f3f780} 
            id="Icon" 
            stroke="url(#cloudGradient)" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="12.7356" 
          />
        </g>
      </svg>
    </div>
  );
}
