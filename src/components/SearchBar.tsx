import React, { ReactElement } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
type PropsType = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchBar({ value, onChange }: Readonly<PropsType>): ReactElement {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        value={value}
        onChange={onChange}
        className="bg-white pr-10 pl-4 py-2 border rounded-md text-background"
        placeholder="Insérez un mot-clé"
      />
      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 " />
    </div>
  );
}
