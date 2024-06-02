 
import useGetTrainerBasedBatchSummary from "../../../useCases/useGetTrainerBasedBatchSummary";
import CircleChart from "../graphs/CircleGraph"
 
import { useEffect, useState } from "react";
import LineGraph from "../graphs/LineGraph";
import useWeeklyStudentsDetails from "../../../useCases/useWeeklyStudentsDetails";

const TrainerDashBoard = ()=>{
const batchData:[] = useGetTrainerBasedBatchSummary()
const weeklySummary = useWeeklyStudentsDetails()
const [batches,setBatches] = useState({})

useEffect(()=>{
     
    let allbatches = {}
    batchData?.map((item)=>{
       
        const batchName = item.batchName ;
        allbatches[batchName]={}  
        allbatches[batchName].student = item?.students?.length

        const weekSum = new Set()
        item?.students?.map((student) => {
            // Check if 'weekSum' has a property for 'student.week' using has()
            if (!weekSum.has(student.week) ) {
              // Create a new object with 'name' and 'value' properties
              weekSum.add({ name: student.week, value: 1 });
            } else if (weekSum.has(student.week)  ) {
              // Increment the 'value' property for the existing week
               const temp =  weekSum.get(student.week).value;
               weekSum.add({ name: student.week, value: temp+1 });
               console.log(temp,'tee--------------------------')
            }
          });
          allbatches[batchName].summery = [...weekSum]



    }) 
    setBatches(allbatches)
},[batchData])


 
      

    return(
        <div className="flex  flex-col w-full h-[100%] rounded-xl bg-blue-500 bg-opacity-5" >
            <div className=" P-1 flex items-center  h-20     w-full rounded-xl  bg-blue-500 bg-opacity-15">
                <button className="m-2 flex  bg-blue-500 bg-opacity-35 rounded-xl w-2/12  h-10 text-center items-center justify-center">BATCH</button>
                <button className="m-2 flex  bg-blue-500 bg-opacity-35 rounded-xl w-2/12  h-10 text-center items-center justify-center">BATCH</button>
            </div>

            <div className="p-1 flex  flex-wrap  bg-blue-800 rounded-xl bg-opacity-15 w-full h-[100%]">
            
            <div className="flex flex-col h-[100%] overflow-y-scroll    w-full flex-wrap">
                <div className="flex flex-col h-[50%] overflow-y-scroll    w-full flex-wrap">
                    {Object.keys(batches).length &&  Object.keys(batches)?.map((batch)=>{
                        console.log(batches[batch],'batches[batch]?.summary')
                        return <div key={batch} className="rounded-xl w-3/12  m-1 flex flex-col h-80   items-center   justify-center"> 
                            <CircleChart data={batches[batch]?.summery}/>
                            <h1 className="text-white">{batch.toUpperCase() } { batches[batch]?.student  ? batches[batch].student + ' students' : ''}</h1>
                        </div>
                    })}
                </div>
                <div className="flex    flex-col h-[30%] bg-gray-100 bg-opacity-10  rounded-xl overflow-y-scroll    w-full  p-2">
                    <h1> Weekly Students summary</h1> <br />
                 <LineGraph graphData={weeklySummary} />
                </div>
            </div>

            </div>

        </div>
    )
}


export default TrainerDashBoard