import { useSelector } from "react-redux"
import DropdownMenu from "../utilComponents/DropdownMenu";  
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import React, {  useEffect, useState } from "react";
import { BatchComponent } from "../../../entity/components/admin/Batch";
type props ={
    activebatchs:BatchComponent 
}


const Batch = ({activebatchs}:props) => {
    
    const darkTheme = useSelector((state:any) => state.theme.theme)
    const darkText = useSelector((state:any) => state.theme.inputtext)
    

    const [activebatch, setActivebatch] = useState <BatchComponent> (props)
   
    const handleChange = (e:any): void => {
        let { name , value } :{name:any ,value:any } = e.target;
        value=='true'?value=true:value=false;
        setActivebatch({
          ...activebatch as any,
          [name]: value
        });
      };



      useEffect(()=>{
        console.log(activebatch,'activeBatch')
      },[activebatch])

    useEffect(() => {
        setActivebatch(props)
    }, [props])

    return (
        <div className='xl:flex w-full h-[100%] rounded rounded-e-xl border md:block  border-gray-300  border-opacity-45 '>
            {
                Object.keys(activebatch).length ?
                    <>
                        <div className={`xl:w-3/6  sm:w-full md:w-full lg:w-full w-3/6  block ${darkTheme} m-1 rounded-xl  justify-between   `}>
                            <div className='w-2/4 flex m-1 h-[40px] items-center '>
                                <label className=' w-2/4' htmlFor="">Batch </label>
                                
                                <input className={`w-2/4  ${darkText}`} onChange={handleChange} type="text" name="name" value={activebatch.batchName} id="" />
                            </div>
                            <div className='w-2/4 flex m-1 h-[40px] items-center'>
                                <label className=' w-2/4' htmlFor="">Start Date </label>
                                <input className={`w-2/4  ${darkText}`} onChange={handleChange}  type="date" name="startDate" value={activebatch?.startDate} id="" />
                            </div>
                            <div className='w-2/4 flex m-1 h-[40px] items-center'>
                                <label className=' w-2/4' htmlFor="">End Date Date </label>
                                <input className={`w-2/4  ${darkText}`} onClick={() => { }} onChange={handleChange}  type="date" name="endDate" value={activebatch.endDate} id="" />
                            </div>
                            <div className='w-2/4 flex m-1 h-[40px] items-center'>
                                <label className=' w-2/4' htmlFor="">Max Student </label>
                                <input className={`w-2/4  ${darkText}`} onClick={() => { }} onChange={handleChange}  type="number" name="MaxStdCount" value={activebatch.maxCapacity} id="" />
                            </div>
                            <div className='w-2/4 flex m-1 h-[40px] items-center'>
                                <label className=' w-2/4' htmlFor="">Location </label>
                                <div className='justify-between align-middle  '>
                                    <DropdownMenu name='venue' value={activebatch?.venue  ? activebatch?.venue : 'select'} onChange={handleChange} items={[{ name: 'Kinfra Park', id: 'TY0001' }, { name: 'Banglore', id: 'TR0002' }, { name: 'Kochin', id: 'TR0002' }]} />
                                </div>
                            </div>

                        </div>
                    </> : null
            }
            <div className={`xl:w-3/6  sm:w-full md:w-full lg:w-full block ${darkTheme} m-1 rounded-xl  justify-between   `}>
                <div className='w-2/4 flex m-1 h-[40px] items-center'>
                    <label className=' w-2/4' htmlFor="">Type </label>
                    <div className='justify-between align-middle  '>
                        <DropdownMenu name='type' onChange={handleChange}  value={activebatch.BatchType ? activebatch?.BatchType : 'Remote'}  items={[{ name: 'Remote', id: 'TY0001' }, { name: 'BroCamp', id: 'TR0002' }]} />
                    </div>
                </div>
                <div className='w-3/4  flex m-1 h-[40px] items-center'>
                    <label className=' w-2/4' htmlFor="">Status {activebatch.active ? 'Active' : 'Dead'} </label>
                    <div className='justify-between w-full align-middle'> {/* Adjust width here */}
                        {activebatch.active ? (
                            <div className="justify-center flex w-[75px] h-[30px] rounded-full border items-center "> {/* Adjust width, height, and padding here */}
                            <button
                                onClick={handleChange}
                                name="active"
                                value={!activebatch.active}
                                className="text-orange-600 flex justify-center rounded rounded-s-full items-center  w-24 h-full "
                            >
                                <MdOutlineRadioButtonChecked />
                            </button>
                            <button disabled className="flex justify-center bg-blue-600 w-24 h-full items-center    text-white rounded rounded-r-full">
                                <MdOutlineRadioButtonChecked />
                            </button>
                            </div>
                        ) : (
                            <div className="justify-center flex w-[75px] h-[30px] rounded-full border items-center   "> {/* Adjust width, height, and padding here */}
                            <button disabled className="bg-orange-600 flex justify-center items-center  text-gray-100 rounded rounded-s-full w-24 h-full">
                                <MdOutlineRadioButtonChecked />
                            </button>
                            <button
                                onClick={handleChange}
                                name="active"
                                value = {true}
                                className="text-blue-600 flex justify-center rounded items-center  rounded-r-full w-24 h-full"
                            >
                                <MdOutlineRadioButtonChecked />
                            </button>
                            </div>
                        )}
                        </div>
                </div>
                 
                <div className='w-full flex m-1 h-[40px] items-center align-middle text-start justify-between'>
                    <label className=' w-1/4' htmlFor="">Trainer </label>
                    <div className='w-3/4 m-2 justify-between align-middle '>
                        <DropdownMenu name='trainer' onChange={handleChange} value ={activebatch.trainer} items={[{ name: 'Andrea Netto', id: 'TR0010' }, { name: 'Rizwan Akma', id: 'TR0009' }, { name: 'Swetha Raja', id: 'Tr0001' }, { name: 'Suny Raja', id: 'TR0002' }, { name: 'Adithya Birla', id: 'TR0003' }]} />
                    </div>
                </div>
                <div className='w-full flex m-1 h-[40px] items-center align-middle text-start justify-between'>
                    <label className=' w-1/4' htmlFor="">Cordinator </label>
                    <div className='w-3/4 m-2 justify-between align-middle '>
                        <DropdownMenu name='Cordinator' onChange={handleChange}  value={activebatch.cordinator} items={[{ name: 'Andrea Netto', id: 'TR0010' }, { name: 'Rizwan Akma', id: 'TR0009' }, { name: 'swetha Ramesh', id: 'Tr0001' }, { name: 'Suny Raja', id: 'TR0002' }, { name: 'Adithya Birla', id: 'TR0003' }]} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Batch