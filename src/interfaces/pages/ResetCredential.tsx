import { ResetCredential_page } from "../../entity/pages/resetCredential"
import ResetpasswordwithOtp from "../../framework/components/user/ResetpasswordwithOtp"
import SubmitOtp from "../../framework/components/user/SubmitOtp"
import { useSelector } from "react-redux"

const ResetCredential = (props:ResetCredential_page)=>{
    const {option} = props
    
    const activeUser = useSelector((state:any) => state.activeUser.user)
    

    return (
        <div className="sm:block lg:w-full xl:flex lg:block md:w-3/4 md:m-4 sm:w-full ">
            <div className="  justify-center  xl:w-4/6 align-middle h-[100%]  items-center lg:w-full  flex md:w-full sm:w-full  ">
                <div className="sm:text-[75px] md:text-[75px] lg:text-[100px] xl:text-[170px] font-serif text-slate-500   " > VALIDATE  </div>
            </div> 
             
            <div className="xl:w-2/6 lg:w-full   justify-center sm:w-full bg-transparent sm:m-[-40]   xl:h-50 items-center flex   ">
                 {!option? <SubmitOtp/>:option=='resetPassword'?<ResetpasswordwithOtp email={activeUser} />:""    }
            </div>
            
            
        </div>
    )
}

export default ResetCredential