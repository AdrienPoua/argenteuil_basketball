import { createContext } from 'react';
import { MenuState } from '@/types';

const ScrollingContext = createContext(false);
const defaultValue: MenuState = {
    isMenuOpen: false,
    setIsMenuOpen: () => {},
    dataMenu: null,
    setDataMenu: () => {},
  };
  
  const MenuContext = createContext(defaultValue);
  
export { ScrollingContext, MenuContext}

