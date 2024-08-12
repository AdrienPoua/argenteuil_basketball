import { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import NavItem from "@/components/Header/NavItem";
import SubBar from "@/components/Header/SubBar";
import Logo from "@/components/Logo";
import HeaderModal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { open, setContent } from "@/lib/redux/slices/modal";

export default function Index(): ReactElement {
  const navItems = useSelector((state: RootState) => state.navbar.navItems);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(open());
    dispatch(setContent(<HeaderModal isMobile={false} />));
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
