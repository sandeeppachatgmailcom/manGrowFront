import { createSlice } from "@reduxjs/toolkit";

const validationSlice = createSlice({
    name:'validationSlice',
    initialState:{
        value:['writing','listening','reading','Speaking','OneToOne']
    },
    reducers:{

    }
})

export default validationSlice.reducer