import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

 
import { FaPowerOff } from "react-icons/fa";
 
import { useNavigate } from 'react-router-dom';
import { switchDarkTheme, toggleTheme } from '../../ReduxStore/themeSlice';
import { logout } from '../../ReduxStore/activeUser';
import { Header_Component } from '../../../entity/components/common/header';
//import ProfileImageBox from './ProfileImage';

function Header(props:Header_Component) {

  const dispatch = useDispatch()

  const theme = useSelector((state:any) => state.theme.theme)
  const darkTheme = useSelector((state:any) => state.theme.Themedark)
  const activeUser = useSelector((state:any) => state.activeUser.user)
  const company = useSelector((state:any) => state.company.info.companyName)
  const navigate = useNavigate()
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
    console.log(window.matchMedia('(prefers-color-scheme: dark)'),'it starts here')
  }
  useEffect(()=>{
    console.log(theme, defaultTheme,)
    toggleDarkMode()
  },[defaultTheme])

  
 

  function deleteCookie(cookieName:any) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie ${cookieName} has been deleted`);
}


  const handleLogout = () => {
    deleteCookie('manGrow')
    dispatch(logout())
  }
  
  useEffect(()=>{
    if(!Object.keys(activeUser).length) navigate('/signin')
  },[activeUser])

 


  return (
    <div className={` flex flex-col sm:flex-row rounded-xl ${theme}   xl:w-[100%] h-[100%]        items-center justify-between shadow-lg `}>

      <div className={` flex items-center justify-start    p-4`}>
        <h6 className={` float-start  sm:w-auto text-2xl text-blue-500 font-semibold `}>
          {company}
        </h6>
      </div>

      <div className={` flex items-center justify-end  `}>
        {/* <ProfileImageBox height='50px' width='50px' /> */}
        <h6 className={` px-4 `}>
          {Object.keys(activeUser).length
            ? <button onClick={()=>{ if(Object.keys(activeUser).length && activeUser.otpVerified) navigate(`/${activeUser.role}`)}} type="button"  > {activeUser.firstName} </button>
            : ''}
        </h6>
        
        <button className='btn px-3 py-2 rounded-full focus:outline-none' onClick={handleLogout}>
          <FaPowerOff />
        </button>
        <button
          onClick={() => defaultTheme == 'dark' ?setDefaultTheme('light'):setDefaultTheme('dark') }
          className={`rounded-full w-10 h-10 flex items-center justify-center bg-gray-800   ${theme.theme} focus:outline-none`}
        >
          {darkTheme ? "🌤" : "🌙"}
        </button>
      </div>

    </div>

  );
}


export default Header
