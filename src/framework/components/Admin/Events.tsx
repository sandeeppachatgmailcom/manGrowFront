import React, { useState, useEffect } from "react";
import { Event_Model } from "../../../entity/components/admin/events"; // Assuming correct path
import axiosApi from "../../../interfaces/api/axios";
import { utilityApis } from "../../../interfaces/api/api";
import Event_Single from "./Event_Single";
import { useSelector } from "react-redux";
import EventBody from "./EventBody";

const Events = () => {
  const [formData, setFormData] = useState<Event_Model[] | undefined>(); // Initialize with props.event or undefined
  const [seletedMenu,setSelectedMenu] = useState('')
  const[activeEvent,setActiveEvent] = useState(0)
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
    <div className={`xl:flex w-full flex-wrap border    ${darkTheme}`}>
        <div className="flex   p-2 md:flex-wrap md:w-full    md:rounded xl:w-1/6  w-full  ">
        {formData?.length ?formData.map((item,index)=>{
           return <div   className={`m-1 w-full h-[50px]  md:w-full sm:w-full flex items-center border  cursor-pointer xl:flex xl:rounded-s rounded-full  ${seletedMenu===item.eventId ? '  bg-blue-300 font-semibold ' : ' '  }`}  onClick={()=>{setSelectedMenu(item.eventId);setActiveEvent(item);setActiveIndex(index)}}  > <Event_Single event={item}    /> </div>
        }) :' ' }
       
        </div>
        <div className="xl:w-5/6 ">
        {activeEvent?<EventBody event={activeEvent} onChange={setActiveEvent}    /> :''}
        </div>
    </div>
  );
};

export default Events;
