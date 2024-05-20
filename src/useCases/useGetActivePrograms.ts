import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { utilityApis } from "../entity/constants/api"

const useGetActivePrograms =()=>{
   const [prorams,setPrograms] = useState()
   useEffect(()=>{
    fetcd() 
   },[])

    const fetcd =async ()=>{
    const daya =  await axiosApi.get(utilityApis.listActiveEvents)
    setPrograms(daya.data)
   }

   return prorams
}

export default useGetActivePrograms