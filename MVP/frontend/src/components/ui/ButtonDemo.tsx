/**
 * Button Components Demo
 * This file shows examples of all button variants
 * Not used in production - for reference only
 */

import { 
  PrimaryButton, 
  SecondaryButton, 
  TertiaryButton, 
  IconButton, 
  SelectionCard 
} from './Buttons';
import { X, ChevronLeft, Plus } from 'lucide-react';

export default function ButtonDemo() {
  return (
    <div className="p-8 space-y-12 bg-[#f8f3eb] min-h-screen">
      <div>
        <h2 className="text-[32px] font-bold mb-6">Primary Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <PrimaryButton onClick={() => console.log('clicked')}>
            Continue
          </PrimaryButton>
          <PrimaryButton onClick={() => console.log('clicked')} disabled>
            Disabled
          </PrimaryButton>
          <PrimaryButton onClick={() => console.log('clicked')} isLoading>
            Loading...
          </PrimaryButton>
        </div>
      </div>

      <div>
        <h2 className="text-[32px] font-bold mb-6">Secondary Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <SecondaryButton onClick={() => console.log('clicked')}>
            Regenerate
          </SecondaryButton>
          <SecondaryButton onClick={() => console.log('clicked')} disabled>
            Disabled
          </SecondaryButton>
          <SecondaryButton onClick={() => console.log('clicked')} isLoading>
            Loading...
          </SecondaryButton>
        </div>
      </div>

      <div>
        <h2 className="text-[32px] font-bold mb-6">Tertiary Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <TertiaryButton onClick={() => console.log('clicked')}>
            Generate New
          </TertiaryButton>
          <TertiaryButton onClick={() => console.log('clicked')} disabled>
            Disabled
          </TertiaryButton>
        </div>
      </div>

      <div>
        <h2 className="text-[32px] font-bold mb-6">Icon Buttons</h2>
        <div className="flex gap-4 items-center flex-wrap">
          <IconButton onClick={() => console.log('clicked')} size="sm">
            <X size={16} />
          </IconButton>
          <IconButton onClick={() => console.log('clicked')} size="md">
            <ChevronLeft size={24} />
          </IconButton>
          <IconButton onClick={() => console.log('clicked')} size="lg">
            <Plus size={32} />
          </IconButton>
        </div>
      </div>

      <div>
        <h2 className="text-[32px] font-bold mb-6">Selection Cards</h2>
        <div className="grid grid-cols-2 gap-4 max-w-2xl">
          <SelectionCard 
            onClick={() => console.log('clicked')} 
            isSelected={false}
            variant="orange"
          >
            <div className="text-center p-4">
              <p className="text-[24px] font-semibold">Violin</p>
            </div>
          </SelectionCard>
          
          <SelectionCard 
            onClick={() => console.log('clicked')} 
            isSelected={true}
            variant="orange"
          >
            <div className="text-center p-4">
              <p className="text-[24px] font-semibold">Cello (Selected)</p>
            </div>
          </SelectionCard>

          <SelectionCard 
            onClick={() => console.log('clicked')} 
            isSelected={false}
            variant="blue"
          >
            <div className="text-center p-4">
              <p className="text-[18px] font-semibold">Classical</p>
            </div>
          </SelectionCard>

          <SelectionCard 
            onClick={() => console.log('clicked')} 
            isSelected={true}
            variant="blue"
          >
            <div className="text-center p-4">
              <p className="text-[18px] font-semibold">Jazz (Selected)</p>
            </div>
          </SelectionCard>

          <SelectionCard 
            onClick={() => console.log('clicked')} 
            isSelected={false}
            variant="green"
          >
            <div className="text-center p-4">
              <p className="text-[16px] font-semibold">Beginner</p>
            </div>
          </SelectionCard>

          <SelectionCard 
            onClick={() => console.log('clicked')} 
            isSelected={true}
            variant="green"
          >
            <div className="text-center p-4">
              <p className="text-[16px] font-semibold">Expert (Selected)</p>
            </div>
          </SelectionCard>
        </div>
      </div>

      <div>
        <h2 className="text-[32px] font-bold mb-6">Typography Examples</h2>
        <div className="space-y-4">
          <p className="text-[48px] font-bold">Display: Create harmonies in a ⚡</p>
          <p className="text-[32px] font-bold">H1: Here is your harmony!</p>
          <p className="text-[24px] font-semibold">H2: Subsection Header</p>
          <p className="text-[20px] font-semibold">H3: Component Header</p>
          <p className="text-[18px]">Body Large: Important description text</p>
          <p className="text-[16px]">Body: Standard body text for paragraphs</p>
          <p className="text-[14px]">Body Small: Secondary information</p>
          <p className="text-[12px]">Caption: Helper text and captions</p>
        </div>
      </div>
    </div>
  );
}
