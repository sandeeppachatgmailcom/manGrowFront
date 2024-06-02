import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios";
import { trainerApi } from "../entity/constants/api";
import { useSelector } from "react-redux";



const useGetTrainerBasedBatchSummary = ()=>{
    const [result,setResult] = useState([]);
   
    const activeUser = useSelector((state: any) => state.activeUser.user)
    const data = {designation:activeUser.email}
    useEffect(()=>{
        fetchTrainerBatchSummary()   
    },[])
    
    
    const fetchTrainerBatchSummary =async()=>{
        const result = await axiosApi.post(trainerApi.getTrainerBasedBatchSummary,data )
        setResult(result.data)
    }  
     
    return  result?result:[];
}
export default useGetTrainerBasedBatchSummary;