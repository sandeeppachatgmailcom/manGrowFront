import axios from "axios"
import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { userApi, utilityApis } from "../entity/constants/api"

const useGetUserByemail = (useremail)=>{

    const [result,setResult] =useState()
    useEffect(()=>{
        fetch()
    },[useremail])
    const fetch = async ()=>{
        console.log(useremail,'input email')
        const out = await axiosApi.post(utilityApis.getuserDetailsByEmail,{email:useremail})
        setResult(out.data)
        console.log(out.data,'outttttttttttttttttttttttttttt')

    }
    return result;
}

export default useGetUserByemail