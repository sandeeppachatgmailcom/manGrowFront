import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import ChatBox from "../../framework/components/chatBox/chatBox";
import StudentsPending from "../../framework/components/student/StudentsPending";
import { Home_Page } from "../../entity/pages/homePage";
import StudentHistory from "../../framework/components/student/StudentHistory";
import MarkList from "../../framework/components/student/MarkList";
import MyCalender from "../../framework/components/trainer/MyCalender";
import useGetLogin from "../../useCases/useGetLogin";
import { useNavigate } from "react-router-dom";


const HomePage = (_props: Home_Page) => {
    const navigate = useNavigate()
    useGetLogin('manGrowstudent')
    const [menu,setMenu] = useState(1)
    const darkTheme = useSelector((state: any) => state.theme)
    const activeUser = useSelector((state: any) => state.activeUser.user)
    
    const divlign = '   rounded  mt-1 '

    return (
        <div className="xl:flex block h-[100%] overflow-scroll   w-full p-2">
            <div className={`xl:w-2/12 w-full  ${darkTheme.theme + divlign} xl:h-[100%]  border-gray-300   rounded-xl mt-2 p-2`}>
                <div className="bg-transparent " >
                    <Profile />
                </div>
                <div className="">
                     <MyCalender   />   
                </div>
            </div>
            <div className={`block xl:w-7/12   w-full h-[100%]   rounded-xl m-2 mt-2 p-2  ${darkTheme.theme} ${divlign} `}>
            {menu == 1 ?  <h1 className="text-5xl">HISTORY</h1> : <h1 className="text-5xl">PENDING</h1> } 
                <div className=" flex h-20 w-full   justify-end bg-transparent  p-4 rounded-md ">
                    <button onClick={()=>{setMenu(0)}} className=" h-[50px] font-semibold shadow-md  rounded-md   w-32 bg-blue-700 bg-opacity-15 m-2">PENDINGS </button>
                    <button onClick={()=>{setMenu(1)}} className=" h-[50px] font-semibold shadow-md  rounded-md   w-32 bg-blue-700 bg-opacity-15 m-2 ">HISTORY </button>
                </div>
                <div className=" block  overflow-scroll justify-center h-[85%]    rounded-md ">
                
                {menu==0 ?<StudentsPending startDate={new Date()} email={activeUser.email} endDate={new Date()} />:''}
                {menu==1 ?<StudentHistory  useremail={activeUser.email} />:''}
               <div className="h-[100px]">

               </div>
                </div>
                
            </div>
            <div className={`xl:w-3/12 w-full  ${darkTheme.theme} ${divlign} xl:h-[100%]      border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
            <ChatBox setStudent ={()=>{}} />
                
            </div>
        </div>
    )
}

export default HomePage