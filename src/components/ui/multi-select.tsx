'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options,
  selected = [],
  onChange,
  placeholder = 'Select options...',
}: Readonly<MultiSelectProps>) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    const updatedSelected = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
    onChange(updatedSelected);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button role='combobox' aria-expanded={open} className='w-full justify-between'>
          <div className='flex flex-wrap gap-1'>
            {selected.length > 0 ? (
              selected.map((value, index) => (
                <Badge key={value + index} className='mr-1'>
                  {options.find((option) => option.value === value)?.label}
                </Badge>
              ))
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Search options...' />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandList>
            {options.map((option) => (
              <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                <Check className={cn('mr-2 h-4 w-4', selected.includes(option.value) ? 'opacity-100' : 'opacity-0')} />
                {option.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
