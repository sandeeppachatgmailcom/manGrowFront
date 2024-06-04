import useGetLogin from "../../../useCases/useGetLogin"
import { useEffect, useRef, useState } from "react"
import { MdVerified } from "react-icons/md";
import MarkList from "./MarkList";
import WritingScoreGraph from "./WritingScoreGraph";

import useGetStudentsPending from "../../../useCases/useGetStudentsPending";
import useStudentProgressSummary from "../../../useCases/useStudentProgressSummary";
import CircleChart from "../graphs/CircleGraph";
import useGetUserByemail from "../../../useCases/useGetUserByemail";

const StudentHistory = ({onChane,useremail})=>{
    useEffect(()=>{
        

    },[useremail])
    const user = useGetUserByemail(useremail) 

    const parentDivRef = useRef()
    const studentProgress = useStudentProgressSummary({email:user?.email})||[]
     useGetLogin();
     const [pendingGraphData,setPendingGraphData] = useState([])      
       
        useEffect(()=>{
         if(studentProgress.length){ 
            const pending =Math.abs( studentProgress[0]?.totalPrograms.length  - Object.keys(studentProgress[0]?.submission||{}).length)||0  
            const submitted = Object.keys(studentProgress[0]?.submission||{}).length||0
            const Data =  [{name:'Pending',value : pending  } ,{name:'Compelted',value : submitted }  ]
            setPendingGraphData(Data)}
        },[studentProgress]) 
 
        const endDate = new Date()
        endDate.setDate(endDate.getDate()+5)
        const pending = useGetStudentsPending({email:user?.email,batch:user?.batchId,startDate:new Date().toISOString(),endDate:endDate.toISOString()})
        
     const buttonColor = {
        1:"bg-blue-400",
        2:"bg-blue-500",
        3:"bg-red-400",
        4:"bg-red-600",
        5:"bg-orange-300",
        6:"bg-orange-500",
        7:"bg-yellow-400",
        8:"bg-yellow-500",
        9:"bg-green-700",
        10:"bg-green-800",
        
}

    return  <div className="block w-full rounded-xl  h-[100%]   overflow-y-scroll ">
        {user?  user?.role == 'student' &&  
        <div className="  rounded-lg block bg-opacity-5 P-1 m-1 w-100 ">
                <div className="flex  bg-blue-500 bg-opacity-15   h-[250px] rounded-xl  p-1 justify-center m-1 w-full" >
                    <div className=" flex w-2/12 rounded-xl">
                    <CircleChart   data={pendingGraphData}  />  
                    </div>
                </div>
                <div ref={parentDivRef}   className="flex relative rounded-xl h-full     p-1 overflow-scroll justify-between w-full">
                    
                    <div    className="flex w-full   ">
                        <MarkList user ={user}/>
                        < WritingScoreGraph user ={user} taskType='listening'/>
                        < WritingScoreGraph user ={user} taskType='writing'/>
                        < WritingScoreGraph user ={user} taskType='OneToOne'/>
                    </div>
                    
                        
                </div>
           </div>
         :''}
         <div className="    rounded-lg block xl:flex flex-wrap justify-between  bg-opacity-5   w-100 ">
        {user?.submission &&  Object.keys(user?.submission).length>0 ?
        <>
         
         {  Object.keys(user?.submission).map((submission)=>{
            return <div className=" shadow-md  p-1 flex flex-wrap bg-gray-400 items-start    bg-opacity-5 xl:w-5/12   w-full m-1 rounded-md">
                <h1 className="font-bold m-2 " >{user?.submission[submission].program.eventName.toUpperCase()} </h1>   <br />
                    <div className="block w-full m-1 item-start bg-opacity-5 p-1 ">
                    
                        {Object.keys(user?.submission[submission]).map((item)=>{
                            if(item !='program'){
                            return <div className=" shadow-md m-1 items-center w-full flex p-1 ">
                                <div className="flex w-3/12  ">
                                    <h1 className="text-sm items-center font-bold  "> {user?.submission[submission][item][0]?.taskName}</h1>
                                    {user?.submission[submission][item][0]?.verified ?<div className="text-blue-600" ><MdVerified /> </div>:<div className="text-red-600" ><MdVerified /> </div> }
                                </div>
                                <div className="block w-9/12 h-10  overflow-scroll  ">
                                    <div className=" flex w-full flex-nowrap">
                                    {Object.keys(user?.submission[submission][item][0]?.mark).map((mark)=>{
                                        return user?.submission[submission][item][0]?.mark[mark] ? <button className={` ${buttonColor[mark]} w-8 h-8 text-small p-1 rounded-md text-white  m-1`} type="button">{mark} </button>:<button className={` ${buttonColor[mark]} w-8 h-8 text-small p-1 rounded-md text-white bg-opacity-15 text-opacity-35 m-1`} type="button">{mark} </button>   
                                         
                                    })}
                                    </div>
                                        <h1 className="text-sm items-center h-10  "> {user?.submission[submission][item][0]?.comment}</h1>      
                                </div>
                                
                            </div>
                            }
                        }) }
                    </div>
                
            </div>
        }) }
          <div className="flex h-[100px] rounded-xl  p-1 justify-center m-1 w-full" >
                    
                </div>
        </>
        :''}
    </div>
    </div>
}

export default StudentHistory