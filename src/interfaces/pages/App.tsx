import  { useEffect,   } from 'react'; 
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../framework/components/header/Header'; 
import { Provider, useSelector } from 'react-redux';
import appStore from '../../framework/ReduxStore/appStore';  
import { GoogleOAuthProvider } from '@react-oauth/google';
import { App_page } from '../../entity/pages/app_page';
import ErrorBoundary from '../../framework/components/Error/ErrorBoundary';
const App = (_props:App_page) => {
  const navigate = useNavigate()
   const theme =useSelector((state:any) => state.theme.theme)
   const user = useSelector((state:any)=> state.activeUser.user)
   useEffect(()=>{

   if(!Object.keys(user).length){
     navigate('/')
   }},[])
  return (
     <GoogleOAuthProvider clientId="150250688028-3q3h69aphbc5q7i82f4n6if7or9d3c2d.apps.googleusercontent.com">
      <Provider store={appStore}>
       {/* <ErrorBoundary>  */}
          <div   className={`${theme}   sm:block  w-full  md:full lg:full xl:full h-screen  `}>
            <div className={` rounded-xl w-full top-0 left-0 overflow-hidden bg-blue-400 bg-opacity-5   mx-auto md:full lg:w-full xl:full xl:h-[12%]`} >
              <Header />
            </div>
            <div   className={`${theme}   sm:block xl:flex  w-full mx-auto md:full lg:full xl:full h-full `} style={{ maxHeight: 'calc(100vh - 40px)' }}   >
              <Outlet />
            </div>
          </div>
         {/* </ErrorBoundary>  */}
      </Provider>
     </GoogleOAuthProvider>
  )
}

export default App;
 