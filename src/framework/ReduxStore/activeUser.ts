import { createSlice } from "@reduxjs/toolkit";

const activeUser = createSlice({
    name: 'activeUser',
    
    initialState: {
        user: {}  
    },
    reducers: {
        logout: (state) => {
            state.user ={}
             
        },
        login: (state,actions) => {
            state.user =actions.payload   
        },
        saveUser:(state,actions)=>{
            state.user= actions.payload
        },
        setuserVerified:(state)=>{
            state.user ={
                ...state.user,
                otpVerified:true
            }
        }
    }
})

export const  {login,logout,saveUser} = activeUser.actions
export default activeUser.reducer
