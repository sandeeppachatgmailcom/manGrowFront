import { useNavigate } from "react-router-dom"




const useHandleRouter=(role:string)=>{
    const navigate = useNavigate()
    
    if(role=='admin')  navigate( '/Admin')
      else if(role=='student') navigate('/Student') 
      else if(role=='user') navigate('/user') 
      else if(role=='trainer') navigate('/Trainer')
}

export default useHandleRouter

