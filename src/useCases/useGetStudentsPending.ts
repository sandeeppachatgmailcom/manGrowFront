import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { studentApi } from "../entity/constants/api"

const useGetStudentsPending = (data: { email:string; startDate: Date ; endDate:Date; batch:string })=>{
const [task,setTask] = useState()
console.log(data,'this is my data')
    const fetchTask =async  ()=>{
        console.log(data,'data to fetch')
          const task = await axiosApi.post(studentApi.getStudentsTask,data)
          if (task.data){
              console.log(task.data,'task data ')
              setTask(task.data)
          }
      }

      useEffect(()=>{
           fetchTask()
      },[])

      return task
}

export default useGetStudentsPending