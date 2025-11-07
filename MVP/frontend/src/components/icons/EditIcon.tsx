interface EditIconProps {
  onClick?: () => void;
  className?: string;
  size?: number;
}

export function EditIcon({ 
  onClick, 
  className = "",
  size = 40
}: EditIconProps) {
  return (
    <div
      onClick={onClick}
      className={`relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity ${className}`}
      data-name="Edit"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 51 51"
        width={size}
        height={size}
      >
        <g id="Edit">
          <path
            d="M23.4804 10.5359H10.4804C8.82354 10.5359 7.23458 11.1942 6.05936 12.3694C4.88414 13.5446 4.22583 15.1336 4.22583 16.7905V39.7905C4.22583 41.4473 4.88414 43.0363 6.05936 44.2115C7.23458 45.3867 8.82354 46.045 10.4804 46.045H33.4804C35.1373 46.045 36.7262 45.3867 37.9015 44.2115C39.0767 43.0363 39.735 41.4473 39.735 39.7905V26.7905"
            id="Icon"
            stroke="var(--stroke-0, #1E1E1E)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4.18402"
          />
          <path
            d="M36.6078 7.40862C37.8362 6.18022 39.5065 5.49146 41.2489 5.49146C42.9913 5.49146 44.6616 6.18022 45.89 7.40862C47.1184 8.63702 47.8071 10.3073 47.8071 12.0497C47.8071 13.7921 47.1184 15.4624 45.89 16.6908L25.1077 37.4731L16.3532 39.6006L18.4807 30.8461L36.6078 7.40862Z"
            id="Icon_2"
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
