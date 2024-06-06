import { useEffect, useState } from "react";
import useWeeklyStudentsDetails from "../../../useCases/useWeeklyStudentsDetails";
import RoundedPropotionalGraph from "../graphs/RoundedPropotionalGraph"
import useGetBatchWiseStudents from "../../../useCases/useGetBatchWiseStudents";
import CircleChart from "../graphs/CircleGraph";
import useGetDesignationWiseStaffCount from "../../../useCases/useGetDesignationWiseStaffCount";





const AdminDashBoard =  ({})=>{
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
      const [batchSummary,setBatchSummary] = useState([])
      const [desiSummary,setDesiSummary] = useState([])
      
      const tempData = useWeeklyStudentsDetails()
      const btchSummary = useGetBatchWiseStudents()
      const employeeSummary = useGetDesignationWiseStaffCount()
      
      useEffect(()=>{
        const data = employeeSummary?.map((item)=>{ return {name:item.Designation, value:item.staffCount} })
        setDesiSummary(data)
      },[employeeSummary])
      
      useEffect(()=>{
        console.log(desiSummary,batchSummary,'**************************')
      })
      
      useEffect(()=>{
        const data =  btchSummary?.map((item)=>{return {name:item._id, value:item.count}} )
        setBatchSummary(data)
      },[btchSummary])
      useEffect(()=>{
        if(tempData){
        const temp = tempData?.map((item:any)=>{
            return {name:item.Xvalue,count:item.students}
        })
        setData(temp)}
      },[tempData])

     
    return(
        <div className= {`h-[100%] p-3  rounded-xl bg-opacity-15 m-1    flex w-full flex-col  `}>
            <div className="flex p-3 shadow-2xl w-full h-[30%]    rounded-2xl bg-opacity-5  ">
            <RoundedPropotionalGraph data={data} />
            </div>
            <div className="flex flex-wrap p-3 shadow-2xl w-full  mt-3 h-[100%] lg:h-[50%]    rounded-2xl bg-opacity-5  ">
              <div className="flex w-full  md:w-3/6 rounded-xl bg-blue-950 bg-opacity-5   shadow-xl h-[100%] ">
                  <CircleChart   data={batchSummary}  />  
              </div>
              <div className="flex w-full  md:w-3/6 rounded-xl bg-blue-950 bg-opacity-5  shadow-xl h-[100%] ">
                  <CircleChart   data={desiSummary}  />  
              </div>
              

            </div>
        </div>
    )
}

export default AdminDashBoard
