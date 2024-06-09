import { Suspense, lazy, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import ChatBox from "../../framework/components/chatBox/chatBox";
import TrainerMenuPanel from "../../framework/components/trainer/TrainerMenuPanel";
import PendingEvents from "../../framework/components/trainer/PendingEvents";
import axiosApi from "../../framework/api/axios";
import { trainerApi, utilityApis } from "../../entity/constants/api";
import { TrainerHome_Page } from "../../entity/pages/TrainerHomePage";
const TrainelazyrDashBoard =lazy(()=>import ("../../framework/components/trainer/TrainerDashBoard")) 
const StudentLazyDashBoard = lazy(()=> import("../../framework/components/student/StudentHistory"))



import 'react-calendar/dist/Calendar.css';
import MyCalender from "../../framework/components/trainer/MyCalender";
import useGetLogin from "../../useCases/useGetLogin";

const TrainerHomePage = (_props: TrainerHome_Page) => {
    const [studentDashBoard,setStudentDashBoard] = useState({})
    const darkTheme = useSelector((state: any) => state.theme)
    const user = useSelector((state: any) => state.activeUser.user)
    const [pending, setPending] = useState([])
    const [task, setTask] = useState()
    const [seletedMenu, setSelectedMenu] = useState('All')
    const [fullMenu, setFullMenu] = useState([])
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30);
    useGetLogin('manGrowtrainer')

    useEffect(()=>{
        
    },[studentDashBoard])
    const data = {
        email: user.email,
        startDate: new Date(),
        endDate: endDate.toISOString().split('T')[0]
    }
    const [value, onChange] = useState(new Date());
    useEffect(() => {
    }, [darkTheme])
    const divlign = ' rounded  mt-1 '

    const getPending = async () => {

        const pending = await axiosApi.post(trainerApi.getPending, data)
        
        
        setPending(pending.data || [])
        setFullMenu(pending.data)
    }

    useEffect(() => {
        getPending()
        getTask()
    }, [])
    const getTask = async () => {
        const task = await axiosApi.get(utilityApis.listAllTasks)
        const data = task.data.map((item: any) => {
            return { name: item.taskName, id: item.taskId }
        })
        setTask(data)
    }
    const handleFilter = () => {

        if (seletedMenu == 'All') {
            setPending(fullMenu)
        }
        else if (seletedMenu === 'pending') {
            const templist = fullMenu?.filter((item) => {
                if (!item.ScheduledTaskID && !item.verified) return item
            })
            setPending(templist)
        }
        else if (seletedMenu == 'Approval') {
            const templist = fullMenu?.filter((item) => {
                if (item?.type == 'submission') return item
            })
            setPending(templist)
        }
        else if (seletedMenu == 'rate') {
            const templist = fullMenu?.filter((item) => {
                if (item?.type == 'taskCreation') return item
            })
            setPending(templist)
        }
        else if (seletedMenu == 'dashBoard') {
        }
    }
    useEffect(() => {
        handleFilter()
        setStudentDashBoard({status:false})
    }, [seletedMenu])





    return (
        <div className={`xl:flex     sm:block overflow-scroll content-start mx-auto h-[100%] opacity-90 ${darkTheme.theme}`}>

            <div className={`xl:w-2/12 w-full  ${darkTheme.theme + divlign} xl:h-[100%]  border-gray-300   rounded-xl mt-2 p-2`}>
                <div className="bg-transparent " >
                   
                    <Profile />
                </div>
                <div className="flex w-full">
                     <MyCalender   />   
                </div>
            </div>
            <div className={`block xl:w-7/12 m-1 p-1  h-[100%]  w-full overflow-hidden   ${darkTheme.theme} ${divlign} `}>
                <div className={`block w-full bg-transparent h-[10%] overflow-hidden `}>
                    <TrainerMenuPanel setSelectedMenu={setSelectedMenu} />
                </div>


                {!(seletedMenu == 'dashBoard') ?
                    <div className={`flex flex-col    w-full  overflow-y-scroll h-[95%]   overflow-x-hidden rounded-xl    xl:mt-2 `}>
                        {pending && pending.map((pending: any) => {
                            return <>
                                <PendingEvents task={task} pending={pending} />
                            </>
                        })}
                    </div>
                    :<div className={`flex flex-col    w-full  overflow-y-scroll h-[95%]   overflow-x-hidden rounded-xl    xl:mt-2 `}>
                        <Suspense fallback={<div>Loading......</div>}>
                            {studentDashBoard.status? <StudentLazyDashBoard onChane={setStudentDashBoard} useremail = {studentDashBoard.user}/> : <TrainelazyrDashBoard/>}
                        </Suspense>
                    </div>
                }
                 
            </div>
            <div className={`xl:w-3/12  h-[100%] w-full ${darkTheme.theme + divlign} bg-blue-800 bg-opacity-5 m-1  border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox SetStudent ={setStudentDashBoard} />

            </div>

        </div>
    )
}

export default TrainerHomePage