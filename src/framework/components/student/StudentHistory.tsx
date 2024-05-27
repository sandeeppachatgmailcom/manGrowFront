import { useSelector } from "react-redux"
import useGetLogin from "../../../useCases/useGetLogin"
import { useRef, useState } from "react"
import { MdVerified } from "react-icons/md";
import MarkList from "./MarkList";
import WritingScoreGraph from "./WritingScoreGraph";
import CircleChartimport from "./CircleChart";
import useGetStudentsPending from "../../../useCases/useGetStudentsPending";

const StudentHistory = ()=>{
    const parentDivRef = useRef()
     useGetLogin();
        const user = useSelector((state:any)=>state.activeUser.user)
        const [scrollPosition,setScrollPosition] = useState(0)
        const [programName,setProgramName] = useState('')
        const endDate = new Date()
        endDate.setDate(endDate.getDate()+5)
        const pending = useGetStudentsPending({email:user.email,batch:user.batchId,startDate:new Date().toISOString(),endDate:endDate.toISOString()})
        console.log(pending,'pendingpendingpending')
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

    return  <div className="block w-full rounded-xl  h-[1000px]   overflow-y-scroll ">
        <div className="  rounded-lg block bg-opacity-5 P-1 m-1 w-100 ">
                <div className="flex bg-green-800 bg-opacity-5  rounded-xl h-full p-1 justify-center m-1 w-full" >
                    <CircleChartimport/>
                </div>
                <div ref={parentDivRef}   className="flex relative rounded-xl h-full     p-1 overflow-scroll justify-between m-1 w-full">
                    <div className="absolute top-10 left-2 w-20 flex items-center h-full cursor-pointer"   onClick={() => {
                            setScrollPosition(prevScrollPosition => prevScrollPosition + 30); // Update scroll position
                            }} >
                        moveLeft 
                    </div>   
                    <div  style={{ transform: `translateX(-${scrollPosition}px)` } }  className="flex w-full px-5  ">
                        <MarkList/>
                        < WritingScoreGraph taskType='listening'/>
                        < WritingScoreGraph taskType='writing'/>
                        < WritingScoreGraph taskType='OneToOne'/>
                    </div>
                        <div className="absolute top-10 right-2 w-20  flex items-center h-full cursor-pointer"   onClick={() => {
                            const rightArrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
                            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));; // Update scroll position
                            }} >
                        Right 
                    </div>
                </div>
           </div>
         
         <div className="    rounded-lg block xl:flex flex-wrap justify-between  bg-opacity-5   w-100 ">
        {user.submission &&  Object.keys(user?.submission).length>0 ?
        <>
         
         {  Object.keys(user?.submission).map((submission)=>{
            return <div className=" shadow-md  p-1 flex flex-wrap bg-gray-400 items-start    bg-opacity-5 xl:w-5/12   w-full m-1 rounded-md">
                <h1 className="font-bold m-2 " >{user?.submission[submission].program.eventName.toUpperCase()} </h1>   <br />
                    <div className="block w-full m-1 item-start bg-opacity-5 p-1 ">
                    
                        {Object.keys(user.submission[submission]).map((item)=>{
                            if(item !='program'){
                            return <div className=" shadow-md m-1 items-center w-full flex p-1 ">
                                <div className="flex w-3/12  ">
                                    <h1 className="text-sm items-center font-bold  "> {user?.submission[submission][item][0]?.taskName}</h1>
                                    {user.submission[submission][item][0]?.verified ?<div className="text-blue-600" ><MdVerified /> </div>:<div className="text-red-600" ><MdVerified /> </div> }
                                </div>
                                <div className="block w-9/12 h-10  overflow-scroll  ">
                                    <div className=" flex w-full flex-nowrap">
                                    {Object.keys(user.submission[submission][item][0]?.mark).map((mark)=>{
                                        return user.submission[submission][item][0]?.mark[mark] ? <button className={` ${buttonColor[mark]} w-8 h-8 text-small p-1 rounded-md text-white  m-1`} type="button">{mark} </button>:<button className={` ${buttonColor[mark]} w-8 h-8 text-small p-1 rounded-md text-white bg-opacity-15 text-opacity-35 m-1`} type="button">{mark} </button>   
                                         
                                    })}
                                    </div>
                                        <h1 className="text-sm items-center h-10  "> {user.submission[submission][item][0]?.comment}</h1>      
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