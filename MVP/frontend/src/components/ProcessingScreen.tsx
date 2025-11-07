import { useEffect, useState } from 'react';
import svgPaths from "../imports/checkIconPaths";
import AppHeader from './AppHeader';
import PageHeader from './PageHeader';
import Breadcrumbs from './Breadcrumbs';

interface ProcessingStep {
  label: string;
  completed: boolean;
  active: boolean;
  error?: boolean;
}

// Musical Staff with Animated Notes
function MusicalStaff({ isActive, currentStep }: { isActive: boolean; currentStep: number }) {
  const [notes, setNotes] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    delay: number;
    duration: number;
    curve: number;
  }>>([]);

  // Generate random notes with varied properties
  const generateNotes = (count: number = 6) => {
    const newNotes = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i + Math.random() * 1000,
      x: Math.random() * 100,
      y: Math.random() * 4,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 4, // 4-8 seconds for varied speeds
      curve: -30 + Math.random() * 60, // -30 to 30 for vertical curve variation
    }));
    return newNotes;
  };

  // Regular note generation
  useEffect(() => {
    if (!isActive) return;

    setNotes(generateNotes());
    const interval = setInterval(() => {
      setNotes(generateNotes());
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  // Burst effect when step changes
  useEffect(() => {
    if (!isActive || currentStep < 0) return;
    
    // Generate burst of 4 notes when step completes
    const burstNotes = generateNotes(4);
    setNotes(prev => [...prev, ...burstNotes]);
    
    // Clean up burst notes after animation
    const cleanup = setTimeout(() => {
      setNotes(prev => prev.filter(note => 
        !burstNotes.find(burst => burst.id === note.id)
      ));
    }, 8000);
    
    return () => clearTimeout(cleanup);
  }, [currentStep, isActive]);

  const getNoteSymbol = () => {
    const symbols = ['♪', '♫', '♬', '♩'];
    return symbols[currentStep % symbols.length];
  };

  // Calculate progress percentage for visual indicator
  const progressPercentage = ((currentStep + 1) / 4) * 100;

  return (
    <div className="relative w-full max-w-[400px] h-[180px] sm:h-[220px] flex items-center justify-center bg-gradient-to-br from-white/40 to-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border-2 border-black/10 shadow-2xl overflow-hidden">
      {/* Progress Indicator Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#e76d57]/10 to-transparent transition-all duration-1000 ease-out pointer-events-none"
        style={{ width: `${progressPercentage}%` }}
      />
      
      {/* Staff Lines */}
      <div className="absolute inset-0 flex flex-col justify-center px-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="relative w-full h-[2px] bg-black/80 my-2 shadow-sm overflow-hidden"
          >
            {/* Animated progress fill on staff lines */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#e76d57] to-[#e2a59a] transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        ))}
      </div>

      {/* Treble Clef */}
      <div className="absolute left-6 text-5xl font-serif text-black/90 z-10 animate-float">
        𝄞
      </div>

      {/* Animated Notes */}
      {isActive && notes.map((note) => {
        const hue = (note.y * 60) + 180;
        return (
          <div
            key={note.id}
            className="absolute text-3xl font-bold animate-note-float-curved [text-shadow:_0_2px_4px_rgba(0,0,0,0.2)]"
            style={{
              left: `${note.x}%`,
              top: `${20 + note.y * 15}%`,
              animationDelay: `${note.delay}s`,
              animationDuration: `${note.duration}s`,
              color: `hsl(${hue}, 70%, 40%)`,
              '--curve-offset': `${note.curve}px`,
            } as React.CSSProperties & { '--curve-offset': string }}
          >
            {getNoteSymbol()}
          </div>
        );
      })}

      {/* Musical waves in background - removed due to Safari incompatibility */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="none">
          <path
            d="M0,200 Q125,150 250,200 T500,200"
            fill="none"
            stroke="black"
            strokeWidth="3"
          />
          <path
            d="M0,220 Q125,170 250,220 T500,220"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
}

function CheckCircle({ completed, active, error }: { completed: boolean; active: boolean; error?: boolean }) {
  const strokeColor = error ? "#DC2626" : (completed || active ? "#1E1E1E" : "#DADADA");
  const pathData = completed ? svgPaths.peb9f000 : svgPaths.pf7f9280;
  const fillColor = completed ? "#22C55E" : "transparent";
  
  return (
    <div 
      className={`relative shrink-0 size-[50.208px] transition-all duration-300 ${
        completed ? 'animate-checkmark-bounce' : active ? 'scale-110 animate-pulse-ring' : 'scale-100'
      } ${error ? 'shake' : ''}`}
      data-name="Check circle"
      role="status"
      aria-label={active ? "Processing" : completed ? "Completed" : error ? "Error" : "Pending"}
    >
      {/* Pulse ring for active state */}
      {active && (
        <div className="absolute inset-0 rounded-full bg-[#e76d57]/20 animate-ping" />
      )}
      
      {/* Glow effect for completed */}
      {completed && (
        <div className="absolute inset-0 rounded-full bg-green-500/30 blur-md animate-pulse-glow" />
      )}
      
      <svg className="block size-full relative z-10" fill={fillColor} preserveAspectRatio="none" viewBox="0 0 51 51">
        <g id="Check circle">
          {error ? (
            <>
              <circle cx="25.5" cy="25.5" r="23.5" stroke={strokeColor} strokeWidth="4" fill="none" />
              <path d="M17 17 L34 34 M34 17 L17 34" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <path 
              d={pathData} 
              id="Icon" 
              stroke={strokeColor}
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="4.18402"
            />
          )}
        </g>
      </svg>
    </div>
  );
}

function ProcessingStepComponent({ 
  step, 
  onRetry 
}: { 
  step: ProcessingStep; 
  onRetry?: () => void;
}) {
  // Progressive styling based on step state
  const getStepStyles = () => {
    if (step.error) {
      return {
        textColor: "text-red-600",
        opacity: "opacity-100",
        decoration: "",
      };
    }
    if (step.completed) {
      return {
        textColor: "text-black",
        opacity: "opacity-60",
        decoration: "",
      };
    }
    if (step.active) {
      return {
        textColor: "text-[#e76d57]",
        opacity: "opacity-100",
        decoration: "animate-pulse-subtle",
      };
    }
    // Future steps (not yet active)
    return {
      textColor: "text-[#dadada]",
      opacity: "opacity-50",
      decoration: "",
    };
  };

  const { textColor, opacity, decoration } = getStepStyles();
  
  return (
    <div 
      className={`content-stretch flex items-center gap-3 sm:gap-4 relative shrink-0 transition-all duration-500 ${
        step.active ? 'pl-2 border-l-4 border-[#e76d57]' : ''
      }`}
      aria-current={step.active ? "step" : undefined}
    >
      <p 
        className={`font-['Figtree:Bold',_sans-serif] font-bold leading-[normal] relative shrink-0 ${textColor} ${opacity} ${decoration} transition-all duration-500 ${
          step.active ? 'text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] scale-105' : 'text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] scale-100'
        }`}
      >
        {step.label}
      </p>
      
      <CheckCircle completed={step.completed} active={step.active} error={step.error} />
      
      {step.error && onRetry && (
        <button
          onClick={onRetry}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-['Figtree',_sans-serif] hover:bg-red-700 transition-colors"
          aria-label="Retry this step"
        >
          Retry
        </button>
      )}
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  const roundedProgress = Math.round(progress);
  
  return (
    <div 
      className="absolute top-0 left-0 w-full h-2 bg-[#dadada]/30 z-50"
      role="progressbar"
      aria-label="Processing progress"
      aria-valuenow={String(roundedProgress)}
      aria-valuemin="0"
      aria-valuemax="100"
      data-progress={roundedProgress}
    >
      <div 
        className="h-full bg-gradient-to-r from-black via-gray-700 to-black transition-all duration-500 ease-out relative overflow-hidden"
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}

function SuccessOverlay() {
  const confettiColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
  
  return (
    <div 
      className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
      role="alert"
      aria-live="polite"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl animate-scaleIn text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-['Figtree:Bold',_sans-serif] font-bold text-black">
          Complete!
        </h2>
      </div>
      
      {/* Confetti effect */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full animate-confetti ${confettiColors[i % 5]}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Group({ isProcessing, currentStep }: { isProcessing: boolean; currentStep: number }) {
  return (
    <div className="relative w-full max-w-[400px] h-[180px] sm:h-[220px] flex items-center justify-center">
      <MusicalStaff isActive={isProcessing} currentStep={currentStep} />
    </div>
  );
}

export default function ProcessingScreen({ 
  onComplete, 
  fileName = "audio-file.mp3" 
}: { 
  onComplete: () => void;
  fileName?: string;
}) {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { label: "Validating format", completed: false, active: true },
    { label: "Extracting pitch", completed: false, active: false },
    { label: "Identifying key", completed: false, active: false },
    { label: "Setting tempo", completed: false, active: false },
  ]);
  const [progress, setProgress] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const isProcessing = steps.some(step => step.active || !step.completed);
  const currentStepIndex = steps.findIndex(step => step.active);

  useEffect(() => {
    const stepDuration = 1500;
    
    const timers = steps.map((_, index) => 
      setTimeout(() => {
        setSteps(prev => prev.map((step, i) => {
          if (i < index) return { ...step, completed: true, active: false };
          if (i === index) return { ...step, completed: false, active: true };
          return step;
        }));
        
        setProgress(((index + 1) / steps.length) * 100);
        
        // Announce step change for screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Step ${index + 1} of ${steps.length}: ${steps[index].label}`;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
        
        if (index === steps.length - 1) {
          setTimeout(() => {
            setSteps(prev => prev.map((step, i) => 
              i === steps.length - 1 ? { ...step, completed: true, active: false } : step
            ));
            setProgress(100);
            
            setTimeout(() => {
              setShowSuccess(true);
              setTimeout(() => {
                onComplete();
              }, 2000);
            }, 500);
          }, stepDuration);
        }
      }, index * stepDuration)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [onComplete, steps.length]);

  const handleRetry = (index: number) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, error: false, active: true } : step
    ));
  };

  return (
    <div 
      className="bg-[#f8f3eb] relative w-full h-screen overflow-hidden flex flex-col"
      role="main"
      aria-label="Processing audio file"
    >
      <AppHeader
        currentStep={1}
        totalSteps={3}
        showProgress={true}
      />
      
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-8">
        <Breadcrumbs
          steps={["Select Instruments", "Processing", "Results"]}
          currentStep={1}
        />
        <PageHeader
          title="Creating your harmony..."
          subtitle=""
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <style>{`
        @keyframes note-float {
          0% {
            transform: translateX(-50px) translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(550px) translateY(-20px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes note-float-curved {
          0% {
            transform: translateX(-50px) translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          25% {
            transform: translateX(100px) translateY(var(--curve-offset, -20px)) rotate(90deg);
          }
          50% {
            transform: translateX(250px) translateY(calc(var(--curve-offset, -20px) * -0.5)) rotate(180deg);
          }
          75% {
            transform: translateX(400px) translateY(var(--curve-offset, -20px)) rotate(270deg);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(550px) translateY(-10px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes wave {
          0% {
            d: path("M0,200 Q125,150 250,200 T500,200");
          }
          50% {
            d: path("M0,200 Q125,250 250,200 T500,200");
          }
          100% {
            d: path("M0,200 Q125,150 250,200 T500,200");
          }
        }
        
        @keyframes wave-delayed {
          0% {
            d: path("M0,220 Q125,170 250,220 T500,220");
          }
          50% {
            d: path("M0,220 Q125,270 250,220 T500,220");
          }
          100% {
            d: path("M0,220 Q125,170 250,220 T500,220");
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        
        @keyframes checkmark-bounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          75% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-note-float { animation: note-float 6s ease-in-out infinite; }
        .animate-note-float-curved { animation: note-float-curved 6s ease-in-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-checkmark-bounce { animation: checkmark-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-pulse-ring { animation: pulse-ring 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-wave { animation: wave 4s ease-in-out infinite; }
        .animate-wave-delayed { animation: wave-delayed 4s ease-in-out infinite 0.5s; }
        .animate-pulse-subtle { animation: pulse-subtle 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-confetti { animation: confetti forwards; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .shake { animation: shake 0.5s; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `}</style>
      
      <ProgressBar progress={progress} />
      
      {showSuccess && <SuccessOverlay />}
      
      {/* Centered content wrapper */}
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto gap-6 sm:gap-8">
        
        {/* Main content area - centered */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center justify-center w-full">
          <Group isProcessing={isProcessing} currentStep={currentStepIndex} />
          
          <div className="flex flex-col items-center lg:items-start relative w-full lg:w-auto">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-xl">
              {steps.map((step, index) => (
                <ProcessingStepComponent 
                  key={index} 
                  step={step}
                  onRetry={() => handleRetry(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
