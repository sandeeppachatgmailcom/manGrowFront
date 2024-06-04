import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import Calendar from 'react-calendar'
//import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';
import ChatBox from "../../framework/components/chatBox/chatBox";
import AdminSubmenu from "../../framework/components/Admin/AdminMenuBar";
import AdminContent from "../../framework/components/Admin/AdminContent";
import ApproveStaff from "../../framework/components/Admin/StaffApproval";
import Events from "../../framework/components/Admin/Events";
import ManageTaskComponent from "../../framework/components/Admin/ManageTaskComponent";
import Task_Comp from "../../framework/components/Admin/TaskComponent";
import AdminDashBoard from "../../framework/components/Admin/AdminDashBoard";
import MyCalender from "../../framework/components/trainer/MyCalender";


const  AdminHomePage : React.FC = () => {
    const darkTheme = useSelector((state: any) => state.theme)
    const selectedSubMenu = useSelector((state: any) => (state.adminSubMenu.menuName))
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = ''

    return (
        <div className={`xl:flex     sm:block overflow-scroll content-start mx-auto h-[100%] opacity-90 ${darkTheme.theme}`}>

            <div className={`xl:w-2/12 w-full  ${darkTheme.theme + divlign} xl:h-[100%]  border-gray-300   rounded-xl mt-2 p-2`}>
                <div >
                    <h6 className="font-bold text-2xl text-blue-500 ps-2">Admin</h6>
                    <Profile />
                </div>
                <div className="flex w-full">
                     <MyCalender   />   
                </div>
            </div>
            <div className={`block xl:w-7/12 m-1 p-1  h-[100%]  w-full overflow-hidden   ${darkTheme.theme} ${divlign} `}>
                <AdminSubmenu />
                <div className=" flex mt-2 ">
                {selectedSubMenu == 'batches' ? <AdminContent /> :
                    selectedSubMenu == 'approve' ? <ApproveStaff /> :
                        selectedSubMenu == 'programs' ? <Events /> : 
                            selectedSubMenu == 'task'?<ManageTaskComponent />:
                            selectedSubMenu == 'dashBoard'?<AdminDashBoard />:""
                }
                </div>
            </div>
            <div className={`xl:w-3/12  h-[100%] w-full ${darkTheme.theme + divlign} bg-blue-800 bg-opacity-5 m-1  border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox />
                {/* <SingleChat nameObj ={{name:'chandhini'}} />  */}

            </div>

        </div>

    )
}


export default AdminHomePage 