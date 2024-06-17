import  { useState, useEffect } from "react";
import { Event_Model } from "../../../entity/response/events"; // Assuming correct path
import axiosApi from "../../api/axios";
import { utilityApis } from "../../../entity/constants/api";
import Event_Single from "./Event_Single";
import { useSelector } from "react-redux";
import EventBody from "./EventBody";  

const Events = () => {
  const [formData, setFormData] = useState<Event_Model[] | undefined>(); // Initialize with props.event or undefined
  const [seletedMenu,setSelectedMenu] = useState('')
  const [activeEvent,setActiveEvent] = useState<any>({})
  const [activeIndex,setActiveIndex] = useState(0)
  const darkTheme = useSelector((state:any ) => state.theme.theme)
  const load_events =async ()=>{
        const events = await axiosApi.get(utilityApis.listActiveEvents)
        console.log(events.data,'events data')
        setFormData(events.data)
    }

    useEffect(()=>{
      if(formData){
        const data = [
          ...JSON.parse(JSON.stringify(formData))
        ]
        data[activeIndex] = activeEvent
        setFormData(data)
    }
    },[activeEvent])




    useEffect(()=>{
        load_events()
    },[])


  return (
    <div className={`xl:flex w-full flex-wrap bg-blue-500 h-[100%]     p-1 overflow-scroll bg-opacity-5 shadow-md rounded-md m-1  ${darkTheme}`}>
        <div className="flex flex-wrap border h-[40%] overflow-scroll   p-1 md:flex-wrap md:w-full border-r-2 border-opacity-35   border-gray-500  md:rounded xl:w-1/6  w-full  ">
          {formData?.length ?formData.map((item,index)=>{
            return <div   className={`m-1 border   border-gray-500 border-opacity-20   w-full h-auto    md:w-full sm:w-full flex items-center cursor-pointer xl:flex xl:rounded-s rounded-2xl ms-1 p-2   ${seletedMenu===item.eventId ? '  bg-blue-300 bg-opacity-40 font-semibold ' : ' '  }`}  onClick={()=>{setSelectedMenu(item.eventId as string);setActiveEvent(item);setActiveIndex(index)}}  > <Event_Single event={item} index={index}   /> </div>
          }) :' ' }
       </div>
        <div className="xl:w-5/6 border flex  h-[40%] border-gray-500 border-opacity-30 p-1">
        {activeEvent?<EventBody event={activeEvent} onChange={setActiveEvent}    /> :''}
        </div>
    </div>
  );
};

export default Events;
