import { useSelector } from "react-redux"
import useGetLogin from "../../../useCases/useGetLogin"



const StudentHistory = ()=>{
     useGetLogin();
     const user = useSelector((state:any)=>state.activeUser.user)

     console.log(user.subMission)

     const buttonColor = {
        0:"bg-blue-400",
        1:"bg-blue-500",
        2:"bg-red-600",
        3:"bg-red-400",
        4:"bg-orange-300",
        5:"bg-orange-500",
        6:"bg-yellow-400",
        7:"bg-yellow-400",
        8:"bg-green-700",
        9:"bg-green-800",
        
}

    return  <div className="block">
        <div className="student-pending rounded-lg flex flex-wrap   bg-opacity-5 px-4 py-2 w-100 ">
        <h1 className="text-5xl">HISTORY</h1> <br />
        </div>
        <div className="student-pending rounded-lg flex flex-wrap   bg-opacity-5 px-4 py-2 w-100 ">
        
        {Object.keys(user.submission).map((submission)=>{
            return <div className=" shadow-md  p-3 block bg-gray-400 m-2 bg-opacity-5  rounded-md">
                <h1 >{submission}</h1>   <br />
                    <div className="block w-full m-1  bg-opacity-5 p-1 ">
                    
                        {Object.keys(user.submission[submission]).map((item)=>{
                            return <div className=" shadow-md m-1 items-center w-full flex p-1 ">
                                <div className="flex ">
                                    <h1 className="text-sm items-center font-bold  "> {item}</h1>
                                    {user.submission[submission][item][0].verified ? <h1> </h1> : <h1>pending </h1> }
                                </div>
                                {Object.keys(user.submission[submission][item][0].mark).map((mark)=>{
                                    
                                    return user.submission[submission][item][0].mark[mark] ? <button className={` ${buttonColor[mark]} w-7 h-8 text-small p-1 rounded-md text-white  m-1`} type="button">{mark} </button>:<button className={` ${buttonColor[mark]} w-8 h-8 text-small p-1 rounded-md text-white bg-opacity-15 text-opacity-35 m-1`} type="button">{mark} </button> 
                                })}
                                <h1 className="text-sm items-center "> {user.submission[submission][item][0].comment}</h1>

                                
                            </div>
                        }) }
                    </div>
                
            </div>
        }) }

    </div>
    </div>
}

export default StudentHistory