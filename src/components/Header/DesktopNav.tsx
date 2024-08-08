import { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import NavItem from "@/components/Header/NavItem";
import SubBar from "@/components/Header/SubBar";
import Logo from "@/components/Logo";
import { useModal } from "@/utils/contexts/Modal";
import HeaderModal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

export default function Index(): ReactElement {
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  
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
            {navItems.map((item) => (
              <NavItem
                key={item.title}
                navItem={item}
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
      <SubBar />
    </>
  );
};
