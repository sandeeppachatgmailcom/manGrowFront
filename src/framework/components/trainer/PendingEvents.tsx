import { useSelector } from "react-redux"
import { BsPencilFill } from "react-icons/bs";
import { BsFillFloppyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import {  SetStateAction, useEffect, useRef, useState } from "react";
import DropdownMenu from "../utilComponents/DropdownMenu";
import axiosApi from "../../api/axios";
import { trainerApi, } from "../../../entity/constants/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";
 
import { ToastContainer, toast } from "react-toastify";
import { RxDropdownMenu } from "react-icons/rx";
import useCompareObjects from "../../../useCases/useCompareObjects";
import { PendingEventsComponent } from "../../../entity/components/trainer/pendingEvents";



const PendingEvents = (props:PendingEventsComponent) => {
        const [formData, setFormData] = useState<Event_Model & {ScheduledTaskID:string }>()
        const [initialState, setInitialState] = useState<any>()
        const [category, setCategory] = useState<any>({ })
        const [task, setTask] = useState<any>()
        const longTextRef = useRef()
        const [height,setHeight] = useState('100px')
        const [mo,setMo] = useState(false)
        const [hovertask,setHoverTask] = useState()
        useEffect(() => {
                setFormData(props?.pending as Event_Model & {ScheduledTaskID:string } ),
                setInitialState(props?.pending )
        }, [props.pending])

        
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
        const handleChangeCaterogry = (key:string,item:any)=>{
                console.log(key,item,'kkkkkkkkkkkkkkkkk')
                const tempCategory  = {
                        ...category   ,
                      [key]:{
                        ...category[key],
                        [item]:!category[key][item]
                      }
                       
                }
                setCategory(tempCategory)
                const tempFormData :any = {
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
                const result =useCompareObjects(initialState,formData) 
                if(!result){ const data = await axiosApi.post(trainerApi.saveScheduledTask,formData)
                        setFormData( data.data)    
                }
                else toast.error('no changes to update')
                
                
        }
       
         

        const theme = useSelector((state: any) => state.theme.theme)
        return (
                <div className={`${ formData && formData?.ScheduledTaskID? 'bg-blue-600 bg-opacity-10':''} overflow-hidden w-full p-4 h-[${height}] border    hover:shadow-sm hover:shadow-gray-500 border-gray-300 focus:bg-opacity-55 focus:bg-gray-600 border-opacity-45  rounded-xl `} >
                        <div className="justify-start m-2">
                        <ToastContainer/>
                                <div className="xl:flex xl:justify-between justify-between  border-b w-full  border-b-gray-300">
                                        <div className="block  xl:flex xl:w-4/6 ">
                                                <div className="block m-2 w-2/6">
                                                        <h5 className={`${theme.inputtext} font-bold`}>{formData?.eventName?.toUpperCase()} </h5>
                                                        <h5 className={`${theme.inputtext}`}>Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/')} </h5>
                                                        <br /><h5 className={`${theme.inputtext}`}>{formData?.description} </h5> 
                                                </div>
                                                <div className="flex m-2  xl:w-3/6">
                                                        <h5 className=" font-semibold">Start Time <input onChange={handleChange} name="startDateTime" value={formData?.startDateTime} className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                                        <h5 className=" font-semibold">End Date <input onChange={handleChange} name="submissionDate" value={formData?.submissionDate?.toString().split('T')[0]} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="date" /> </h5>
                                                        <h5 className=" font-semibold">End Time <input onChange={handleChange} name="endDateTime" value={formData?.endDateTime} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                                                
                                                </div>
                                                <div className="flex w-full xl:w-2/6">
                                                        {task ? <DropdownMenu items={task} name='taskID' onChange={handleChange} value={formData?.taskID} /> : ''}
                                                </div>
                                                
                                        </div>
                                        <div className="md:w-3/6  flex justify-end ">
                                               
                                              <button onClick={()=>height=='100px'? setHeight('full'):setHeight('100px') }>  <RxDropdownMenu style={{height:'40px' , width:'40px'}} /> </button>  
                                        </div>
                                </div>
                        </div>
                        <div className=" xl:flex  m-2">
                                <div className="  flex flex-col xl:w-4/6 ">
                                        <input name="dayTitle" onChange={handleChange}  value={formData?.dayTitle} className={`rounded w-full  font-bold    bg-transparent focus:outline-none focus:border-blue-500`} type="text" placeholder="Activity title" />
                                        <br />
                                        <textarea ref={longTextRef} onChange={handleChange} value={formData?.dayDiscription as string} name="dayDiscription" id="myTextarea" className={`h-100    w-full bg-transparent h-32 rounded-lg  focus:outline-none focus:border-blue-500`} placeholder="Discribe in detail......"  ></textarea>
                                </div>
                                {mo?<div className="xl:w-2/6 bg-blue-700 bg-opacity-25 rounded-xl flex overflow-y-scroll h-[200px] flex-wrap  justify-start border-opacity-25">
                                {hovertask?<div className="p-3 ">
                                        <h1 className="font-semibold " > Task Detail </h1> <br />
                                        <h1>Task: {hovertask.taskName}</h1>
                                        <h1>Discription:  {hovertask.taskDiscription}</h1>
                                        <h1>Type: {hovertask.taskType}</h1>
                                        <h1>Validated By {hovertask.validateBy}</h1>
                                        
                                </div>:""}

                        </div>
                        :
                                <div className="xl:w-2/6  flex overflow-y-scroll h-[200px] flex-wrap  justify-start border-opacity-25">
                                       
                                        {category && Object.keys(category).length?( 
                                                 Object.keys(category).map((key) => (
                                                <div className="flex flex-wrap  " key={key}>
                                                        {Object.keys(category[key]).length ? (
                                                              Object.keys(category[key]).map((item) => <div onClick={()=>{handleChangeCaterogry(key,item)}} className={`${category[key][item]?'border-2  text-white  bg-blue-500   ':'border-2  border-blue-500 text-blue-500'} w-20 justify-center shadow-sm flex text-center p-2 w-30 h-10 uppercase    m-1 cursor-pointer  rounded-lg`}   key={item}>{item}</div>)
                                                        ) : (
                                                                ''
                                                        )}
                                                       
                                                </div>
                                        ))  
                                        ):''}  
                                </div>}

                                 

                        </div> 
                        
                                <div className="justify-between text-end flex w-full   m-2  ">
                                       <div className="flex w-4/6 ">
                                       <div className="flex w-full ">
                                                        {formData?.matchedTasks? <div>
                                                                {formData?.matchedTasks?.map((task)=>{
                                                                return <button onMouseLeave={()=>{setMo(false)}} onMouseOver={()=>{setMo(true);setHoverTask(task)}} className={` hover:transform-cpu align-text-bottom overflow-hidden  hover:transition-shadow tra text-center rounded-full h-10 p-2 m-1 border border-gray-400 border-opacity-55 `}>
                                                                        {task.taskName}
                                                                        <div> {task.taskDiscription} </div>
                                                                         </button>
                                                                })}
                                                        </div>:''  }
                                                </div>
                                       </div>
                                        <div className="flex w-2/6 justify-end">
                                        <button className="rounded  shadow-sm m-2 p-4 w-30 hover:border hover:border-blue-400  hover:text-blue-500 h-10" ><BsPencilFill />  </button>
                                        <button onClick={handleSaveClick} className="rounded  shadow-sm m-2 p-4 w-30  hover:border hover:border-blue-400 hover:text-blue-500 h-10 "><BsFillFloppyFill /> </button>
                                        <button className="rounded  shadow-sm m-2 p-4 w-30  hover:border hover:border-blue-400 hover:text-blue-500 h-10"><MdDelete /> </button>
                                        </div>
                                </div> 
                            
                </div>
        )
}

export default PendingEvents