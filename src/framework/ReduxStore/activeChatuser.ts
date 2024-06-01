import { createSlice } from "@reduxjs/toolkit";

const activeChatUser = createSlice({
    name:'activeChatUser',
    initialState:{
        user:{}
    },
    reducers:{
        updateChatUser:(state,payload)=>{
            user:state.user = payload
        }
    }
})

export default activeChatUser.reducer;
export const {updateChatUser} = activeChatUser.actions