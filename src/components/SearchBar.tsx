import React, { ReactElement } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
type PropsType = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBar({ value, onChange }: Readonly<PropsType>): ReactElement {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        className="rounded-md border bg-white py-2 pl-4 pr-10 text-background"
        placeholder="Insérez un mot-clé"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 transform" />
    </div>
  )
}
