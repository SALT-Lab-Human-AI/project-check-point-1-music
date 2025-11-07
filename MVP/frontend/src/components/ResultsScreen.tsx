import { useState } from "react";
import svgPaths from "../imports/editIconPaths";
import { X, Save, Share2, Download, Music2, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "./ui/button";
import AppHeader from "./AppHeader";
import PageHeader from "./PageHeader";
import Breadcrumbs from "./Breadcrumbs";
import { EditIcon } from "./icons/EditIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ResultsData {
  instruments: string[];
  style: string;
  difficulty: string;
}

function Refresh() {
  return (
    <div
      className="relative shrink-0 size-[18px] sm:size-[19px] md:size-[20px] lg:size-[22px]"
      data-name="Refresh Cw"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 51 51"
      >
        <g id="Refresh Cw">
          <path
            d="M46.7199 8.53564V20.7901H34.4654"
            id="Icon"
            stroke="var(--stroke-0, #1E1E1E)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.18402"
          />
          <path
            d="M4.22583 41.9176V29.6632H16.4803"
            id="Icon_2"
            stroke="var(--stroke-0, #1E1E1E)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.18402"
          />
          <path
            d="M8.32227 18.6622C9.02661 16.3046 10.2878 14.1501 12.0036 12.3686C13.7193 10.5871 15.8386 9.23009 18.1743 8.41377C20.51 7.59745 23.0005 7.34389 25.4376 7.67299C27.8747 8.00208 30.1917 8.90503 32.2017 10.3086L46.72 20.7904M4.22583 29.6632L18.7441 40.145C20.7541 41.5485 23.0711 42.4515 25.5082 42.7806C27.9453 43.1097 30.4358 42.8561 32.7715 42.0398C35.1072 41.2234 37.2265 39.8665 38.9422 38.085C40.658 36.3034 41.9192 34.149 42.6235 31.7914"
            id="Icon_3"
            stroke="var(--stroke-0, #1E1E1E)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.18402"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame6({
  instruments,
  styles,
  difficulty,
  onRegenerate,
  onEditInstrument,
  onEditStyle,
  onEditDifficulty,
}: {
  instruments: string[];
  styles: string[];
  difficulty: string;
  onRegenerate: () => void;
  onEditInstrument: (tag: string, index: number) => void;
  onEditStyle: (tag: string, index: number) => void;
  onEditDifficulty: (tag: string, index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3.5 flex-1 items-start w-full">
      <TagSection title="Instruments" tags={instruments} onEditTag={onEditInstrument} />
      <TagSection title="Style" tags={styles} onEditTag={onEditStyle} />
      <TagSection title="Difficulty" tags={[difficulty]} onEditTag={onEditDifficulty} />
      <div className="mt-1.5">
        <div
          onClick={onRegenerate}
          className="border-solid border-[#201315] bg-[#f8f3eb] content-stretch flex py-1.5 sm:py-2 px-3 sm:px-4 gap-1.5 sm:gap-2 items-center shrink-0 rounded-[10px] sm:rounded-[12px] border-[2px] sm:border-[2.5px] cursor-pointer hover:bg-[#e5ddd5] hover:scale-105 transition-all active:scale-95"
        >
          <p className="font-['Figtree:SemiBold',_sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#201315] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-nowrap whitespace-pre">
            Regenerate
          </p>
          <Refresh />
        </div>
      </div>
    </div>
  );
}

function Maximize({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute right-2 sm:right-3 md:right-4 top-2 sm:top-3 md:top-4 size-[32px] sm:size-[36px] md:size-[40px] cursor-pointer hover:opacity-70 transition-opacity bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
      data-name="Maximize 2"
      onClick={onClick}
    >
      <svg
        className="block size-[20px] sm:size-[24px] md:size-[28px]"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 51 51"
      >
        <g id="Maximize 2">
          <path
            d={svgPaths.p1ba20c80}
            id="Icon"
            stroke="var(--stroke-0, #1E1E1E)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.18402"
          />
        </g>
      </svg>
    </div>
  );
}

function ExpandedMusicPlayer({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Number of pages in the sheet music

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="bg-[#f8f3eb] rounded-[24px] sm:rounded-[36px] md:rounded-[48px] lg:rounded-[54.392px] w-full max-w-6xl h-[85vh] sm:h-[80vh] relative shadow-2xl flex flex-col">
        <div className="absolute right-4 sm:right-6 md:right-8 top-4 sm:top-6 md:top-8">
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="icon"
            className="h-12 w-12 rounded-full hover:bg-[#e5ddd5]/50"
            aria-label="Close expanded view"
          >
            <X size={24} className="text-[#1e1e1e]" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center overflow-hidden px-4">
          <div className="text-center">
            <p className="font-['Figtree:Bold',_sans-serif] text-[#201315] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] mb-3 sm:mb-4">
              Harmony Sheet Music Preview
            </p>
            <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] mb-1.5 sm:mb-2">
              Page {currentPage + 1} of {totalPages}
            </p>
            <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]">
              Sheet music content would appear here
            </p>
          </div>
        </div>
        {/* Pagination dots at bottom */}
        <div className="pb-6 sm:pb-7 md:pb-8 flex justify-center gap-2.5 sm:gap-3 md:gap-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`size-[20px] sm:size-[24px] md:size-[28px] rounded-full transition-all duration-200 ${
                index === currentPage 
                  ? 'bg-[#e76d57] scale-110' 
                  : 'bg-[#1e1e1e] hover:bg-[#4a4a4a]'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-2.5 md:gap-3">
      <div className="size-[16px] sm:size-[18px] md:size-[20px] lg:size-[24px] rounded-full bg-black" />
      <div className="size-[16px] sm:size-[18px] md:size-[20px] lg:size-[24px] rounded-full bg-black" />
      <div className="size-[16px] sm:size-[18px] md:size-[20px] lg:size-[24px] rounded-full bg-black" />
    </div>
  );
}

function Frame5({ onExpand }: { onExpand: () => void }) {
  return (
    <div className="relative w-full max-w-[650px] aspect-[774/552] shrink-0">
      <div className="absolute bg-[#d9d9d9] inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] shadow-lg flex items-center justify-center">
        <p className="font-['Figtree:Regular',_sans-serif] text-[#666] text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] px-4 text-center">
          Harmony Sheet Music Preview
        </p>
      </div>
      <Maximize onClick={onExpand} />
      <Frame15 />
    </div>
  );
}

function Tag({
  label,
  gridArea,
  onEdit,
}: {
  label: string;
  gridArea: string;
  onEdit?: () => void;
}) {
  return (
    <div
      className={`${gridArea} box-border flex items-center justify-center gap-1.5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 relative rounded-full shrink-0 min-w-0 hover:bg-[#e5ddd5]/50 hover:scale-105 transition-all cursor-default group`}
    >
      <div
        aria-hidden="true"
        className="absolute border-[#e5ddd5] border-[2px] sm:border-[2.5px] md:border-[3px] border-solid inset-0 pointer-events-none rounded-full"
      />
      <p className="font-['Figtree:Regular',_sans-serif] font-normal leading-[100.005%] relative text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] text-black text-center px-1">
        {label}
      </p>
      {onEdit && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="relative z-10"
          aria-label={`Edit ${label}`}
        >
          <EditIcon size={14} className="!cursor-pointer" />
        </button>
      )}
    </div>
  );
}

function getIconForSection(title: string) {
  if (title.includes('Instruments')) return <Music2 size={16} />;
  if (title.includes('Style')) return <Sparkles size={16} />;
  if (title.includes('Difficulty')) return <BarChart3 size={16} />;
  return null;
}

function TagSection({ 
  title, 
  tags, 
  onEditTag 
}: { 
  title: string; 
  tags: string[];
  onEditTag?: (tag: string, index: number) => void;
}) {
  // Remove emoji from title
  const cleanTitle = title.replace(/[🎸🎵📊]/g, '').trim();
  
  return (
    <div className="flex flex-col gap-2 sm:gap-2.5 w-full bg-white/30 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-[14px] sm:rounded-[16px] md:rounded-[18px]">
      <h3 className="font-['Figtree:SemiBold',_sans-serif] font-semibold text-[13px] sm:text-[14px] md:text-[15px] text-[#201315] flex items-center gap-1.5 sm:gap-2">
        {getIconForSection(title)}
        {cleanTitle}
      </h3>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {tags.map((tag, index) => (
          <Tag 
            key={`${title}-${index}`} 
            label={tag} 
            gridArea="" 
            onEdit={onEditTag ? () => onEditTag(tag, index) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

function Frame13({
  instruments,
  styles,
  difficulty,
  onExpand,
  onRegenerate,
  onEditInstrument,
  onEditStyle,
  onEditDifficulty,
}: {
  instruments: string[];
  styles: string[];
  difficulty: string;
  onExpand: () => void;
  onRegenerate: () => void;
  onEditInstrument: (tag: string, index: number) => void;
  onEditStyle: (tag: string, index: number) => void;
  onEditDifficulty: (tag: string, index: number) => void;
}) {
  return (
    <div className="content-stretch flex flex-col lg:flex-row gap-5 lg:gap-6 items-start w-full">
      <Frame5 onExpand={onExpand} />
      <Frame6
        instruments={instruments}
        styles={styles}
        difficulty={difficulty}
        onRegenerate={onRegenerate}
        onEditInstrument={onEditInstrument}
        onEditStyle={onEditStyle}
        onEditDifficulty={onEditDifficulty}
      />
    </div>
  );
}

function Frame9({
  onGenerateNew,
}: {
  onGenerateNew: () => void;
}) {
  return (
    <Button 
      onClick={onGenerateNew}
      className="min-w-[200px] h-12 text-base bg-gradient-to-r from-[#201315] to-[#e76d57] hover:opacity-90 text-white border-0"
    >
      Generate New
    </Button>
  );
}

function Frame14({
  onExpand,
  data,
  onRegenerate,
  onGenerateNew,
  onEditInstrument,
  onEditStyle,
  onEditDifficulty,
}: {
  onExpand: () => void;
  data: ResultsData;
  onRegenerate: () => void;
  onGenerateNew: () => void;
  onEditInstrument: (tag: string, index: number) => void;
  onEditStyle: (tag: string, index: number) => void;
  onEditDifficulty: (tag: string, index: number) => void;
}) {
  return (
    <div className="content-stretch flex flex-col gap-5 md:gap-6 w-full">
      <div className="flex flex-col gap-5 items-start w-full">
        <Frame13
          instruments={data.instruments}
          styles={[data.style]}
          difficulty={data.difficulty}
          onExpand={onExpand}
          onRegenerate={onRegenerate}
          onEditInstrument={onEditInstrument}
          onEditStyle={onEditStyle}
          onEditDifficulty={onEditDifficulty}
        />
      </div>
      <div className="flex justify-center w-full">
        <Frame9 onGenerateNew={onGenerateNew} />
      </div>
    </div>
  );
}

const INSTRUMENTS_OPTIONS = ['Altor', 'Tenor', 'Bass'];
const STYLE_OPTIONS = ['Classical', 'Jazz', 'Pop', 'Rock', 'Blues', 'Folk'];
const DIFFICULTY_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function ResultsScreen({
  data,
  onRegenerate,
  onGenerateNew,
}: {
  data: ResultsData;
  onRegenerate: () => void;
  onGenerateNew: () => void;
}) {
  const [projectName, setProjectName] = useState(
    "Untitled Project",
  );
  const [tempName, setTempName] = useState("Untitled Project");
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Edit dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editType, setEditType] = useState<'instrument' | 'style' | 'difficulty' | null>(null);
  const [editIndex, setEditIndex] = useState<number>(0);
  const [editValue, setEditValue] = useState<string>('');
  
  // Local state for edited data
  const [currentInstruments, setCurrentInstruments] = useState<string[]>(data.instruments);
  const [currentStyle, setCurrentStyle] = useState<string>(data.style);
  const [currentDifficulty, setCurrentDifficulty] = useState<string>(data.difficulty);

  const handleEdit = () => {
    setTempName(projectName);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (tempName.trim()) {
      setProjectName(tempName.trim());
    } else {
      setTempName(projectName);
    }
    setIsEditing(false);
  };

  const handleSaveProject = () => {
    // TODO: Implement save functionality
    console.log('Saving project:', projectName);
  };

  const handleShareProject = () => {
    // TODO: Implement share functionality
    console.log('Sharing project:', projectName);
  };

  const handleExportProject = () => {
    // TODO: Implement export functionality
    console.log('Exporting project:', projectName);
  };

  // Edit tag handlers
  const handleEditInstrument = (tag: string, index: number) => {
    setEditType('instrument');
    setEditIndex(index);
    setEditValue(tag);
    setIsEditDialogOpen(true);
  };

  const handleEditStyle = (tag: string, index: number) => {
    setEditType('style');
    setEditIndex(index);
    setEditValue(tag);
    setIsEditDialogOpen(true);
  };

  const handleEditDifficulty = (tag: string, index: number) => {
    setEditType('difficulty');
    setEditIndex(index);
    setEditValue(tag);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editType === 'instrument') {
      const newInstruments = [...currentInstruments];
      newInstruments[editIndex] = editValue;
      setCurrentInstruments(newInstruments);
    } else if (editType === 'style') {
      setCurrentStyle(editValue);
    } else if (editType === 'difficulty') {
      setCurrentDifficulty(editValue);
    }
    setIsEditDialogOpen(false);
    // Just update the display - don't navigate away
    // The UI will automatically show the updated values
  };

  return (
    <div className="bg-[#f8f3eb] relative h-screen w-full overflow-hidden flex flex-col">
      <AppHeader
        currentStep={2}
        totalSteps={3}
        onBack={() => {
          /* TODO: Navigate back to instrument selection */
        }}
      />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-3.5 md:gap-4 max-w-[1200px] w-full px-4 md:px-8 mx-auto py-4">
          <Breadcrumbs
            steps={["Select Instruments", "Processing", "Results"]}
            currentStep={2}
          />
          
          {/* Results Header with Actions */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
            <PageHeader
              title="Here is your harmony!"
              subtitle="Your personalized sheet music based on your preferences"
              showProjectName={true}
              projectName={tempName}
              isEditing={isEditing}
              onProjectNameChange={setTempName}
              onEditToggle={isEditing ? handleSave : handleEdit}
            />

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Button
                onClick={handleSaveProject}
                variant="outline"
                size="default"
                className="h-10 px-4 border-2 border-[#e5ddd5]"
                aria-label="Save project"
              >
                <Save size={16} className="mr-2" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button
                onClick={handleShareProject}
                variant="outline"
                size="default"
                className="h-10 px-4 border-2 border-[#e5ddd5]"
                aria-label="Share project"
              >
                <Share2 size={16} className="mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button
                onClick={handleExportProject}
                className="h-10 px-4 bg-gradient-to-r from-[#201315] to-[#e76d57] hover:opacity-90"
                aria-label="Export project"
              >
                <Download size={16} className="mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          <Frame14
            onExpand={() => setIsExpanded(true)}
            data={{
              instruments: currentInstruments,
              style: currentStyle,
              difficulty: currentDifficulty,
            }}
            onRegenerate={onRegenerate}
            onGenerateNew={onGenerateNew}
            onEditInstrument={handleEditInstrument}
            onEditStyle={handleEditStyle}
            onEditDifficulty={handleEditDifficulty}
          />
        </div>
      </div>
      {isExpanded && (
        <ExpandedMusicPlayer
          onClose={() => setIsExpanded(false)}
        />
      )}
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-['Figtree:Bold',_sans-serif] text-[20px] sm:text-[24px] text-[#201315]">
              Edit {editType === 'instrument' ? 'Instrument' : editType === 'style' ? 'Style' : 'Difficulty'}
            </DialogTitle>
            <DialogDescription className="font-['SF_Pro_Rounded:Regular',_sans-serif] text-[#6B6563]">
              Change the parameter and the music sheet will automatically refresh.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label 
                htmlFor="edit-value" 
                className="font-['Figtree:SemiBold',_sans-serif] text-[14px] text-[#201315]"
              >
                Select New Value
              </label>
              <Select value={editValue} onValueChange={setEditValue}>
                <SelectTrigger id="edit-value" className="w-full">
                  <SelectValue placeholder="Choose an option" />
                </SelectTrigger>
                <SelectContent>
                  {editType === 'instrument' && INSTRUMENTS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  {editType === 'style' && STYLE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  {editType === 'difficulty' && DIFFICULTY_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setIsEditDialogOpen(false)}
              variant="outline"
              className="w-full sm:w-auto h-12 border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="w-full sm:w-auto h-12 bg-gradient-to-r from-[#201315] to-[#e76d57] hover:opacity-90"
            >
              Save & Refresh
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}