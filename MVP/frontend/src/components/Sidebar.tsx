import { useState, useRef, useEffect } from 'react';
import { Home, FolderOpen, User, GripVertical } from 'lucide-react';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

interface SidebarProps {
  onHomeClick?: () => void;
  onProjectsClick?: () => void;
  onProfileClick?: () => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isExpanded: boolean;
  onClick?: () => void;
  isHorizontal?: boolean;
}

function SidebarItem({ icon, label, isExpanded, onClick, isHorizontal = false }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center ${isHorizontal ? 'gap-1 px-3 py-2' : 'gap-2 px-4 py-3'} cursor-pointer hover:bg-[rgba(74,52,40,0.5)] transition-colors duration-200 rounded-lg group`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className={`shrink-0 w-6 h-6 flex items-center justify-center text-white transition-transform duration-300 ${
        isExpanded ? '-translate-y-1' : 'translate-y-0'
      }`}>
        {icon}
      </div>
      <span
        className={`text-white font-['Figtree:SemiBold',_sans-serif] text-[14px] whitespace-nowrap transition-all duration-300 text-center ${
          isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function Sidebar({ onHomeClick, onProjectsClick, onProfileClick }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<Position>('top-left');
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isHorizontal = position === 'top-center' || position === 'bottom-center';

  const handleHomeClick = () => {
    onHomeClick?.();
  };

  const handleProjectsClick = () => {
    onProjectsClick?.();
  };

  const handleProfileClick = () => {
    onProfileClick?.();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!sidebarRef.current) return;
    const rect = sidebarRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setDragPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsDragging(false);
      
      // Calculate nearest position using zone-based logic
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const x = e.clientX;
      const y = e.clientY;
      
      // Define zones
      const horizontalThird = windowWidth / 3;
      const isLeft = x < horizontalThird;
      const isRight = x > windowWidth - horizontalThird;
      const isHorizontalCenter = !isLeft && !isRight;
      
      const isTop = y < windowHeight / 2;
      
      // Determine nearest position based on zones
      let nearestPosition: Position;
      
      if (isHorizontalCenter) {
        // In horizontal center - prefer top/bottom center
        nearestPosition = isTop ? 'top-center' : 'bottom-center';
      } else {
        // Near left or right edge - prefer corners
        if (isLeft) {
          nearestPosition = isTop ? 'top-left' : 'bottom-left';
        } else {
          nearestPosition = isTop ? 'top-right' : 'bottom-right';
        }
      }
      
      setPosition(nearestPosition);
      setDragPosition({ x: 0, y: 0 }); // Reset drag position
      
      // Collapse the sidebar after drag completes
      setTimeout(() => setIsExpanded(false), 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Determine positioning classes based on current position
  const getPositionClasses = () => {
    if (isDragging) {
      return 'fixed';
    }
    
    switch (position) {
      case 'top-left':
        return 'fixed left-0 top-0';
      case 'top-right':
        return 'fixed right-0 top-0';
      case 'bottom-left':
        return 'fixed left-0 bottom-0';
      case 'bottom-right':
        return 'fixed right-0 bottom-0';
      case 'top-center':
        return 'fixed left-1/2 -translate-x-1/2 top-0';
      case 'bottom-center':
        return 'fixed left-1/2 -translate-x-1/2 bottom-0';
      default:
        return 'fixed left-0 top-0';
    }
  };

  const getDragStyle = () => {
    if (isDragging) {
      return {
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`,
        transition: 'none',
      };
    }
    return {};
  };

  const getSizeClasses = () => {
    if (isHorizontal) {
      return isExpanded ? 'w-auto h-[120px]' : 'w-auto h-[70px]';
    }
    return isExpanded ? 'w-[100px] h-full' : 'w-[80px] h-full';
  };

  return (
    <div
      ref={sidebarRef}
      className={`${getPositionClasses()} ${getSizeClasses()} bg-gradient-to-br from-[#e76d57] via-[#e87d67] to-[#e98d77] z-50 transition-all duration-300 ease-in-out ${
        isDragging ? 'cursor-grabbing shadow-2xl' : 'cursor-auto'
      }`}
      style={getDragStyle()}
      onMouseEnter={() => !isDragging && setIsExpanded(true)}
      onMouseLeave={(e) => {
        // Don't collapse if we're dragging or if mouse is still over the sidebar
        if (!isDragging && !e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsExpanded(false);
        }
      }}
    >
      <div className={`flex ${isHorizontal ? 'flex-row' : 'flex-col'} h-full ${isHorizontal ? 'px-8 py-4' : 'py-8'} items-center`}>
        {/* Drag handle */}
        <div 
          className={`${isHorizontal ? 'mr-6' : 'mb-6'} flex items-center justify-center cursor-grab active:cursor-grabbing min-w-[40px] min-h-[40px]`}
          onMouseDown={handleMouseDown}
        >
          <div className="text-white/60 hover:text-white/90 transition-colors duration-200">
            <GripVertical size={24} className={isHorizontal ? 'rotate-90' : ''} />
          </div>
        </div>

        {/* Navigation items */}
        <nav className={`flex ${isHorizontal ? 'flex-row gap-3 items-center' : 'flex-col gap-2 px-3'} ${isHorizontal ? '' : 'w-full'}`}>
          <SidebarItem
            icon={<Home size={24} />}
            label="Home"
            isExpanded={isExpanded}
            onClick={handleHomeClick}
            isHorizontal={isHorizontal}
          />
          <SidebarItem
            icon={<FolderOpen size={24} />}
            label="Projects"
            isExpanded={isExpanded}
            onClick={handleProjectsClick}
            isHorizontal={isHorizontal}
          />
        </nav>

        {/* Spacer to push profile to bottom with same distance as drag handle from top */}
        <div className={`${isHorizontal ? 'flex-1' : 'flex-1'}`} />

        {/* Profile at end with matching spacing, moved down by 2% */}
        <div className={`${isHorizontal ? 'ml-3 flex items-center' : 'px-3 w-full mb-6'}`}>
          <SidebarItem
            icon={<User size={24} />}
            label="Profile"
            isExpanded={isExpanded}
            onClick={handleProfileClick}
            isHorizontal={isHorizontal}
          />
        </div>
      </div>
    </div>
  );
}
