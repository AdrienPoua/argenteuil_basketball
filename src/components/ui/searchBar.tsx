import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

type SearchBarProps<T extends object> = {
  allItems: T[];
  setState: React.Dispatch<React.SetStateAction<T[]>>;
  placeholder?: string;
  searchKey: (keyof T)[];
};

export function SearchBar<T extends object>({
  allItems,
  setState,
  placeholder = 'Rechercher',
  searchKey,
}: Readonly<SearchBarProps<T>>) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const searchInto = (item: T) =>
      searchKey.some((key) => {
        const value = item[key];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });

    const handler = setTimeout(() => {
      const filtered = allItems.filter((item) => searchInto(item));
      setState(filtered);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, allItems, setState, searchKey]);

  return (
    <div className='flex gap-2'>
      <div className='relative flex-1'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder={placeholder}
          className='pl-8'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
