import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RiUserAddFill } from "react-icons/ri"; 
import { FaPowerOff } from "react-icons/fa";
import { MdLightMode } from "react-icons/md"; 
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { switchDarkTheme, toggleTheme } from '../../ReduxStore/themeSlice';
import { logout } from '../../ReduxStore/activeUser';
import { Header_Component } from '../../../entity/components/common/header';
import { toggleMultiUser } from '../../ReduxStore/multipleUser';
//import ProfileImageBox from './ProfileImage';

function Header(props:Header_Component) {

  const dispatch = useDispatch()
  const [adduser,setAdduser] = useState(false)
  const theme = useSelector((state:any) => state.theme.theme)
  const darkTheme = useSelector((state:any) => state.theme.themeDark)
  const activeUser = useSelector((state:any) => state.activeUser.user)
  const company = useSelector((state:any) => state.company.info.companyName)
  const navigate = useNavigate()
  const muti = useSelector((state)=> state.multiUser.show)
  const [defaultTheme, setDefaultTheme] = useState(
  
    // Check for initial state based on browser preference (optional):
    localStorage.getItem('theme') || // Check localStorage if available
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light' // Default to light theme if unavailable
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => {setDefaultTheme(mediaQuery.matches ? 'dark' : 'light');console.log('yes i know')};
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const toggleDarkMode = () => {
    dispatch(toggleTheme(defaultTheme))
    
  }
  
  
  
  useEffect(()=>{
     
    toggleDarkMode()
  },[defaultTheme])

  
 

  function deleteCookie(cookieName:any) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie ${cookieName} has been deleted`);
}
  const handleAdduser = ()=>{
    
      dispatch(toggleMultiUser())
     
  }

  const handleLogout = () => {
   
   if(activeUser.role == 'student'){
    deleteCookie('manGrowstudent')
   }
   else if(activeUser.role == 'trainer'){
    deleteCookie('manGrowtrainer') 
   } 
   else if(activeUser.role == 'admin'){
    deleteCookie('manGrowadmin')
   } 
   else 
    deleteCookie('manGrow')
    dispatch(logout())
  }
  
   
  

  return (
    <div className={`  md:flex flex-col sm:flex-row rounded-xl  w-full h-[100%] items-center justify-between shadow-lg `}>

      <div className={` flex items-start justify-start md:h-[100%] h-[30%] flex-col   w-6/12 p-4`}>
        <h6 className={` float-start  sm:w-auto text-2xl text-blue-500 font-semibold `}>
          {company}
        </h6>
       {Object.keys(activeUser).length
        ? <button className=' rounded-2xl text-right text-2xl bg-opacity-15 h-20 font-semibold'  onClick={()=>{ if(Object.keys(activeUser).length && activeUser.otpVerified) navigate(`/${activeUser.role}`)}} type="button"  > {activeUser.firstName} </button>
       : ''}
            </div>
       

      <div className={`md:flex  items-center md:w-6/12 w-full h-[70%]   rounded-xl overflow-scroll block  justify-end `}>
       
           
            <div className=' h-10   md:h-full rounded-xl flex  items-center justify-end   overflow-hidden  w-full md:w-6/12 '>
                <button onClick={handleAdduser} className='   h-20 rounded-full flex  items-center flex-wrap overflow-hidden  m-1 shadow-xl '>
                  <RiUserAddFill  className='w-20 h-20 p-5 text-blue-500 bg-gray-600 bg-opacity-15 '  />
                </button>
                <button className='h-20      rounded-full m-2 focus:outline-none' onClick={handleLogout}>
                  <FaPowerOff className='w-20 h-20 p-5 text-red-600 bg-gray-600 bg-opacity-15 rounded-full ' />
                </button>
                <button
                  onClick={() => defaultTheme == 'dark' ?setDefaultTheme('light'):setDefaultTheme('dark') }
                  className={`w-20 h-20 p-5      rounded-full  flex items-center m-1 justify-center bg-gray-700 bg-opacity-15    focus:outline-none`}
                >
                  {darkTheme ? <MdLightMode className='w-20 h-20 text-orange-200 '/> :<MdDarkMode className='w-20 h-20 text-gray-700   ' />}
                   
                </button>
            </div>
           
      </div>

    </div>

  );
}


export default Header
