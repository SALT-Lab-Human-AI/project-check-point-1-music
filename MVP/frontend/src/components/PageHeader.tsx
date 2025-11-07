import { Edit2 } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showProjectName?: boolean;
  projectName?: string;
  isEditing?: boolean;
  onProjectNameChange?: (name: string) => void;
  onEditToggle?: () => void;
}

export default function PageHeader({
  title,
  subtitle,
  showProjectName = false,
  projectName,
  isEditing = false,
  onProjectNameChange,
  onEditToggle,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2.5 md:gap-3 w-full mb-4 md:mb-5">
      {/* Main Title */}
      <div className="flex items-center gap-4">
        <h1 className="font-['Figtree:Bold',_sans-serif] font-bold text-[26px] md:text-[30px] lg:text-[34px] text-[#201315] leading-tight">
          {title}
        </h1>
      </div>

      {/* Subtitle/Description */}
      {subtitle && (
        <p className="font-['Figtree:Regular',_sans-serif] text-[14px] md:text-[15px] lg:text-[16px] text-[#201315]/70 max-w-[800px]">
          {subtitle}
        </p>
      )}

      {/* Project Name (if applicable) */}
      {showProjectName && projectName && (
        <div className="flex items-center gap-3 pt-2 border-t border-[#e5ddd5]/50">
          <span className="text-[13px] md:text-[14px] text-[#201315]/50 font-['Figtree:Regular',_sans-serif]">
            Project:
          </span>
          {isEditing ? (
            <input
              type="text"
              value={projectName}
              onChange={(e) => onProjectNameChange?.(e.target.value)}
              onBlur={onEditToggle}
              onKeyDown={(e) => e.key === 'Enter' && onEditToggle?.()}
              autoFocus
              placeholder="Enter project name"
              aria-label="Project name"
              className="font-['Figtree:SemiBold',_sans-serif] font-semibold text-[15px] md:text-[16px] text-[#201315] bg-transparent border-b-2 border-[#201315] outline-none flex-1 max-w-[300px]"
            />
          ) : (
            <span className="font-['Figtree:SemiBold',_sans-serif] font-semibold text-[15px] md:text-[16px] text-[#201315]">
              {projectName}
            </span>
          )}
          {onEditToggle && !isEditing && (
            <button
              onClick={onEditToggle}
              className="text-[#201315]/50 hover:text-[#201315] transition-colors p-1"
              aria-label="Edit project name"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
