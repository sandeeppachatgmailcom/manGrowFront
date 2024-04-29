import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice"; 
import activeUser from "./activeUser";
import companyInfo from "./companyInfo";
import adminMenuSlice from "./adminMenu";


const appStore = configureStore({
    reducer:{
        theme:themeSlice,
        activeUser:activeUser,
        company:companyInfo,
        adminSubMenu:adminMenuSlice 
    }
})

export default appStore