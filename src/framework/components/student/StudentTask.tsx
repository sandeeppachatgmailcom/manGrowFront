import { useSelector } from "react-redux"
import { BsPencilFill } from "react-icons/bs";
import { BsFillFloppyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import {  useEffect, useRef, useState } from "react";
import DropdownMenu from "../utilComponents/DropdownMenu";
import axiosApi from "../../../interfaces/api/axios";
import { trainerApi, } from "../../../interfaces/api/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";
import { validateObj } from "../../../interfaces/utils/validateObject";
import { ToastContainer, toast } from "react-toastify";
import { ReactMic } from 'react-mic';
import VoiceRecorder from "../trainer/VoiceRecorder";
import VideoMaker from "../trainer/VideoMaker";



const StudentTask = (props: any) => {
        const [formData, setFormData] = useState<Event_Model & {ScheduledTaskID:string }>()
        const [initialState, setInitialState] = useState()
        const [category, setCategory] = useState<any>({ })
        const [task, setTask] = useState()
        const longTextRef = useRef()
        useEffect(() => {
                setFormData(props.pending),
                setInitialState(props.pending)
        }, [props.pendings])

        
        useEffect(()=>{
                setTask(props.task)
        },[props.task])


       
         
        const handleChange = (e)=>{
                const {name,value} = e.target;
                console.log(name,value)
                const temp:any = {
                        ...formData,
                        [name]:value
                }
                setFormData(temp)
                 
        } 
        const handleChangeCaterogry = (key,item)=>{
                
                const tempCategory = {
                        ...category,
                      [key]:{
                        ...category[key],
                        [item]:!category[key][item]
                      }
                       
                }
                setCategory(tempCategory)
                const tempFormData = {
                        ...formData,
                        audience:tempCategory
                }
                setFormData(tempFormData)
        }
        useEffect(()=>{
                setCategory(formData?.audience)
                console.log(formData,'formData')
        },[formData])
        

       
        const handleSaveClick =async  ()=>{
                console.log(initialState,formData,validateObj.validateObject(initialState,formData),'mic testing ')
                console.log(validateObj.validateObject(initialState,formData),'validateObj.validateObject(initialState,formData)')
                const result =validateObj.validateObject(initialState,formData) 
                if(!result){ const data = await axiosApi.post(trainerApi.saveScheduledTask,formData)
                        setFormData( data.data)    
                }
                else toast.error('no changes to update')
                
                
        }
       
         

        const theme = useSelector((state: any) => state.theme.theme)
        return (
                <div className={`${ formData && formData?.ScheduledTaskID? 'bg-gray-600 bg-opacity-10':''} w-full p-4 h-[auto] border    hover:shadow-sm hover:shadow-gray-500 border-gray-300 focus:bg-opacity-55 focus:bg-gray-600 border-opacity-45  rounded-xl `} >
                        <div className="justify-start m-2">
                        <ToastContainer/>
                                <div className="xl:flex xl:justify-between justify-between  border-b w-full  border-b-gray-300">
                                        <div className="block xl:flex xl:w-4/6 ">
                                                <div className="block m-2 xl:w-1/6">
                                                        <h5 className={`${theme.inputtext} font-bold`}>{formData?.eventName?.toUpperCase()} </h5>
                                                        <h5 className={`${theme.inputtext}`}>Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/')} </h5>
                                                        <h5 className={`${theme.inputtext}`}>{formData?.description} </h5>
                                                </div>
                                                <div className="flex m-2  xl:w-2/6">
                                                        <h5 className=" font-semibold">Start Time <input onChange={handleChange} name="startDateTime" value={formData?.startDateTime} className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                                        <h5 className=" font-semibold">End Time <input onChange={handleChange} name="endDateTime" value={formData?.endDateTime} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                                                </div>
                                                <div className="flex w-full xl:w-1/6">
                                                        {task ? <DropdownMenu items={task} name='taskID' onChange={handleChange} value={formData?.taskID} /> : ''}
                                                </div>
                                        </div>
                                </div>
                        </div>
                        <div className=" xl:flex  m-2">
                                <div className=" flex flex-col w-full ">
                                        <input name="dayTitle" readOnly  onChange={handleChange}  value={formData?.dayTitle} className={`rounded w-full  font-bold    bg-transparent focus:outline-none focus:border-blue-500`} type="text" placeholder="Activity title" />
                                        <br />
                                        <label     className={`bg-transparent rounded-lg w-full focus:outline-none focus:border-blue-500`} > {formData?.dayDiscription as string} </label>
                                       
                                </div>
                                 
                                </div>
                                 <div className="justify-start   block w-full   m-2  ">
                                    <h1 className="text-blue-500 font-semibold">WRITING </h1>
                                    <VoiceRecorder name='audioLink' onChange ={handleChange} value={formData?.audioLink} />
                                    <div className=" flex border w-full border-green-600">
                                 <VideoMaker/>
                                 </div>
                                    <textarea    ref={longTextRef} onChange={handleChange} value={formData?.dayDiscription as string} name="dayDiscription" id="myTextarea" className={`h-100    w-full bg-transparent border h-32 rounded-lg w-full  focus:outline-none focus:border-blue-500`} placeholder="Discribe in detail......"  ></textarea>
                          
                                        <button className="rounded  shadow-sm m-2 p-4 w-30 hover:border hover:border-blue-400  hover:text-blue-500 h-10" ><BsPencilFill />  </button>
                                        <button   className="rounded  shadow-sm m-2 p-4 w-30  hover:border hover:border-blue-400 hover:text-blue-500 h-10 "><BsFillFloppyFill /> </button>
                                        <button className="rounded  shadow-sm m-2 p-4 w-30  hover:border hover:border-blue-400 hover:text-blue-500 h-10"><MdDelete /> </button>
                                </div>  
                                <div>
                                

                                </div>
                            
                </div>
        )
}

export default StudentTask