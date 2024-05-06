import { useSelector } from "react-redux"
import { BsPencilFill } from "react-icons/bs";
import { BsFillFloppyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import DropdownMenu from "../utilComponents/DropdownMenu";
import axiosApi from "../../../api/axios";
import { utilityApis } from "../../../api/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";



const PendingEvents = (props:any)=>{
        const [formData,setFormData] = useState<Event_Model> ()  
        const [initialState,setInitialState] = useState()     
        const [task,setTask] = useState()
        useEffect(()=>{
                setFormData(props.pending),
                setInitialState(props.pending)
        },[props.pendings])
        const getTask = async ()=>{
                const task = await axiosApi.get(utilityApis.listActiveTrainers)
                setTask(task.data)
        }
        useEffect(()=>{
                getTask()
        },[])
         
        console.log(props.pending,'props.pendingprops.pending')
        const theme = useSelector((state:any)=>state.theme.theme)
        return(
              <div className="w-100 p-4 shadow-md h-[auto] border hover:shadow-md hover:shadow-blue-500 border-gray-300 border-opacity-45  rounded-xl " >
                <div className="justify-start">
                        <h5 className="font-bold text-blue-500 text-1xl">{formData?.eventName?.toUpperCase()} </h5>
                        <h5 className="font-semibold text-blue-500 text-1xl">Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/') } </h5>
                        <div className="flex ">
                                <h5 className=" font-semibold">Start Time <input    className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                <h5 className=" font-semibold">End Time <input  className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                        </div>

                </div>
               <input className={`rounded w-full ${theme.inputtext}  text-2xl font-bold underline bg-transparent focus:outline-none focus:border-blue-500` } type="text" placeholder="Activity title"/>  
                
                
                <textarea    name="textarea" id="myTextarea" className= {`${theme.inputtext} w-full bg-transparent h-32 rounded-lg  focus:outline-none focus:border-blue-500`} placeholder="Discribe in detail......"  ></textarea>
                <div className="justify-end text-end">
                 {task? <DropdownMenu items={task}  name='task'   value={formData?.staffInCharge}/>:''}
                <button className="rounded  shadow-sm m-2 p-2 w-30 text-yellow-600" ><BsPencilFill />  </button> 
                        <button className="rounded  shadow-sm m-2 p-2 w-30 text-green-600 "><BsFillFloppyFill /> </button> 
                        <button className="rounded  shadow-sm m-2 p-2 w-30 text-red-600"><MdDelete  /> </button> 
                </div>
            </div> 
        )
    }

export default PendingEvents