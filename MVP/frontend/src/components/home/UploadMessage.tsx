interface UploadMessageProps {
  fileName?: string;
  error?: string;
}

export function UploadMessage({ fileName, error }: UploadMessageProps) {
  if (error) {
    return (
      <div className="absolute left-1/2 top-[calc(50%+200px)] sm:top-[calc(50%+220px)] md:top-[calc(50%+250px)] lg:top-[calc(50%+280px)] -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <p className="font-['SF_Pro_Rounded:Regular',_sans-serif] text-[#E76D57] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">{error}</p>
      </div>
    );
  }
  
  if (fileName) {
    return (
      <div className="absolute left-1/2 top-[calc(50%+200px)] sm:top-[calc(50%+220px)] md:top-[calc(50%+250px)] lg:top-[calc(50%+280px)] -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <p className="font-['SF_Pro_Rounded:Regular',_sans-serif] text-[#201315] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">Uploaded: {fileName}</p>
      </div>
    );
  }
  
  return null;
}
