interface BreadcrumbsProps {
  steps: string[];
  currentStep: number;
}

export default function Breadcrumbs({ steps, currentStep }: BreadcrumbsProps) {
  return (
    <nav aria-label="Progress" className="mb-3.5 md:mb-4">
      <ol className="flex items-center gap-2 text-[13px] md:text-[14px] flex-wrap">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={`transition-colors ${
                index === currentStep
                  ? 'text-[#e76d57] font-semibold'
                  : index < currentStep
                  ? 'text-[#201315] font-medium'
                  : 'text-[#201315]/40'
              } font-['Figtree:SemiBold',_sans-serif]`}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <span className="text-[#201315]/40">→</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
