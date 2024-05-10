import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import Calendar from 'react-calendar'
//import 'react-calendar/dist/Calendar.css';

import ChatBox from "../../framework/components/chatBox/chatBox";
import AdminSubmenu from "../../framework/components/Admin/AdminMenuBar";
import AdminContent from "../../framework/components/Admin/AdminContent";
import ApproveStaff from "../../framework/components/Admin/StaffApproval";
import Events from "../../framework/components/Admin/Events";

const AdminHomePage = () => {
    const darkTheme = useSelector((state: any) => state.theme)
    const selectedSubMenu = useSelector((state: any) => (state.adminSubMenu.menuName))
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = ''

    return (
        <div className={`xl:flex w-full   lg:flex block content-start mx-auto h-100  ${darkTheme.theme}`}>

            <div className={`xl:w-1/6  sm:w-full  ${darkTheme.theme + divlign} border border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`}>
                <div >
                    <h6 className="font-bold text-2xl text-blue-500 ps-2">Admin</h6>
                    <Profile />
                </div>
                <div className="bg-transparent ">
                    <Calendar defaultView='month' value={value} />

                </div>
            </div>
            <div className={`block h-100 xl:w-4/6 xl:m-1 mt-2 sm:w-full md-w-full    ${darkTheme.theme + divlign}`}>
                <AdminSubmenu />
                {selectedSubMenu == 'batches' ? <AdminContent /> :
                    selectedSubMenu == 'Approve' ? <ApproveStaff /> :
                        selectedSubMenu == 'programs' ? <Events /> : ''}
            </div>
            <div className={`xl:w-1/6 sm:w-full ${darkTheme.theme + divlign} border border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox />
                {/* <SingleChat nameObj ={{name:'chandhini'}} />  */}

            </div>

        </div>

    )
}

export default AdminHomePage 