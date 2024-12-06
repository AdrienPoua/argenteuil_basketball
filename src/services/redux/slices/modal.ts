import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactElement } from "react";

type StateType = {
  open: boolean;
  content: ReactElement | null;
};

const initialState: StateType = {
  open: false,
  content: null,
};

const Slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
    setContent: (state, action: PayloadAction<ReactElement | null>) => {
      state.content = action.payload;
    },
  },
});

export const { open, close, setContent } = Slice.actions;
export default Slice.reducer;
