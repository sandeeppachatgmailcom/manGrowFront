import { useEffect, useState } from "react"
import { adminApis } from "../entity/constants/api"
import axiosApi from "../framework/api/axios"

const useGetActiveUsers = ()=>{
    const [users,setUsers] = useState()
    useEffect(()=>{
        fetchUsers()
    },[])

    const fetchUsers = async ()=>{
        
            const user = await axiosApi.get(adminApis.listAllstaffpendingApprovals) 
                console.log(user?.data,'helo users welcome to approval page')
                setUsers(user.data)
     
    }
    console.log(users,'users')
    return users

}

export default useGetActiveUsers