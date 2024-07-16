import { createContext, useContext, useState, ReactNode, ReactElement, Dispatch, SetStateAction, useMemo } from "react";
import { Box } from "@mui/system";
import Overlay from "@/components/Overlay";

export interface OverlayContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  content: ReactElement;
  setContent: Dispatch<SetStateAction<ReactElement>>;
}

const defaultOverlayContext: OverlayContextProps = {
  open: false,
  setOpen: () => {},
  content: <Box> JE SUIS INTERIEUR DE LA OVERLAY</Box>,
  setContent: () => {},
};

const OverlayContext = createContext<OverlayContextProps>(defaultOverlayContext);

export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactElement>(<Box></Box>);

  const value = useMemo(() => ({ open, setOpen, content, setContent }), [open, content]);
  

  return (
    <OverlayContext.Provider value={value}>
      <Overlay />
      {children}
    </OverlayContext.Provider>
  );
};
