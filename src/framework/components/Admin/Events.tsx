import React, { useState, useEffect } from "react";
import { Event_Model } from "../../../entity/components/admin/events"; // Assuming correct path
import axiosApi from "../../../api/axios";
import { utilityApis } from "../../../api/api";
import Event_Single from "./Event_Single";
import { useSelector } from "react-redux";
import EventBody from "./EventBody";

const Events = () => {
  const [formData, setFormData] = useState<Event_Model[] | undefined>(); // Initialize with props.event or undefined
  const [seletedMenu,setSelectedMenu] = useState('')
  const[activeEvent,setActiveEvent] = useState(0)
  const darkTheme = useSelector((state:any ) => state.theme.theme)
    const load_events =async ()=>{
        const events = await axiosApi.get(utilityApis.listActiveEvents)
        console.log(events.data,'events data')
        setFormData(events.data)
    }
    useEffect(()=>{
        load_events()
    },[])


  return (
    <div className={`flex w-full flex-wrap    ${darkTheme}`}>
        <div className="border p-2 flex-wrap md:rounded xl:w-1/6 md:w-2/6 w-full  ">
        {formData?.length ?formData.map((item)=>{
           return <div className={`m-1   md:w-full sm:w-full flex     cursor-pointer xl:flex xl:rounded-s rounded-full  ${seletedMenu===item.eventId ? ' bg-blue-300 ':''  }`} onClick={()=>{setSelectedMenu(item.eventId);setActiveEvent(item) }}  > <Event_Single event={item} index={item.eventId} /> </div>
        }) :''}
       
        </div>
        <div className="border p-2   flex-wrap md:rounded xl:w-5/6 md:w-4/6 w-full  ">
            {activeEvent?<EventBody event={activeEvent} /> :''}
        </div>
    </div>
  );
};

export default Events;
