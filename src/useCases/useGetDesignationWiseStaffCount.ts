import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { userApi } from "../entity/constants/api"



const useGetDesignationWiseStaffCount = ()=>{
    const [result,setResult] = useState([])
    const fetch =async  ()=>{ 
        const data = await axiosApi.get(userApi.getDesignationWiseStaffList)
        console.log(data.data,'useGetDesignationWiseStaffCount')
        setResult(data.data) 
    }
    useEffect(()=>{
        fetch()
    },[])

    return result
}

export default useGetDesignationWiseStaffCount