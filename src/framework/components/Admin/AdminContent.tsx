import { useState } from 'react'
import { useSelector } from 'react-redux'
import DropdownMenu from '../utilComponents/DropdownMenu' 
import Batch from './Batch'
import { BatchComponent } from '../../../entity/components/admin/Batch'
const AdminContent :React.FC<{}> = () => {
    const darkTheme = useSelector((state:any ) => state.theme.theme)
    
    const [batch, setBatch] = useState<BatchComponent[]> ([
        { batchName: 'batch1', BatchType:'Remote', venue: 'Kinfra Park', batchId: '00001',  active: false, deleted: false, maxCapacity: 50, trainer: 'Suny Raja', cordinator: 'Andrea Netto', },
        { batchName: 'batch2', BatchType:'BroCamp', venue: 'Kinfra Park', batchId: '00002',  active: true, deleted: false, maxCapacity: 50, trainer: 'Suny Raja', cordinator: 'Rizwan Akma', },
        { batchName: 'batch3', BatchType:'Remote', venue: 'Kinfra Park', batchId: '00003',  active: true, deleted: false, maxCapacity: 10, trainer: 'Swetha Raja', cordinator: 'Suny Raja', },
        { batchName: 'batch4', BatchType:'BroCamp', venue: 'Banglore', batchId: '00004',  active: false, deleted: false, maxCapacity: 20, trainer: 'Andrea Netto', cordinator: 'Swetha Raja', },
        { batchName: 'batch5', BatchType:'Remote', venue: 'Banglore', batchId: '00005',  active: true, deleted: false, maxCapacity: 6, trainer: 'Swetha Raja', cordinator: 'Rizwan Akma', },
        { batchName: 'batch6', BatchType:'Remote', venue: 'Banglore', batchId: '00006',  active: false, deleted: false, maxCapacity: 70, trainer: 'Andrea Netto', cordinator: 'Swetha Raja', },
        { batchName: 'batch7', BatchType:'BroCamp', venue: 'Kochin', batchId: '00007',  active: false, deleted: true, maxCapacity: 80, trainer: 'Andrea Netto', cordinator: 'Rizwan Akma', },
        { batchName: 'batch8', BatchType:'Remote', venue: 'Kochin', batchId: '00008',  active: false, deleted: false, maxCapacity: 70, trainer: 'Swetha Raja', cordinator: 'Swetha Raja', },
        { batchName: 'batch9', BatchType:'BroCamp', venue: 'Kinfra Park', batchId: '00009',  active: false, deleted: false, maxCapacity: 10, trainer: 'Suny Raja', cordinator: 'Swetha Raja', },])

    const [menu, setMenu] = useState<string>('')
    const [page, setPage] = useState(1)
    const [activebatch, setActiveBatch] = useState<BatchComponent>({
        batchName: '',
        venue: ' ',
        batchId:'',
        active: false,
        deleted: false,
        trainer: '',
        cordinator: '',
        BatchType:'',
        edited:false,
        location:'',
        maxCapacity:0
    })
     
    return (
        <div className={`${darkTheme} flex  w-full border rounded-xl`}>
            <div className='w-1/6 m-1 rounded block '>
                <div className='w-full  h-[290px] m-1 rounded block' >
                    {batch.map((item, index) => {
                        if (index < page * 5 && index >= (page - 1) * 5) return <button onClick={    () =>{  setMenu(item?.batchName as string);   setActiveBatch(item)}} className={menu == item.batchName ? 'w-5/6 font-bold text-blue-800 rounded-e-full bg-blue-200 flex m-1 rounded h-[50px] justify-start p-2 items-center ' : 'rounded-e-full justify-start p-2 items-center bg-blue-000 flex m-1 rounded h-[50px]'} key={item.batchName} > {item?.batchName?.toUpperCase()} </button>
                    })}
                    
                </div>
                
                <div className='flex  bottom-0 start-0' >
                        {(() => {
                            const count = Math.ceil(batch.length / 5)
                            let outArray = []
                            for (let i = 1; i <= count; i++) {
                                outArray.push(<button  key={i} onClick={() => setPage(i)} className='ms-1 border rounded font-semibold text-blue-400 w-5' >{i}</button>)
                            }
                            return outArray
                        }
                        )()
                        }
                </div>
                
            </div>
            <div className='w-5/6    '>
                { menu==activebatch?.batchName? <Batch activebatchs ={activebatch  } />:''} 
            </div>
        </div>
    )
}


export default AdminContent
