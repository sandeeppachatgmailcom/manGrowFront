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


const  AdminHomePage : React.FC = () => {
    const darkTheme = useSelector((state: any) => state.theme)
    const selectedSubMenu = useSelector((state: any) => (state.adminSubMenu.menuName))
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = ''

    return (
        <div className={`xl:flex w-full   lg:flex block content-start mx-auto h-100  ${darkTheme.theme}`}>

            <div className={`xl:w-1/6 block sm:w-full bg-gray-400  bg-opacity-5 m-1  rounded-xl mt-2 p-2`}>
                <div >
                    <h6 className="font-bold text-2xl text-blue-500 ps-2">Admin</h6>
                    <Profile />
                </div>
                <div className="bg-transparent ">
                    <Calendar defaultView='month' value={value} />

                </div>
            </div>
            <div className={`block h-100 xl:w-4/6 m-2 p-1  sm:w-full md-w-full bg-gray-400  bg-opacity-5 }`}>
                <AdminSubmenu />
                <div className=" flex mt-2 ">
                {selectedSubMenu == 'batches' ? <AdminContent /> :
                    selectedSubMenu == 'approve' ? <ApproveStaff /> :
                        selectedSubMenu == 'programs' ? <Events /> : 
                            selectedSubMenu == 'task'?<ManageTaskComponent />:""
                }
                </div>
            </div>
            <div className={`xl:w-1/6 sm:w-full bg-gray-400 m-1  bg-opacity-5  border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox />
                {/* <SingleChat nameObj ={{name:'chandhini'}} />  */}

            </div>

        </div>

    )
}


export default AdminHomePage 