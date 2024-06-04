import { useEffect, useState } from "react";
import useWeeklyStudentsDetails from "../../../useCases/useWeeklyStudentsDetails";
import RoundedPropotionalGraph from "../graphs/RoundedPropotionalGraph"





const AdminDashBoard =  ({ })=>{
    // const data = [
    //     {
    //       name: 'Page A',
    //       count: 4000,
    //     },
    //     {
    //       name: 'Page B',
    //       count: 3000,
    //     },
    //     {
    //       name: 'Page C',
    //       count: 2000,
    //     },
    //     {
    //       name: 'Page D',
    //       count: 2780,
    //     },
    //     {
    //       name: 'Page E',
    //       count: 1890,
    //     },
    //     {
    //       name: 'Page F',
    //       count: 2390,
    //     },
    //     {
    //       name: 'Page G',
    //       count: 3490,
    //     },
    //     {
    //       name: 'Page H',
    //       count: 3490,
    //     },
    //     {
    //       name: 'Page i',
    //       count: 3490,
    //     },
    //     {
    //       name: 'Page J',
    //       count: 3490,
    //     },
    //     {
    //       name: 'Page K',
    //       count: 3490,
    //     },
    //     {
    //       name: 'Page L',
    //       count: 3440,
    //     },
    //     {
    //       name: 'Page M',
    //       count: 3480,
    //     },
    //   ];
      const [data,setData] = useState([])
      const tempData = useWeeklyStudentsDetails()
      useEffect(()=>{
        if(tempData){
        const temp = tempData?.map((item:any)=>{
            return {name:item.Xvalue,count:item.students}
        })
        setData(temp)}
      },[tempData])

     
    return(
        <div className= {`h-auto p-3  rounded-xl bg-opacity-15 m-1  flex w-full  `}>
            <div className="flex p-3 shadow-2xl w-full h-auto  rounded-2xl bg-opacity-5  ">
            <RoundedPropotionalGraph data={data} />
            </div>
        </div>
    )
}

export default AdminDashBoard
