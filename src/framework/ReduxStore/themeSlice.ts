import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'Theme',
    initialState: {
        Themedark: false,
        lightTheme: ' bg-white-100 text-gray-500',
        darkTheme: ' bg-gray-800 text-slate-50  ',
        theme: '',
        buttontheme:'bg-gray-800 text-white',
        border: 'border-stone-950 ',
        inputtext:''
    },
    reducers: {
        toggleTheme: (state) => {
            state.Themedark = !state.Themedark;  
            state.theme = state.Themedark ? state.darkTheme : state.lightTheme;  
            state.border=state.Themedark ? ' border-stone-950 ': ' border-stone-600 ';
            state.inputtext = state.Themedark ?'bg-gray-800 border-gray-600 text-slate-50':'bg-white-800 border-gray-600 text-white-800 '
        },
        switchDarkTheme:(state,actions)=>{
            state.Themedark = !actions.payload;  
            state.theme = state.Themedark ? state.darkTheme : state.lightTheme;  
            state.border=state.Themedark ? ' border-stone-950 ': ' border-stone-600 ';
            state.inputtext = state.Themedark ?'bg-gray-800 border-gray-600 text-slate-50':'border-gray-600 bg-white-800 text-white-800 '
        }
    }
});

export const { toggleTheme,switchDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
