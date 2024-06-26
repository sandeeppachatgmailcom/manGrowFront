import { FaUserGraduate } from "react-icons/fa6";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaChessKing } from "react-icons/fa";
import axiosApi from "../../framework/api/axios";
import { userApi } from "../../entity/constants/api";
import { useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { login } from "../../framework/ReduxStore/activeUser";
 
const Role = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const activeUser = useSelector((state)=>state.activeUser.user)
    const getLogin =async (role)=>{
        console.log(userApi.getlogin+`/${role}`, '888888888888888')
        const tempuser = await axiosApi.get(userApi.getlogin+`/${role}`) 
         
        if(tempuser.data.success){
            dispatch(login(tempuser.data))
            if(Object.keys(tempuser.data).length && tempuser.data.otpVerified) navigate(`/${tempuser.data.role}`)
        }
        else{
            console.log(tempuser.data, 'tempuser.datatempuser.data')
            navigate('/signin')
        }
    }
 


    const handleuserRole =async (role:string)=>{
        try {
            const data = {
                role:role
            }
            
            console.log(data)

            const verifyRole =await getLogin(role) 
            console.log(verifyRole,'verifyRole')
            if(role != verifyRole.data || 'ok' ){
                console.log(document.cookie.split(';').map((item)=>item.split('=')).filter((token)=>token[0].trim().startsWith('man')))
                
            }
        } catch (error) {
            
        }
    }
    

    return(
        <div className="items-center h-[100%] justify-center w-full flex flex-col ">
            <div className="items-center h-10 justify-center w-full flex flex-col ">
                    <h1 className="text-2xl">Choose a role   </h1>
            </div>
            <div className="items-center h-[30%] justify-center w-full flex flex-col ">
                <div className="  flex w-6/12 h-[100%] items-center justify-center rounded-2xl    ">
                    <div onClick={()=>handleuserRole('manGrowadmin')} className=" hover:text-orange-500 m-3 cursor-pointer w-[3/12] h-[90%] text-blue-400 shadow-2xl p-8 rounded-full flex flex-col justify-center items-center  bg-blue-900 bg-opacity-10">
                        <FaChessKing className="h-full w-[50%]   m-1 p-1" />
                        <h1 className="font-bold text-2xl items-center">Admin </h1>
                    </div>
                    <div onClick={()=>handleuserRole('manGrowtrainer')} className="  m-3 cursor-pointer w-3/12 hover:text-orange-500 h-[90%] text-blue-400 shadow-2xl p-8 rounded-full flex flex-col justify-center items-center  bg-blue-900 bg-opacity-10">
                        <GiPoliceOfficerHead className="h-full w-[50%] m-1 p-1" />
                        <h1 className="font-bold text-2xl items-center">Staff </h1>
                    </div>
                    <div onClick={()=>handleuserRole('manGrowstudent')} className="   m-3 cursor-pointer w-3/12 hover:text-orange-500 h-[90%] text-blue-400 shadow-2xl   p-8 rounded-full flex flex-col justify-center items-center  bg-blue-900 bg-opacity-10">
                        <FaUserGraduate className="h-full w-[50%] m-1 p-1" />
                        <h1 className="font-bold text-2xl items-center">Student </h1>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Role