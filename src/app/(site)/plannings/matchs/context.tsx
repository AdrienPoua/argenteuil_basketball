import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

const MatchContext = createContext<{
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentFilter: FilterType;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  currentView: 'équipe' | 'date';
  setCurrentView: React.Dispatch<React.SetStateAction<'équipe' | 'date'>>;
} | null>(null);

type FilterType = 'tous' | 'domicile' | 'extérieur';

export function useMatchContext() {
  const context = useContext(MatchContext);
  if (!context) throw new Error('useMatchContext must be used within MatchProvider');
  return context;
}

export default function MatchProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentFilter, setCurrentFilter] = useState<FilterType>('tous');
  const [currentView, setCurrentView] = useState<'équipe' | 'date'>('équipe');

  const value = useMemo(
    () => ({
      currentMonth,
      setCurrentMonth,
      currentFilter,
      setCurrentFilter,
      currentView,
      setCurrentView,
    }),
    [currentMonth, currentFilter, currentView],
  );

  return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
}
