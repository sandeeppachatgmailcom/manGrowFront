import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend } from "recharts";
import useGetStudentsPending from "../../../useCases/useGetStudentsPending";
import { useSelector } from "react-redux";
  
const WritingScoreGraph = ({taskType}) => {
   const user = useSelector((state:any)=>state.activeUser.user)
   let markData = []
   console.log(user,'-------------------------------------------')
    if(user.submission){
        for (let key in user.submission){
            if(key !='program'){
                let taskCount = 0
                let tempMark = 0;
                for(let task in user.submission[key]){
                    taskCount++
                    if(user.submission[key][task][0]?.verified){
                        for(let mark in user.submission[key][task][0].mark){
                            if(user.submission[key][task][0]?.mark[mark] && user.submission[key][task][0]?.taskType == taskType  ){
                                tempMark +=Number(mark)
                                const marklisttemp={
                                    task: user?.submission[key].program.eventName +'[' +user?.submission[key].program.scheduledDate.toString().split('T')[0]+']' ,
                                    [user?.submission[key][task][0]?.taskType]:tempMark/taskCount,
                                    mark:tempMark/taskCount,
                                    amt:10
                                }
                                console.log(marklisttemp,'marklisttemp')
                                markData.push(marklisttemp)
                            }
                           
                        }
                    }
                   
                }
                //let totalMark = taskCount*10;
                
            }
        }
    }
    console.log(markData,'markData')  
    const data = [
        {
          name: "Page A",
          Writing: 4000,
          listening: 2400,
          speaking:5000,
          amt: 2400,
        },
        {
          name: "Page B",
          Writing: 6000,
          listening: 2400,
          speaking:3000,
             amt: 2210,
        },
        {
          name: "Page C",
          Writing: 3000,
          listening: 1400,
          speaking:2000,
             amt: 2290,
        },
        {
          name: "Page D",
          Writing: 1000,
          listening: 5400,
          speaking:8000,
            amt: 2000,
        },
        {
          name: "Page E",
          Writing: 5000,
          listening: 1400,
          speaking:6000,
             amt: 2181,
        },
        {
          name: "Page F",
          Writing: 6000,
          listening: 3400,
          speaking:5000,
            amt: 2500,
        },
        {
          name: "Page G",
          Writing: 7000,
          listening: 4400,
          speaking:6000,
             amt: 2100,
        },
      ];
    return (
        <div className=" bg-green-200 m-1 rounded-xl bg-opacity-10 p-3 w-full" >
            <div className="w-full flex justify-center ">{taskType}</div>
            <LineChart width={500} height={300} data={markData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="task" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={taskType} stroke="#88ca9d" activeDot={{ r: 8 }} />
                </LineChart>
        </div>
    )
}

export default WritingScoreGraph