import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavItemType } from "@/utils/types";
import headerData from "@/data/header.json";

type StateType = {
  currentNav: NavItemType | null;
  isHidden: boolean;
  navItems: NavItemType[];
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
    setCurrentNav: (state, action: PayloadAction<NavItemType | null>) => {
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
