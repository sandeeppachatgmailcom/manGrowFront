import { useEffect, useState } from "react"
import { utilityApis } from "../entity/constants/api"
import axiosApi from "../framework/api/axios"

const useGetTrainers = () => {
    const [trainers, setTrainers] = useState([])
    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await axiosApi.get(utilityApis.listActiveTrainers)
                console.log(response.data,'responce data ')
                
                const data =await response.data.map((item :any) => ({ name: item.firstName, id: item.email }))
                setTrainers(data)
            } catch (error) {
                // Handle error
                console.error("Error fetching trainers:", error)
            }
        }
        fetchTrainers()
    }, [])

    console.log(trainers, 'trainers')

    return trainers
}

export default useGetTrainers
