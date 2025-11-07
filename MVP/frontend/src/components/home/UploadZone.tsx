import svgPaths from "../../imports/uploadIconPaths";
import { UploadContent } from './UploadContent';

interface UploadZoneProps {
  isHovering: boolean;
  onClick: () => void;
}

function InnerCircle({ isHovering }: { isHovering: boolean }) {
  return (
    <div className={`box-border content-stretch flex items-center justify-center relative rounded-[216px] shrink-0 w-[216px] h-[216px] sm:w-[249px] sm:h-[249px] md:w-[281px] md:h-[281px] lg:size-[325px] transition-all duration-300 ${isHovering ? 'scale-105' : ''}`}>
      <div aria-hidden="true" className={`absolute border-[3px] border-solid inset-0 pointer-events-none rounded-[216px] transition-colors duration-300 animate-[ripple_4s_ease-in-out_infinite_0.5s] ${isHovering ? 'border-[rgba(229,221,213,0.6)]' : 'border-[rgba(229,221,213,0.4)]'}`} />
      <UploadContent isHovering={isHovering} />
    </div>
  );
}

function OuterCircle({ isHovering, onClick }: UploadZoneProps) {
  return (
    <div 
      className="absolute box-border content-stretch flex items-center justify-center left-[calc(50%+0.035px)] p-[30px] sm:p-[34px] md:p-[39px] lg:p-[44px] rounded-[238px] w-[238px] h-[238px] sm:w-[281px] sm:h-[281px] md:w-[325px] md:h-[325px] lg:w-[389px] lg:h-[389px] top-[calc(50%+80px)] sm:top-[calc(50%+100px)] md:top-[calc(50%+120px)] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
      onClick={onClick}
    >
      <div aria-hidden="true" className={`absolute border-[3px] border-solid inset-0 pointer-events-none rounded-[238px] transition-colors duration-300 animate-[ripple_4s_ease-in-out_infinite] ${isHovering ? 'border-[rgba(229,221,213,0.6)]' : 'border-[rgba(229,221,213,0.4)]'}`} />
      <InnerCircle isHovering={isHovering} />
    </div>
  );
}

export function UploadZone({ isHovering, onClick }: UploadZoneProps) {
  return (
    <div className="absolute contents left-[calc(50%+0.5px)] top-[calc(50%+80px)] sm:top-[calc(50%+100px)] md:top-[calc(50%+120px)] translate-x-[-50%] translate-y-[-50%]">
      <div className="absolute left-[calc(50%+0.5px)] w-[487px] h-[487px] sm:w-[541px] sm:h-[541px] md:w-[595px] md:h-[595px] lg:w-[649px] lg:h-[649px] top-[calc(50%+80px)] sm:top-[calc(50%+100px)] md:top-[calc(50%+120px)] translate-x-[-50%] translate-y-[-50%] animate-gradient-pulse">
        <div className="absolute inset-[-4.42%_-5.58%_-6.75%_-5.58%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1260 1260">
            <g filter="url(#filter0_din_1_33)" id="Ellipse 2">
              <path d={svgPaths.p2f948800} fill="url(#paint0_radial_1_33)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1259.82" id="filter0_din_1_33" width="1259.82" x="-9.53674e-07" y="-9.53674e-07">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feMorphology in="SourceAlpha" operator="erode" radius="2.63593" result="effect1_dropShadow_1_33" />
                <feOffset dy="13.1797" />
                <feGaussianBlur stdDeviation="32.9492" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.898039 0 0 0 0 0.866667 0 0 0 0 0.835294 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_33" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feMorphology in="SourceAlpha" operator="erode" radius="26.3593" result="effect2_innerShadow_1_33" />
                <feOffset dy="10.5437" />
                <feGaussianBlur stdDeviation="65.8983" />
                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.208346 0 0 0 0 0.208346 0 0 0 0 0.208346 0 0 0 0.1 0" />
                <feBlend in2="shape" mode="normal" result="effect2_innerShadow_1_33" />
                <feTurbulence baseFrequency="0.75874489545822144 0.75874489545822144" numOctaves="3" result="noise" seed="2852" stitchTiles="stitch" type="fractalNoise" />
                <feComponentTransfer in="noise" result="coloredNoise1">
                  <feFuncR intercept="-0.5" slope="2" type="linear" />
                  <feFuncG intercept="-0.5" slope="2" type="linear" />
                  <feFuncB intercept="-0.5" slope="2" type="linear" />
                  <feFuncA tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " type="discrete" />
                </feComponentTransfer>
                <feComposite in="coloredNoise1" in2="effect2_innerShadow_1_33" operator="in" result="noise1Clipped" />
                <feComponentTransfer in="noise1Clipped" result="color1">
                  <feFuncA tableValues="0 0.31" type="table" />
                </feComponentTransfer>
                <feMerge result="effect3_noise_1_33">
                  <feMergeNode in="effect2_innerShadow_1_33" />
                  <feMergeNode in="color1" />
                </feMerge>
                <feBlend in="effect3_noise_1_33" in2="effect1_dropShadow_1_33" mode="normal" result="effect3_noise_1_33" />
              </filter>
              <radialGradient cx="0" cy="0" gradientTransform="translate(629.912 101.596) rotate(90) scale(865.126 1066.99)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_33" r="1">
                <stop offset="0" stopColor="#E76D57">
                  <animate attributeName="stop-color" values="#E76D57;#FF6B4A;#FF8F7A;#E76D57" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="0.496691" stopColor="#E2A59A">
                  <animate attributeName="stop-color" values="#E2A59A;#FFC4B8;#FF9F8F;#FFD0C0;#E2A59A" dur="5s" repeatCount="indefinite" />
                </stop>
                <stop offset="1" stopColor="#DDDDDD">
                  <animate attributeName="stop-color" values="#DDDDDD;#F5F5F5;#C8C8C8;#E8E8E8;#DDDDDD" dur="4.5s" repeatCount="indefinite" />
                </stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <OuterCircle isHovering={isHovering} onClick={onClick} />
    </div>
  );
}
