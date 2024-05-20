import { useEffect } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import ChatBox from "../../framework/components/chatBox/chatBox";
import StudentsPending from "../../framework/components/student/StudentsPending";
// import MantineCalendar from "../../framework/components/trainer/Calender";
import { Home_Page } from "../../entity/pages/homePage";


const HomePage = (_props: Home_Page) => {
    const darkTheme = useSelector((state: any) => state.theme)


    const activeUser = useSelector((state: any) => state.activeUser.user)
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = '   rounded  mt-1 '

    return (
        <div className="md:flex w-full ">

            <div className={`xl:w-1/6 md:w-2/6 sm:w-full  ${darkTheme.theme + divlign}   border-gray-300   rounded-xl mt-2 p-2`}>
                <div className="bg-transparent " >
                    <h6 className="font-bold text-2xl  text-orange-500 ">Student</h6>
                    <Profile />
                </div>
                <div className="bg-transparent ">
                    {/* <MantineCalendar/> */}
                    {/* <Calendar defaultView='month' onChange={onChange} value={value} />   */}
                </div>
            </div>
            <div className={`block xl:w-4/6 h-full w-full overflow-scroll   ${darkTheme.theme} ${divlign} `}>
                <StudentsPending startDate={new Date()} email={activeUser.email} endDate={new Date()} />
            </div>
            <div className={`xl:w-1/6 md:w-1/6 sm:w-full  bg-blue-800 bg-opacity-5   border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox />
                {/* <SingleChat nameObj ={{name:'chandhini'}}/> */}
            </div>
        </div>
    )
}

export default HomePage