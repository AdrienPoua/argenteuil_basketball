import { createContext, useContext, useState, ReactNode, ReactElement, Dispatch, SetStateAction, useMemo } from "react";
import { Box } from "@mui/system";
import Modal from "@/components/Modal";

export interface ModalContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  content: ReactElement;
  setContent: Dispatch<SetStateAction<ReactElement>>;
}

const ModalContext = createContext<ModalContextProps | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

export function ModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactElement>(<Box />);
  const value = useMemo(() => ({ open, setOpen, content, setContent }), [open, content]);
  return (
    <ModalContext.Provider value={value}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
