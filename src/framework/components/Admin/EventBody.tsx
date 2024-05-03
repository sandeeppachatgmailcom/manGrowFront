import { useEffect, useState } from "react"
import { Event_Model } from "../../../entity/components/admin/events"
import { useSelector } from "react-redux"
import DropdownMenu from "../utilComponents/DropdownMenu"
import axiosApi from "../../../api/axios"
import { utilityApis } from "../../../api/api"
import Switch from '@mui/material/Switch';
import MuiBasicSelect from "../MUI Component/SelectBox"
import { TextField } from "@mui/material"
import { repeat } from "../../../entity/components/admin/enum"


const EventBody = (props:{event:Event_Model})=>{
    const [formData,setFormData] = useState<Event_Model|void>()
    const darkText = useSelector((state:any)=>state.theme.theme)
    const [venue,setVenue] = useState()
    const [trainer,setTrainers] = useState()
    
    function* generateOptions (opt){
        for (let key in opt){
            yield {name:key,id:opt[key]}
        }
    }
    console.log( [...generateOptions(Option) ],'sample' )
    const repeatOption = [...generateOptions(Option) ]
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

    useEffect(()=>{
        getVenue()
        getTrainers()

    },[])
    useEffect(()=>{
        setFormData({...props.event})
    },[props])

    const handleChange = (e:any)=>{
        let {name,value} = e.target
        if(name=='prority'){
            e.target.checked? value='high':value='low'
        }
        console.log(e.target,'e.target',name,value, e.target.checked)
        setFormData({
            ...formData,
            [name]:value
        })
    }

    
    return(
        <div className="block  xl:flex w-full border     ">
            <div className=" flex flex-col w-full xl:w-1/2 ">
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100'>
                    <label className=' w-2/4 h-100' htmlFor="">Event Name </label>
                    <div className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`}>
                        <TextField value={formData?.eventName} id="outlined-basic" label="Outlined" variant="outlined" />                   
                    </div>
                </div>

                <div className='w-full flex m-1   p-2 items-center justify-between   h-100'>
                    <label className=' w-2/4 h-100' htmlFor="">Cordinator  </label>
                    <div className='justify-between align-middle w-2/4  '>
                          {trainer? <MuiBasicSelect name='staffInCharge' value={formData?.staffInCharge  ? formData?.staffInCharge : ''} onChange={handleChange} items={trainer} />:''}  
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Repeat  </label>
                    <div className='justify-between align-middle w-2/4  '>
                        {repeatOption? <MuiBasicSelect name='repeat' value={formData?.repeat  ? formData?.repeat : ''} onChange={handleChange} items={repeatOption} />:''}
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Location  </label>
                    <div className='justify-between align-middle w-2/4  '>
                        {venue? <MuiBasicSelect name='location' value={formData?.location  ? formData?.location : ''} onChange={handleChange} items={venue} />:''}
                    </div>
                </div>
            </div>
            <div className=" block w-full xl:w-1/2 ">
            <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Event Name </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={formData?.eventName} id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Fixed Time  </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={formData?.eventName} id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Start Time  </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={formData?.eventName} id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">End Time  </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={formData?.eventName} id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Task Assigned   </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={formData?.eventName} id="" />
                </div>
                
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Audiance    </label>
                    <input className={`w-2/4 uppercase  border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={formData?.eventName} id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">priority    </label>
                    <Switch name="prority" value={formData?.prority} onChange={(e)=>handleChange(e)} />
                </div>
            </div>
        </div>
    )
}

export default EventBody