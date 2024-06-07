import { createSlice } from "@reduxjs/toolkit";
const multiUserSlice  = createSlice(
    {
        name:'multiUser',
        initialState:{
            show:false
        },
        reducers:{
            toggleMultiUser:(state)=>{
                state.show = !state.show;
            }
        }
    }
)

export default multiUserSlice .reducer
export const  {toggleMultiUser} = multiUserSlice .actions
