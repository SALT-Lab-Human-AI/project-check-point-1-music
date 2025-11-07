import { ArrowLeft } from 'lucide-react';
import svgPaths from "../imports/editIconPaths";

function Music() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Music">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 101 101">
        <g id="Music">
          <path
            d={svgPaths.p3abf3380}
            id="Icon"
            stroke="url(#paint0_linear_header)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="8.36804"
          />
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_header"
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

interface AppHeaderProps {
  currentStep?: number;
  totalSteps?: number;
  onBack?: () => void;
  showProgress?: boolean;
}

export default function AppHeader({
  currentStep = 0,
  totalSteps = 3,
  onBack,
  showProgress = true,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e5ddd5] px-4 md:px-8 py-3">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Left: Back button or spacer */}
        <div className="flex items-center w-[100px]">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-[#e5ddd5]/30 rounded-full transition-all active:scale-95"
              aria-label="Go back"
              title="Go back"
            >
              <ArrowLeft size={20} className="text-[#201315]" />
            </button>
          )}
        </div>

        {/* Center: Logo/Brand */}
        <div className="flex items-center gap-3 justify-center">
          <Music />
          <span className="font-['Figtree:Bold',_sans-serif] font-bold text-[18px] md:text-[20px] text-[#201315]">
            Harmony
          </span>
        </div>

        {/* Right: Progress Indicator */}
        <div className="flex items-center justify-end w-[100px]">
          {showProgress && (
            <>
              <div className="hidden md:flex items-center gap-2">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 rounded-full transition-all duration-300 ${
                      i < currentStep
                        ? 'bg-gradient-to-r from-[#201315] to-[#e76d57]'
                        : i === currentStep
                        ? 'bg-gradient-to-r from-[#e76d57] to-[#e76d57]/50'
                        : 'bg-[#e5ddd5]'
                    }`}
                  />
                ))}
              </div>
              <div className="md:hidden text-[12px] font-['Figtree:SemiBold',_sans-serif] text-[#201315]/70">
                {currentStep + 1}/{totalSteps}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
