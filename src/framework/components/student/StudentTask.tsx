import { useSelector } from "react-redux" 
import {  useEffect, useRef, useState } from "react";
import DropdownMenu from "../utilComponents/DropdownMenu";
import axiosApi from "../../api/axios";
import { studentApi, trainerApi, } from "../../../entity/constants/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";
import { ToastContainer, toast } from "react-toastify";
import VoiceRecorder from "../trainer/VoiceRecorder";
import VideoMaker from "../trainer/VideoMaker";
//import TextEditor from "../trainer/TextEditor";
import { FaExpand } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import useCompareObjects from "../../../useCases/useCompareObjects";
import { Task_model } from "../../../entity/response/task_model";
import SubmiSsionModal from "./SubmiSsionModal";
import { UserEntity_Model } from "../../../entity/response/userModel";
import { RxDropdownMenu } from "react-icons/rx"; 
import { FcCollapse } from "react-icons/fc";

const StudentTask = (props: any) => {
        const [formData, setFormData] = useState<Event_Model & {ScheduledTaskID:string }>()
        const user :UserEntity_Model = useSelector((state:any)=>state.activeUser.user)
        const [initialState, setInitialState] = useState()
        const [category, setCategory] = useState<any>({ })
        const [subMission,setSubmission] = useState(false)
        const [task, setTask] = useState()
        const [selectedTask,setSelectedTask] = useState()
        const longTextRef = useRef()
        const [height,setHeight] = useState('h-[100px]')
        const [studentSubMission,setStudentSubmission] = useState()
        useEffect(() => {
                setFormData(props.pending),
                setInitialState(props.pending)
        }, [props.pendings])

        useEffect(()=>{
                setTask(props.task)
        },[props.task])

        useEffect(()=>{
                console.log(formData,'forData')
        },[height])
        useEffect(()=>{
            user.submission? setStudentSubmission(user.submission):setStudentSubmission({

            })      
        },[user])

        useEffect(()=>{
                console.log(selectedTask,'selectedTaskselectedTask')
        },[selectedTask])


        
        
        
        
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
                console.log( formData?.submission[0]?.Speaking)
        },[formData])
        

       
        const handleSaveClick =async  ()=>{
                console.log(initialState,formData,useCompareObjects(initialState,formData),'mic testing ')
                console.log(validateObj.validateObject(initialState,formData),'validateObj.validateObject(initialState,formData)')
                const result =validateObj.validateObject(initialState,formData) 
                if(!result){ const data = await axiosApi.post(trainerApi.saveScheduledTask,formData)
                        setFormData( data.data)    
                }
                else toast.error('no changes to update')
                
                
        }
        const submitTask =async ()=>{
                console.log(formData, formData?.audioLink?.length , formData?.videolink?.length , formData?.WriteTask?.length , 'formData.audioLink && formData.videolink')
                
                
                const submitTask =  {
                        submissionId:'' ,
                        studentId:user.email,
                        eventId:formData?.eventId ,
                        scheduledTaskId:formData?.ScheduledTaskID,
                        matchedTasks:formData?.matchedTasks
                        
                } 
                console.log(submitTask,'submitTasksubmitTasksubmitTasksubmitTask')
                if(submitTask?.WriteTask?.length ||  submitTask?.audioLink?.length || submitTask?.Speaking?.length){
                        const submit = await axiosApi.post(studentApi.sumbitTask,submitTask)
                   console.log(submit),'submitsubmitsubmitsubmit'
                }
                else{
                        alert('where you are going')
                }
        }
       
         

        const theme = useSelector((state: any) => state.theme.theme)
        return (
                <div className={`   ${ formData && formData?.ScheduledTaskID? 'bg-blue-300  text-blue-400  shadow-gray-100 bg-opacity-5':''} w-full  ${height} overflow-scroll   hover:shadow-sm hover:shadow-gray-500   focus:bg-opacity-55 focus:bg-gray-600 border-opacity-45  rounded-xl `} >
                        {subMission? <SubmiSsionModal program = {formData} ScheduledTaskID={formData?.ScheduledTaskID}  studentSubMission={studentSubMission} task={selectedTask} onclose={setSubmission} />:''}
                                <div className="justify-start p-2 m-2">
                                <ToastContainer/>  
                                        <div className="xl:flex flex xl:justify-between justify-between shadow-md p-2  w-full   ">
                                                <div className="block md:flex xl:w-5/6 p-2  "> 
                                                        <div className="block m-2  w-2/6">        
                                                                <h5 className={`${theme.inputtext} font-bold`}>{formData?.eventName?.toUpperCase()} </h5>
                                                                <h5 className={`${theme.inputtext}`}>Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/')} </h5>
                                                        
                                                        </div>
                                                        <div className="flex m-2  xl:w-2/6">
                                                                <h5 className=" font-semibold">Start Time <input readOnly onChange={handleChange} name="startDateTime" value={formData?.startDateTime} className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                                                <h5 className=" font-semibold">End Date <input readOnly onChange={handleChange} name="endDateTime" value={formData?.submissionDate?.toString().split('T')[0] } className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="date" /> </h5>
                                                                <h5 className=" font-semibold">End Time <input readOnly onChange={handleChange} name="endDateTime" value={formData?.endDateTime} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                                                        </div>
                                                        <div className="flex w-full xl:w-1/6">
                                                                {task ? <DropdownMenu items={task} name='taskID' onChange={handleChange} value={formData?.taskID} /> : ''}
                                                        </div>
                                                </div>
                                                <div className="w-1/6 md:w-3/6 h-100 p-1 flex justify-end border-green-600">
                                                <button onClick={()=>height=='h-[100px]'? setHeight('h-full'):setHeight('h-[100px]') }> {height=='h-[100px]' ?<RxDropdownMenu style={{height:'30px' , width:'30px'}} />  : <FcCollapse    style={{height:'20px' , width:'20px'}} />} </button>  
                                                </div>
                                        </div>
                                </div>
                        
                                <div className="justify-start p-2 m-2  ">                                      
                                        <input name="dayTitle" readOnly  onChange={handleChange}  value={formData?.dayTitle} className={`rounded w-full  font-bold    bg-transparent focus:outline-none focus:border-blue-500`} type="text" placeholder="Activity title" />
                                        <h5 className={`${theme.inputtext}`}>{formData?.description} </h5> <br />
                                        <label     className={`bg-transparent rounded-lg w-full focus:outline-none focus:border-blue-500`} > {formData?.dayDiscription as string} </label>
                                </div>
                                 
                                <div className="block p-2   ">
                                        
                                        {formData?.matchedTasks?.map((task: Task_model) => (
                                                        <div
                                                        key={task.taskId} // Added key prop for proper list rendering
                                                        className="p-2 justify-between rounded-md shadow-md m-1 flex"
                                                        >
                                                        <div className="flex">
                                                        <div className="block">
                                                                <div className="flex">
                                                                <h1 className="font-bold">{task.taskName}</h1>
                                                                <h1 className="font-bold"> {studentSubMission?.[formData.ScheduledTaskID]?.[task.taskId] && '['+ (studentSubMission?.[formData.ScheduledTaskID][task.taskId].length ) +'submission ]' }</h1>
                                                                </div>
                                                                <br />
                                                                {task.taskType && <small>{task.taskType}</small>}
                                                        </div>
                                                        <h1 className="font-semibold">{task.taskDiscription}</h1>
                                                        </div>
                                                        <div className="flex p-2">
                                                        {task.possiblePostpone > 0 && (
                                                                <button className="m-1 shadow-lg bg-blue-500 rounded-md p-2 bg-opacity-15">
                                                                POSTPONE
                                                                </button>
                                                        )}
                                                        <button
                                                                onClick={() => {
                                                                setSubmission(true);
                                                        const selectedTask =    studentSubMission &&
                                                                                studentSubMission[formData.ScheduledTaskID] &&
                                                                                studentSubMission[formData.ScheduledTaskID][task.taskId] &&
                                                                                studentSubMission[formData.ScheduledTaskID][task.taskId].length ?
                                                                                studentSubMission[formData.ScheduledTaskID][task.taskId][0] :
                                                                                task;

                                                                setSelectedTask(selectedTask);
                                                                }}
                                                                className="m-1 shadow-lg bg-blue-500 rounded-md p-2 bg-opacity-15 w-20 font-bold"
                                                        >
                                                                OPEN
                                                        </button>
                                                        </div>
                                                        </div>
                                                        ))}

                                </div>

                                 
                                 
                                <div className=" flex w-full  p-3  justify-end">
                                        <button className="button font-semibold m-1   border p-3 rounded-md text-white w-20 bg-gray-500"> RESET </button>
                                        <button onClick={submitTask} className="button m-1 font-semibold  border p-3 rounded-md text-white w-20 bg-blue-500"> SUBMIT </button>
                                </div> 

                                 
                            
                </div>
        )
}

export default StudentTask