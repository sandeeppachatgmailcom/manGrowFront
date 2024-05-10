import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import Calendar from 'react-calendar'
// //import 'react-calendar/dist/Calendar.css';
// import Typing from "../../framework/components/task/TaskTyping";  
// import AudioTask from "../../framework/components/task/audioTask"; 
import ChatBox from "../../framework/components/chatBox/chatBox";
import StudentsPending from "../../framework/components/student/StudentsPending"; 

const HomePage = () => {
    const darkTheme = useSelector((state:any) => state.theme) 

    const [value, onChange] = useState(new Date());
    const activeUser = useSelector ((state:any)=>state.activeUser.user)
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = '   rounded  mt-1 '

    return (
        <div  className="md:flex w-full ">

            <div className={`xl:w-1/6 md:w-2/6 sm:w-full  ${darkTheme.theme + divlign} bg-opacity-30  border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`}>
                <div >
                <h6 className="font-bold text-2xl text-orange-500 ">Student</h6>
                    <Profile />
                </div>
                <div className="bg-transparent ">
                      <Calendar defaultView= 'month' onChange={onChange} value={value} />  
                     
                </div>
            </div>
            <div className={`block xl:w-4/6 h-full w-full overflow-hidden   ${darkTheme.theme} ${divlign} `}>
                <StudentsPending startDate={new Date()} email={activeUser.email} endDate={new Date()} />
            </div>
            <div className={`xl:w-1/6 md:w-1/6 sm:w-full ${darkTheme.theme + divlign} border border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox/>
                {/* <SingleChat nameObj ={{name:'chandhini'}}/> */}

            </div>

        </div>
    )
}

export default HomePage