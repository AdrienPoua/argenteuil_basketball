import { createContext, useContext, useState, ReactNode } from 'react';

const MatchContext = createContext<{
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<number>>;
  currentFilter: 'tous' | 'domicile' | 'extérieur';
  setCurrentFilter: React.Dispatch<React.SetStateAction<'tous' | 'domicile' | 'extérieur'>>;
  currentView: 'équipe' | 'date';
  setCurrentView: React.Dispatch<React.SetStateAction<'équipe' | 'date'>>;
} | null>(null);

export function useMatchContext() {
  const context = useContext(MatchContext);
  if (!context) throw new Error('useMatchContext must be used within MatchProvider');
  return context;
}

export default function MatchProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentFilter, setCurrentFilter] = useState<'tous' | 'domicile' | 'extérieur'>('tous');
  const [currentView, setCurrentView] = useState<'équipe' | 'date'>('équipe');
  return (
    <MatchContext.Provider
      value={{ currentMonth, setCurrentMonth, currentFilter, setCurrentFilter, currentView, setCurrentView }}
    >
      {children}
    </MatchContext.Provider>
  );
}
