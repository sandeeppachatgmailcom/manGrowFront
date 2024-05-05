import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import Calendar from 'react-calendar'
//import 'react-calendar/dist/Calendar.css';
import Typing from "../../framework/components/task/TaskTyping";
import AudioTask from "../../framework/components/task/audioTask";
import ChatBox from "../../framework/components/chatBox/chatBox";
import SingleChat from "../../framework/components/header/SingleChat";
import TrainerMenuPanel from "../../framework/components/trainer/TrainerMenuPanel";
import PendingEvents from "../../framework/components/trainer/PendingEvents";

const TrainerHomePage = () => {
    const darkTheme = useSelector((state:any) => state.theme) 
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = '   rounded  mt-1 '

    return (
        <div  className={`xl:flex md:flex lg:flex sm:block content-start mx-auto h-100 opacity-90 ${darkTheme.theme}`}>

            <div className={`xl:w-1/6 md:w-2/6 sm:w-full  ${darkTheme.theme + divlign} border border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`}>
                <div >
                <h6 className="font-bold text-2xl text-orange-500 ">Trainer</h6>
                    <Profile />
                </div>
                <div className="bg-transparent ">
                      <Calendar defaultView= 'month'  value={value} />  
                     
                </div>
            </div>
            <div className={`block h-100 xl:w-4/6 xl:m-1 xl:mt-2  sm:w-full md-w-full   ${darkTheme.theme + divlign}`}>
                <TrainerMenuPanel/> 
                <PendingEvents/>
                <Typing/>
                <AudioTask/>
            </div>
            <div className={`xl:w-1/6 md:w-2/6 sm:w-full ${darkTheme.theme + divlign} border border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox/>
                <SingleChat nameObj ={{name:'chandhini'}}/>  

            </div>

        </div>
    )
}

export default TrainerHomePage