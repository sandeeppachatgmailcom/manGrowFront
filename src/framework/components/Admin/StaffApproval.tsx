import { useEffect, useState } from "react"
import axiosApi from "../../../api/axios";
import AdminStaffApproval from "./AdminStaffApproval"
import { RiDeleteBin5Line } from "react-icons/ri";
import { adminApis } from "../../../api/api";
const ApproveStaff = ()=>{
    const [user,setUser ]= useState([])
    const [pageCount,setPageCount] = useState(1)
    const [menu,setMenu] = useState(0)
    const[selectedStaff,setSelectedStaff] = useState()
    
const getUsers = async ()=>{
    const user = await axiosApi.get(adminApis.listAllstaffpendingApprovals) 
        console.log(user?.data,'helo users welcome to approval page')
        setUser(user.data)
      
}

const deleteProfile=async (item:any)=>{
    const data = {
        ...item,
        deleted:true,
        role:'user',
        active:false,
        admin:false,
        trainer:false,
    }
    data?.deleted? await axiosApi.post(adminApis.approveStaff, data):''
    
    await  getUsers();
}




useEffect(()=>{
    getUsers();
},[])

 
useEffect(()=>{
    console.log(pageCount,'pagecount')
},[pageCount]) 
     

 


    return (
         
             
                <div className="xl:flex lg:flex sm:block border rounded-lg mt-1 p-1 w-full">
                <div className="flex flex-col xl:w-1/6    md:w-full lg:w-2/6 overflow-hidden  me-1  border rounded-e-none  border-gray-300 border-opacity-70 rounded-xl">
                    <div className="flex flex-col h-[250px]     ">
                    {user.map((item :any, index :number) => {
                       if (index > (((pageCount-1)*4)) && index <= pageCount*4)  return <div className="flex justify-between m-1" > <button onClick={() =>{setMenu(index);console.log(item);setSelectedStaff(item)   }} className={menu == index ? `text-left shadow-blue-500 shadow-md justify-between w-5/6 font-semibold text-blue-800 rounded-e-full bg-blue-200 flex m-1 rounded h-[50px]   p-2 items-center `  : 'rounded-e-full w-[90%] justify-start p-2 items-center text-left  flex m-1 rounded h-[40px]'} key={index} > {item.firstName}  {menu == index ?<button onClick={()=>{deleteProfile(item)}} className="  "><RiDeleteBin5Line /> </button>:''}  </button> </div>

                    })}
                    </div>
                    <div className="flex h-[40px] items-centerm-1    ">
                        <div className="flex items-center w-full m-1  ">
                            
                        {(() => {
                                const count = Math.ceil(user.length/4)
                                let outArray = []
                                for (let i = 1; i <= count; i++) {
                                    outArray.push(<button  key={i} onClick={() => {setPageCount(i);setMenu(((i*4)-3));} } className={ i==pageCount ?` ms-1 border rounded font-semibold shadow-lg  text-white bg-blue-400 w-5`:`ms-1 border rounded font-semibold text-blue-400 w-5`} >{i}</button>)
                                }
                                return outArray
                            }
                            )()
                            }
                            
                        </div>
                    </div>
                </div>
                <div className=" md:flex-col w-full flex justify-center items-center sm:w-full  md:w-ful lg:w-4/6 xl:w-5/6  shadow-blue-200  shadow-inner border rounded-s-none border-gray-300 border-opacity-70      rounded-xl">
                    { selectedStaff? <AdminStaffApproval staff={selectedStaff}/>:''}
                </div>
    
            </div> 
        
        


    )
}

export default ApproveStaff