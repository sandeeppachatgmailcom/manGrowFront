import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { trainerApi } from "../entity/constants/api"

const useWeeklyStudentsDetails=()=>{
    const [result,setResult] = useState()

    const fetchuWeeklyStudentsDetails= async ()=>{
        try {
            const data:{Week:string,students:number} = await axiosApi.get(trainerApi.getWeeklyStudentssummary)
    
        const temp = data?.data?.map((item:any)=>{ return {Week:item?._id,students:item?.count}})
        console.log(temp,data?.data,'++++++++++++++++++++++++++++++++++++++++++++++++++')

        setResult(temp)
    } catch (error) {
            
        }
    }
    
    useEffect(()=>{
        fetchuWeeklyStudentsDetails()
    },[])

    return result
}

export default useWeeklyStudentsDetails 