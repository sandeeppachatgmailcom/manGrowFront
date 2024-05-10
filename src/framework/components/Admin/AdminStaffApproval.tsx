import React, { useEffect, useState } from "react"
import ButtonSwitch from "../utilComponents/ButtonSwitch";
import { MdVerified } from "react-icons/md";
import axiosApi from "../../../interfaces/api/axios";
import { adminApis } from "../../../interfaces/api/api";
import { ActiveUserStore } from "../../../entity/StateStore/activeUser";
const AdminStaffApproval :React.FC<any> = (props) => {
    const [formData, setFormData] = useState<ActiveUserStore>({})
    const handleApprove = (name:any, value:any) => {
        console.log(name, value, 'name,value', name == 'approve' && !value ? 'user' : 'Trainer')

        setFormData({
            ...formData,
            role: name == 'approve' && !value ? 'user' : 'trainer',
            trainer: name == 'approve' && !value ? false : true,
            active: name == 'approve' && !value ? false : true,
            user: name == 'approve' && !value ? true :false
        })
    }

    const handleApproveStaff = async () => {
        const approved = await axiosApi.post(adminApis.approveStaff, formData)
        console.log(approved, 'approved')

    }
    const handleSwitchChange = (name:any, value:any) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }


    useEffect(() => {
        console.log(formData, 'formData')
    }, [formData])
    useEffect(() => {
        setFormData(props?.staff)
    }, [props?.staff])




    return (
        <>
            {Object.keys(props.staff).length &&
                <div className="flex justify-center  align-middle items-center flex-col p-3 md:flex-col   w-full  ">
                    <div className="w-full lg:w-full shadow-lg rounded-lg xl:flex lg:items-center sm:w-full  border sm:block sm:justify-items-center ">
                        <div className=" justify-center   h-100 w-full items-center sm:block xl:flex lg:flex   ">
                            <div className="flex xl:w-1/6     justify-center">
                                <div className="flex   flex-col justify-self-center h-[100px]  w-[100px] bg-blue-300  shadow-md rounded-full shadow-gray-400 ">

                                </div>
                            </div>
                            <div className="flex xl:w-5/6 justify-center">
                                <div className="items-center xl:w-5/6 sm:w-full   p-1 h-[80%] flex align-middle w-4/6     flex-col  " >
                                    <div className="flex ">
                                        <label className="w-4/2 text-left text-2xl font-semibold  " htmlFor="">  {formData?.firstName?.toUpperCase()}  </label>{formData?.otpVerified ? <button className="  text-blue-500 h-[100%]" > <MdVerified />  </button> : <button className="  text-red-500" > <MdVerified /></button>}
                                    </div>
                                    <label className="w-4/2 text-left" htmlFor=""> {formData?.role}</label>
                                    <label className="w-4/2 text-left" htmlFor="">   {formData?.email}</label>

                                    <label className="w-4/2 text-left" htmlFor=""> 9847089337  {formData?.mob}</label>
                                    <label className={`w-4/2 text-left ${formData?.otpVerified ? 'text-blue-500' : 'text-red-500 font-semibold'}`} htmlFor="">   {formData?.otpVerified ? '' : 'Otp verification is pending '}</label>
                                </div>
                            </div>
                        </div>

                    </div>


                    {formData?.otpVerified ? <div className="xl:flex p-3 md:block   w-full h-[100%] " >


                        <div className="xl:flex w-full items-center m-1 rounded-lg shadow-inner shadow-gray-400 p-2  ">

                            <div className=" xl:flex md:block   w-full justify-between md:p-4">
                                <div className="flex xl:w-1/2 justify-between p-2  ">
                                    <label className=" w-2/6" htmlFor=""> approve  </label>
                                    
                                    <div className="w-4/2 text-left" ><ButtonSwitch name='approve' value={!formData.user} onChange={(name:any, value:any) => handleApprove(name, value)} /></div>

                                </div>
                                <div className="flex   xl:w-1/2 justify-between p-2">
                                    <label className=" w-2/6" htmlFor=""> Active  </label>
                                    <div className="w-4/2 text-left" ><ButtonSwitch name='Active' value={formData.active} onChange={(name:any, value:any)=> handleSwitchChange(name, value)} /></div>

                                </div>

                            </div>

                            <div className="xl:flex  md:block w-full justify-between md:p-4 ">
                                <div className="flex xl:w-1/2 justify-between p-2">
                                    <label className=" w-2/6" htmlFor=""> Admin </label>
                                     
                                    <div className="w-4/2 text-left" ><ButtonSwitch name='Admin' value={formData.admin} onChange={(name:any, value:any) => handleSwitchChange(name, value)} /></div>

                                </div>

                                <div className="flex xl:w-1/2 justify-between p-2">
                                    <label className=" w-2/6" htmlFor="">  Trainer   </label>
                                     
                                    <div className="w-4/2 text-left" ><ButtonSwitch name='trainer' value={formData.trainer} onChange={(name:any, value:any)=> handleSwitchChange(name, value)} /></div>

                                </div>

                            </div>
                            <div className="flex w-full justify-between p-2">
                                <div className="flex w-1/2 justify-between p-2">
                                    <label className=" w-2/6 text-sm" htmlFor=""> Student  </label>
                                   
                                    <div className="w-4/2 text-left" ><ButtonSwitch name='student' value={formData.student} onChange={(name:any, value:any) => handleSwitchChange(name, value)} /></div>
                                </div>
                                <div className="flex w-1/2 justify-end p-2">
                                    <button className="bg-gray-500 rounded w-[50px] text-white p-1 shadow-lg   me-1"> RESET </button>
                                    <button onClick={() => handleApproveStaff()} className="bg-blue-500 rounded w-[50px] text-white p-1 shadow-lg"> SAVE </button>
                                </div>

                            </div>
                        </div>
                    </div> : ''}

                </div>
            }
        </>
    )
}

export default AdminStaffApproval
