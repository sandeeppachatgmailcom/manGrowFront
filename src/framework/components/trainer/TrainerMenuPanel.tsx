const TrainerMenuPanel=()=>{

    return(
        <div className="w-full flex rounded-md border border-blue-600 justify-end">
             <button className="border  m-1 rounded-sm p-1 w-[100px] h-[50px] shadow-md  overflow-hidden " > All </button>
             <button className="border  m-1 rounded-sm p-1 w-[100px] h-[50px] shadow-md  overflow-hidden " > pending </button>
             <button className="border  m-1 rounded-sm p-1 w-[100px] h-[50px] shadow-md  overflow-hidden " > Approval </button>
             <button className="border  m-1 rounded-sm p-1 w-[100px] h-[50px] shadow-md  overflow-hidden " > rate </button>
        </div>
    )
}

export default TrainerMenuPanel

