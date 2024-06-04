import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { studentApi } from "../entity/constants/api"

const useGetStudentsPending = (data: { email:string; startDate: Date ; endDate:Date; batch:string })=>{
const [task,setTask] = useState()

    const fetchTask =async  ()=>{
        
          const task = await axiosApi.post(studentApi.getStudentsTask,data)
          if (task.data){
              
              setTask(task.data)
          }
      }

      useEffect(()=>{
           fetchTask()
      },[])

      return task
}

export default useGetStudentsPending