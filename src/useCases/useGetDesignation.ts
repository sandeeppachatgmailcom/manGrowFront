import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { utilityApis } from "../entity/constants/api"

const  useGetDesignation =()=>{
    const [desig,setDesig] = useState()
    useEffect(()=>{
        fetchDesig()
    },[])

    const fetchDesig =async ()=>{
        const data  = await axiosApi.get(utilityApis.listAllDesignation)
        console.log(data.data)
        setDesig(data.data)
    }
    return desig;
}


export default useGetDesignation