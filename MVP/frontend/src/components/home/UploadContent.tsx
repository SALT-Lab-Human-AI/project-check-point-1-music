import { UploadCloudIcon } from '../icons';

interface UploadContentProps {
  isHovering: boolean;
}

function FileInfo() {
  return (
    <div className="font-['SF_Pro_Rounded:Regular',_sans-serif] grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[normal] not-italic place-items-start relative shrink-0 text-[#7A7A7A] text-[12px] sm:text-[13px] md:text-[14px] lg:text-[16px] text-nowrap whitespace-pre">
      <p className="[grid-area:1_/_1] ml-0 mt-0 relative">MIDI/XML files only</p>
      <p className="[grid-area:1_/_1] ml-[28px] sm:ml-[32px] md:ml-[36px] lg:ml-[40px] mt-[18px] sm:mt-[20px] md:mt-[22px] lg:mt-[24px] relative">50mb</p>
    </div>
  );
}

export function UploadContent({ isHovering }: UploadContentProps) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] sm:gap-[14px] md:gap-[16px] items-center justify-center relative shrink-0">
      <div className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px]">
        <UploadCloudIcon isHovering={isHovering} size={90} className="w-full h-full" />
      </div>
      <FileInfo />
    </div>
  );
}
