import { useEffect, useState } from 'react';
import { StudentsPending_Component } from '../../../entity/components/students/studentsPending';
import { useSelector } from 'react-redux';
import axiosApi from '../../api/axios';
import { studentApi } from '../../../entity/constants/api';
import PendingEvents from '../trainer/PendingEvents';
import StudentTask from './StudentTask';
 


  




const StudentsPending:StudentsPending_Component = ( ) => {
   const [formData,setFormData] = useState() 
   const user = useSelector((state:any) => state.activeUser.user)
   const data = {
    email:user.email,
    startDate: new Date('2024/04/01'),
    endDate: new Date('2024/05/30'),
    batch:user.batchId
   }
   
    const fetchTask =async  ()=>{
        const task = await axiosApi.post(studentApi.getStudentsTask,data)
        if (task.data){
            console.log(task.data,'task data ')
            setFormData(task.data)
        }
    }
    useEffect(()=>{
        fetchTask();
    },[user])
   return (
    <div className="student-pending    rounded-lg  h-100 bg-opacity-10 px-4 py-2 w-100 ">
      {formData && formData.map((item)=>{
        return (<div key={item.ScheduledTaskID} className='   m-2 rounded-lg '>
                <StudentTask pending = {item} />
        </div>)
      })}
    </div>
  );
};

export default StudentsPending;
 