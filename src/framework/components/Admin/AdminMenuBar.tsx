import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../../ReduxStore/adminMenu'; 
import { AdminSubmenu_Component } from '../../../entity/components/admin/subMenuComponent';
const AdminSubmenu = (props:AdminSubmenu_Component)=>{
    const [button, setButton] = useState(0)
    const darkTheme = useSelector((state:any)=>state.theme.theme )
    const dispatch = useDispatch()
    const handleButtonClick = (menuname:any)=>{
        dispatch(setMenu(menuname))
    }
    return(
        <>
        <div className= {`${darkTheme} block p-2 w-full border rounded-xl`}>
            {/* <button type="button" onClick={()=>{setButton(0) ; handleButtonClick('profile')}}   className={ button==0? `text-blue-600 font-semibold shadow-blue-400 shadow-md   font-semiboldbold text-start p-3   bg-blue-200  h-100 rounded w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-start p-3 rounded h-[100] w-[100px]`} >Profile</button> */}
            <button type="button" onClick={()=>{setButton(1) ; handleButtonClick('batches')} }   className={ button==1? `text-blue-600 shadow-blue-400 font-semibold shadow-md font-semiboldbold text-start p-3   bg-blue-200  h-100 rounded w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-start p-3 rounded h-[100] w-[100px]`} >Batches</button>
            <button type="button" onClick={()=>{setButton(2) ; handleButtonClick('programs')} }   className={ button==2? `text-blue-600 font-semiboldbold text-start p-3 font-semibold shadow-blue-400 shadow-md  bg-blue-200  h-100 rounded w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-start p-3  rounded h-[100] w-[100px]`} >Programs</button>
            <button type="button" onClick={()=>{setButton(3)  ; handleButtonClick('Approve')}}  className={ button==3? `text-blue-600 font-semibold shadow-blue-400 shadow-md font-semiboldbold text-start p-3   bg-blue-200  h-100 rounded w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-start p-3  rounded h-[100] w-[100px]`} >Staff</button>
        </div>
         
        </>
    )
}

export default AdminSubmenu