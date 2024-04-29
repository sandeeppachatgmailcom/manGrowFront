import { createSlice } from "@reduxjs/toolkit";

const adminMenuSlice = createSlice(
    {
        name:'adminSubmenu',
        initialState:{
            menuName:'profile'
        },
        reducers:{
            setMenu:(state,action)=>{
                state.menuName = action.payload
            }
        }
    }
)

export default adminMenuSlice.reducer
export const {setMenu} = adminMenuSlice.actions;