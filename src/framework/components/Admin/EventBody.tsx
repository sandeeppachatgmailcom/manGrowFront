import { useEffect, useState } from "react"
import { Event_Model } from "../../../entity/components/admin/events"
import { useSelector } from "react-redux"
import DropdownMenu from "../utilComponents/DropdownMenu"
import axiosApi from "../../../interfaces/api/axios"
import { adminApis, utilityApis } from "../../../interfaces/api/api"
import Switch from '@mui/material/Switch';
import { audienceType, priority, repeat } from "../../../entity/components/admin/enum"
import { ToastContainer, toast } from "react-toastify"
import { current } from "@reduxjs/toolkit"
import { validateObj } from "../../../interfaces/utils/validateObject"



const EventBody = (props:{event:Event_Model,position:number,onChange :any})=>{
    const [formData,setFormData] = useState<Event_Model|void>()
    const [venue,setVenue] = useState()
    const [trainer,setTrainers] = useState()
    const dark = useSelector((state:any)=>state.theme.theme)
    const darkText = useSelector((state:any)=>state.theme.inputtext)    
    const enumAudienceType = enumToArray(audienceType)
    const enumRepeat =  enumToArray(repeat)
    const [initailState ,setInitialState] = useState<Event_Model|void>()

    function enumToArray (enumObject: any) {
        return Object.keys(enumObject).map((key) => ({
          id: enumObject[key],
          name: key,
        }));
      };
      


    
    const getVenue = async()=>{
        const venues =await axiosApi.get(utilityApis.listAllVenues)
        console.log(venues.data,'data from front')
        const data =JSON.parse(JSON.stringify(venues.data)).map((item:any)=>{
           return{ name:item.venueName,id:item.venueId}
        })
        setVenue(data)
   }
   const getTrainers =async ()=>{
       const trainers = await axiosApi.get(utilityApis.listActiveTrainers)
       const data =JSON.parse(JSON.stringify(trainers.data)).map((item:any)=>{
           return{ name:item.firstName,id:item.email}
        })
       console.log(data,'trainers')
       setTrainers(data)
   }
   const getStudent =async ()=>{
       const trainers = await axiosApi.get(utilityApis.listActiveTrainers)
       const data =JSON.parse(JSON.stringify(trainers.data)).map((item:any)=>{
           return{ name:item.firstName,id:item.email}
        })
       console.log(data,'trainers')
       setTrainers(data)
   }
   useEffect(()=>{
    console.log(formData,'formData')
   },[formData])
   const handleSaveProgram =async ()=>{
    console.log(formData,'formData')
        if (validateObj.validateObject(initailState,formData)){
            toast.error('no changes to update')
        }
        else {
            const save = await axiosApi.post(adminApis.createEvent,formData)
            console.log(save.data)
            
            if(save.data.status){
                setFormData(save.data)
                toast.success(save.data.message)
                props.onChange(formData)
            }
            else{
                toast.error(save.data.message)
            }
        }
   }


    useEffect(()=>{
        getVenue()
        getTrainers()

    },[])

    useEffect(()=>{
        setFormData({...props.event})
        setInitialState({...props.event})
    },[props])

    const handleChange = (e:any)=>{
        let {name,value} = e.target
        if(name=='prority'){
            e.target.checked? value='high':value='low'
        }
        if(name=='active'){
            e.target.checked? value=true:value=false
        }
        if(name == 'timeFixed')
            e.target.checked ?value = true:value=false
        console.log(e.target,'e.target',name,value, e.target.checked)
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleNewCreation = ()=>{
        console.log(formData,'before clearing all ')
        setFormData({})
       
    }

    
    return(
        <div className="block  xl:flex w-full       ">
            <ToastContainer/>   
            <div className=" flex flex-col w-full xl:w-1/2 ">
                <div className='w-full flex m-1   p-2 items-center justify-between   h-[70px]'>
                    <label className=' w-2/4 h-full align-middle items-center ' htmlFor="">Event Name </label>
                    <div className={`w-2/4 uppercase  border-none h-full flex  ${darkText}`}>
                        <input name="eventName"  onChange={handleChange} className={`${dark} w-full border rounded border-gray-300 `} value={formData?.eventName?formData?.eventName:''}   />                   
                    </div>
                </div>

                <div className='w-full flex m-1   p-2 items-center justify-between   h-100'>
                    <label className=' w-2/4 h-100' htmlFor="">Cordinator  </label>
                    <div className='justify-between align-middle w-2/4  '>
                          {trainer? <DropdownMenu name='staffInCharge' value={formData?.staffInCharge  ? formData?.staffInCharge : ''} onChange={handleChange} items={trainer} />:''}  
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Repeat  </label>
                    <div className={`${dark} justify-between align-middle w-2/4`}>
                        {enumRepeat? <DropdownMenu name='repeat' value={formData?.repeat  ? formData?.repeat : ''} onChange={handleChange} items={enumRepeat} />:''}
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Location  </label>
                    <div className='justify-between align-middle w-2/4  '>
                        {venue? <DropdownMenu name='location' value={formData?.location  ? formData?.location : ''} onChange={handleChange} items={venue} />:''}
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Audiance    </label>
                    <div className='justify-between align-middle w-2/4  '>
                        {venue? <DropdownMenu name='audienceType' value={formData?.audienceType  ? formData?.audienceType : ''} onChange={handleChange} items={enumAudienceType} />:''}
                    </div>
                </div>
            </div>
            <div className=" block w-full xl:w-1/2 p-2 ">
             
                <div className='w-full xl:block flex m-1    p-2 items-center justify-between   h-100 '>
                    <div className="flex items-center">
                        <label className=' w-2/4 h-100' htmlFor="">Fixed Time  </label>
                        <div className='justify-between flex align-middle w-2/4 items-center  '>
                            NO
                            <Switch name="timeFixed" checked={formData?.timeFixed ?true:false} onChange={(e)=>handleChange(e)} />
                            YES
                        </div>

                    </div>
                   
                    <div className="flex items-center">
                        <label className=' w-2/4 h-100' htmlFor="">priority    </label>
                        <div className='justify-between flex align-middle w-2/4 items-center '>
                            LOW 
                            <Switch name="prority"  checked={formData?.prority=='high'?true:false}  onChange={(e)=>handleChange(e)} />
                            HIGH    
                            </div>
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Start Time  </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="time" name="startDateTime" value={formData?.startDateTime as string} id="" />
                    <label className=' w-2/4 h-100' htmlFor="">End Time  </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="time" name="endDateTime" value={formData?.endDateTime as string } id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <div className="flex xl:w-2/4 items-center ">
                        <label className=' w-2/4 h-100' htmlFor="">Active    </label>
                        <div className='justify-between flex align-middle w-2/4 items-center '>
                            <Switch name="active" checked={formData?.active} onChange={(e)=>handleChange(e)} />
                        </div> 
                    </div>       
                    { formData?.active? (
                    <div className="flex xl:w-2/4 items-center   justify-between">
                        <label className=' w-2/4 h-full align-middle items-center ' htmlFor="">Start Date </label>
                        <div className={`w-2/4 uppercase  border-none h-full flex  ${darkText}`}>
                            <input  type="date" onChange={handleChange} name="startDate" className={`${dark} w-full   rounded border-gray-300 `} value={formData?.startDate?.split('T')[0] } id="outlined-basic"    />                   
                        </div>
                    </div>) :''}        
                </div>
                
               
                
                <div className='w-full block m-1   p-2 items-center justify-between  '>
                    <label className=' w-full h-full align-middle items-center ' htmlFor="">Summary </label>
                    <div className={`w-full h-100 border-none h-full flex  ${darkText}`}>
                        <textarea  onChange={handleChange} className={`${dark} w-full     rounded  `} name="description" value={formData?.description}    />                   
                    </div>
                </div>

                <div className='w-full flex flex-wrap m-1    p-2 items-center justify-end   h-[70px]'>
                <button onClick={handleNewCreation} className=" h-10 w-1/6 shadow-sm m-1 rounded-md items-center bg-green-800"> new </button>
                    <button onClick={handleSaveProgram} className=" h-10 w-1/6 shadow-sm m-1 rounded-md items-center bg-blue-300"> save </button>
                    <button className=" h-10 w-1/6 shadow-sm m-1 rounded-md items-center bg-gray-400 "> Cancel </button>
                </div>

            </div>
        </div>
    )
}

export default EventBody