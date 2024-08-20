import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import headerData from "@/data/header.json";
import { TNavbar } from "@/utils/types";

type StateType = {
  currentNav: TNavbar.ExpendableNavItem | null;
  isHidden: boolean;
  navItems: (TNavbar.ExpendableNavItem | TNavbar.DirectNavItem)[];
  isDrawerOpen: boolean;
};

const initialState: StateType = {
  currentNav: null,
  isHidden: true,
  navItems: headerData,
  isDrawerOpen: false,
};

const Slice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setCurrentNav: (state, action: PayloadAction<TNavbar.ExpendableNavItem | null>) => {
      state.currentNav = action.payload;
    },
    hideSubBar: (state) => {
      state.isHidden = true;
    },
    showSubBar: (state) => {
      state.isHidden = false;
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openDrawer: (state) => {
      state.isDrawerOpen = true;
    },
  },
});

export const { setCurrentNav, hideSubBar, showSubBar, closeDrawer, openDrawer } = Slice.actions;
export default Slice.reducer;
