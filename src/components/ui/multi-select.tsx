'use client'

import { ChevronDown, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/core/shared/utils/cn'

type MultiSelectProps<T> = {
  label: string
  options: T[]
  getOptionLabel: (option: T) => string
  getOptionValue: (option: T) => string
  selectedValues: string[]
  onChange: (values: string[]) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  maxHeight?: string
}

type BadgesContentProps = {
  selectedValues: string[]
  selectedLabels: (string | null)[]
  placeholder?: string
  label: string
  removeSelection: (value: string) => void
}

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
  maxHeight = '300px',
}: Readonly<MultiSelectProps<T>>) {
  const [isOpen, setIsOpen] = useState(false)

  const { toggleSelection, removeSelection, selectedLabels } = useMemo(() => {
    const toggle = (value: string) => {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value))
      } else {
        onChange([...selectedValues, value])
      }
    }

    const remove = (value: string) => {
      onChange(selectedValues.filter((v) => v !== value))
    }

    const labels = selectedValues
      .map((value) => {
        const option = options.find((opt) => getOptionValue(opt) === value)
        return option ? getOptionLabel(option) : null
      })
      .filter(Boolean)

    return {
      toggleSelection: toggle,
      removeSelection: remove,
      selectedLabels: labels,
    }
  }, [selectedValues, onChange, options, getOptionLabel, getOptionValue])

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Popover open={isOpen} onOpenChange={setIsOpen} modal={true}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              aria-expanded={isOpen}
              disabled={disabled}
              className={cn(
                'h-fit min-h-[40px] w-full justify-between text-left',
                selectedValues.length === 0 && 'text-muted-foreground',
              )}
            >
              <div className="flex flex-1 flex-wrap items-center gap-1">
                <BadgesContent
                  selectedValues={selectedValues}
                  selectedLabels={selectedLabels}
                  placeholder={placeholder}
                  label={label}
                  removeSelection={removeSelection}
                />
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-full p-0"
            align="start"
            style={{ width: 'var(--radix-popover-trigger-width)' }}
            side="bottom"
            sideOffset={4}
          >
            <div className="border-b p-2">
              <div className="text-sm text-muted-foreground">
                {selectedValues.length} sur {options.length} sélectionné(s)
              </div>
            </div>

            <OptionsList
              options={options}
              selectedValues={selectedValues}
              onToggle={toggleSelection}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              maxHeight={maxHeight}
            />

            {selectedValues.length > 0 && (
              <div className="border-t p-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange([])
                  }}
                  className="w-full"
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
  )
}

const BadgesContent = ({
  selectedValues,
  selectedLabels,
  placeholder,
  label,
  removeSelection,
}: Readonly<BadgesContentProps>) => {
  if (selectedValues.length === 0) {
    return <span>{placeholder ?? `Sélectionner ${label.toLowerCase()}`}</span>
  }

  if (selectedValues.length <= 3) {
    return (
      <>
        {selectedLabels.map((labelText, index) => (
          <Badge
            key={selectedValues[index]}
            variant="secondary"
            className="mr-1 cursor-pointer hover:bg-secondary/80"
            onClick={(e) => {
              e.stopPropagation()
              removeSelection(selectedValues[index] ?? '')
            }}
          >
            {labelText}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}
      </>
    )
  }

  return (
    <Badge variant="secondary" className="mr-1">
      {selectedValues.length} sélectionné(s)
    </Badge>
  )
}

const OptionItem = <T,>({
  option,
  isSelected,
  onToggle,
  getOptionLabel,
}: Readonly<{
  option: T
  isSelected: boolean
  onToggle: () => void
  getOptionLabel: (option: T) => string
}>) => {
  const label = getOptionLabel(option)

  return (
    <button
      className={cn(
        'flex w-full cursor-pointer px-3 py-2 transition-colors hover:bg-accent',
        isSelected && 'bg-accent',
      )}
      onClick={onToggle}
    >
      <Checkbox checked={isSelected} className="pointer-events-none mr-2" />
      <span className="truncate text-sm">{label}</span>
    </button>
  )
}

const OptionsList = <T,>({
  options,
  selectedValues,
  onToggle,
  getOptionLabel,
  getOptionValue,
  maxHeight,
}: Readonly<{
  options: T[]
  selectedValues: string[]
  onToggle: (value: string) => void
  getOptionLabel: (option: T) => string
  getOptionValue: (option: T) => string
  maxHeight: string
}>) => {
  return (
    <div className="overflow-y-auto" style={{ maxHeight }}>
      {options.map((option) => {
        const value = getOptionValue(option)
        const isSelected = selectedValues.includes(value)

        return (
          <OptionItem
            key={value}
            option={option}
            isSelected={isSelected}
            onToggle={() => onToggle(value)}
            getOptionLabel={getOptionLabel}
          />
        )
      })}
    </div>
  )
}
