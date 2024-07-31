import { ReactElement } from "react";
import { NavItemType } from "@/utils/types";
import { Box, Button, Typography } from "@mui/material";
import NavItem from "@/components/Header/NavItem";
import SubBar from "@/components/Header/SubBar";
import Logo from "@/components/Logo";
import { useModal } from "@/utils/contexts/Modal";
import HeaderModal from "./Modal";


type PropsType = {
  data: NavItemType[]
  setCurrentNav: (data: NavItemType) => void
  currentNav: NavItemType | null
  isHidden: boolean
  setIsHidden: (b: boolean) => void
}
export default function Index({ data, setCurrentNav, currentNav, isHidden, setIsHidden }: Readonly<PropsType>): ReactElement {
  const { setOpen, setContent } = useModal();
  const handleClick = () => {
    setOpen(true);
    setContent(<HeaderModal isMobile={false} />);
  };
  return (
    <>
      <Box className="lg:flex hidden relative">
        <Logo />
        <Box
          component="nav"
          className="flex grow items-center justify-center">
          <Box
            component="ul"
            className="flex">
            {data.map((item) => (
              <NavItem
                key={item.title}
                data={item}
                currentNav={currentNav}
                setCurrentNav={setCurrentNav}
                setIsHidden={setIsHidden}
              />
            ))}
          </Box>
        </Box>
        <Button
          onClick={handleClick}
          variant="contained"
          color="primary"
          className="h-fit self-center">
          <Typography
            variant="body1"
            className="tracking-widest font-thin">
            Contact
          </Typography>
        </Button>
      </Box>
      <SubBar data={data} currentNav={currentNav} isHidden={isHidden} />
    </>
  );
};
