import { createSlice } from '@reduxjs/toolkit';
import { AdminMenuState } from '../../entity/StateStore/adminMenu';


const initialState: AdminMenuState = {
  menuName: 'profile',
};

const adminMenuSlice = createSlice({
  name: 'adminSubmenu',
  initialState,
  reducers: {
    setMenu: (state: AdminMenuState, action: { payload: string }) => {
      state.menuName = action.payload;
    },
  },
});

export default adminMenuSlice.reducer;
export const { setMenu } = adminMenuSlice.actions;
