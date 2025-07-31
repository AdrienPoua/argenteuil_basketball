'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { ChevronDown, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/core/shared/utils/cn';

type MultiSelectProps<T> = {
  label: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  useVirtualizer?: boolean;
  maxHeight?: string;
};

type BadgesContentProps = {
  selectedValues: string[];
  selectedLabels: (string | null)[];
  placeholder?: string;
  label: string;
  removeSelection: (value: string) => void;
};

const BadgesContent = ({ selectedValues, selectedLabels, placeholder, label, removeSelection }: BadgesContentProps) => {
  if (selectedValues.length === 0) {
    return <span>{placeholder ?? `Sélectionner ${label.toLowerCase()}`}</span>;
  }

  if (selectedValues.length <= 3) {
    return (
      <>
        {selectedLabels.map((labelText, index) => (
          <Badge
            key={selectedValues[index]}
            variant='secondary'
            className='mr-1 cursor-pointer hover:bg-secondary/80'
            onClick={(e) => {
              e.stopPropagation();
              removeSelection(selectedValues[index] ?? '');
            }}
          >
            {labelText}
            <X className='ml-1 h-3 w-3' />
          </Badge>
        ))}
      </>
    );
  }

  return (
    <Badge variant='secondary' className='mr-1'>
      {selectedValues.length} sélectionné(s)
    </Badge>
  );
};

const OptionItem = <T,>({
  option,
  isSelected,
  onToggle,
  getOptionLabel,
}: {
  option: T;
  isSelected: boolean;
  onToggle: () => void;
  getOptionLabel: (option: T) => string;
}) => {
  const label = getOptionLabel(option);

  return (
    <button
      className={cn(
        'flex w-full cursor-pointer px-3 py-2 transition-colors hover:bg-accent',
        isSelected && 'bg-accent',
      )}
      onClick={onToggle}
    >
      <Checkbox checked={isSelected} className='pointer-events-none mr-2' />
      <span className='truncate text-sm'>{label}</span>
    </button>
  );
};

const VirtualizedOptions = <T,>({
  options,
  selectedValues,
  onToggle,
  getOptionLabel,
  getOptionValue,
  scrollRef,
  maxHeight,
}: {
  options: T[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  maxHeight: string;
}) => {
  const virtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 40,
    overscan: 5,
    scrollPaddingStart: 0,
    scrollPaddingEnd: 0,
  });

  return (
    <div
      ref={scrollRef as React.RefObject<HTMLDivElement>}
      className='overflow-y-auto overscroll-contain'
      style={{
        height: maxHeight,
        scrollbarWidth: 'thin',
      }}
      onWheel={(e) => {
        // Gestion manuelle du scroll avec la molette
        e.preventDefault();
        e.stopPropagation();

        if (scrollRef.current) {
          const scrollAmount = e.deltaY;
          const currentScrollTop = scrollRef.current.scrollTop;
          const maxScrollTop = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;

          // Calculer la nouvelle position de scroll
          const newScrollTop = Math.max(0, Math.min(maxScrollTop, currentScrollTop + scrollAmount));

          // Appliquer le scroll
          scrollRef.current.scrollTop = newScrollTop;
        }
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
          width: '100%',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const option = options[virtualRow.index];
          if (!option) return null;

          const value = getOptionValue(option);
          const isSelected = selectedValues.includes(value);

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '40px',
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <OptionItem
                option={option}
                isSelected={isSelected}
                onToggle={() => onToggle(value)}
                getOptionLabel={getOptionLabel}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RegularOptions = <T,>({
  options,
  selectedValues,
  onToggle,
  getOptionLabel,
  getOptionValue,
}: {
  options: T[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}) => {
  return (
    <>
      {options.map((option) => {
        const value = getOptionValue(option);
        const isSelected = selectedValues.includes(value);

        return (
          <OptionItem
            key={value}
            option={option}
            isSelected={isSelected}
            onToggle={() => onToggle(value)}
            getOptionLabel={getOptionLabel}
          />
        );
      })}
    </>
  );
};

export function MultiSelect<T>({
  label,
  options,
  getOptionLabel,
  getOptionValue,
  selectedValues,
  onChange,
  disabled = false,
  placeholder,
  className,
  useVirtualizer = false,
  maxHeight = '300px',
}: Readonly<MultiSelectProps<T>>) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { toggleSelection, removeSelection, selectedLabels } = useMemo(() => {
    const toggle = (value: string) => {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    };

    const remove = (value: string) => {
      onChange(selectedValues.filter((v) => v !== value));
    };

    const labels = selectedValues
      .map((value) => {
        const option = options.find((opt) => getOptionValue(opt) === value);
        return option ? getOptionLabel(option) : null;
      })
      .filter(Boolean);

    return {
      toggleSelection: toggle,
      removeSelection: remove,
      selectedLabels: labels,
    };
  }, [selectedValues, onChange, options, getOptionLabel, getOptionValue]);

  const shouldUseVirtualizer = useVirtualizer && options.length > 50;

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              aria-expanded={isOpen}
              disabled={disabled}
              className={cn(
                'h-fit min-h-[40px] w-full justify-between text-left',
                selectedValues.length === 0 && 'text-muted-foreground',
              )}
            >
              <div className='flex flex-1 flex-wrap items-center gap-1'>
                <BadgesContent
                  selectedValues={selectedValues}
                  selectedLabels={selectedLabels}
                  placeholder={placeholder}
                  label={label}
                  removeSelection={removeSelection}
                />
              </div>
              <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className='w-full p-0'
            align='start'
            style={{ width: 'var(--radix-popover-trigger-width)' }}
            onWheel={(e) => {
              // Permet au scroll de fonctionner à l'intérieur du popover
              e.stopPropagation();
            }}
          >
            <div className='border-b p-2'>
              <div className='text-sm text-muted-foreground'>
                {selectedValues.length} sur {options.length} sélectionné(s)
              </div>
            </div>

            {shouldUseVirtualizer ? (
              <VirtualizedOptions
                options={options}
                selectedValues={selectedValues}
                onToggle={toggleSelection}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                scrollRef={scrollRef}
                maxHeight={maxHeight}
              />
            ) : (
              <div className='overflow-y-auto' style={{ maxHeight }}>
                <RegularOptions
                  options={options}
                  selectedValues={selectedValues}
                  onToggle={toggleSelection}
                  getOptionLabel={getOptionLabel}
                  getOptionValue={getOptionValue}
                />
              </div>
            )}

            {selectedValues.length > 0 && (
              <div className='border-t p-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange([]);
                  }}
                  className='w-full'
                >
                  Tout désélectionner
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

// Export des anciennes versions pour la compatibilité (deprecated)
export const MultiSelectWithVirtualizer = <T,>(props: MultiSelectProps<T>) => (
  <MultiSelect {...props} useVirtualizer={true} />
);

export const Multiselect = MultiSelect;
