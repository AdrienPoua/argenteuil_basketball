import { createContext, useContext, useState, ReactNode, ReactElement, Dispatch, SetStateAction, useMemo } from "react";
import { Box } from "@mui/system";
import Modal from "@/components/Modal";

export interface ModalContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  content: ReactElement;
  setContent: Dispatch<SetStateAction<ReactElement>>;
}

const defaultModalContext: ModalContextProps = {
  open: false,
  setOpen: () => {},
  content: <Box> JE SUIS INTERIEUR DE LA Modal</Box>,
  setContent: () => {},
};

const ModalContext = createContext<ModalContextProps>(defaultModalContext);

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactElement>(<Box></Box>);

  const value = useMemo(() => ({ open, setOpen, content, setContent }), [open, content]);
  

  return (
    <ModalContext.Provider value={value}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};
