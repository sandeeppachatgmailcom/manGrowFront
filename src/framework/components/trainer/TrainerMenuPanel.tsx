const TrainerMenuPanel=()=>{

    return(
        <div className="w-full   flex rounded-md  shadow-inner shadow-gray-300 justify-end">
             <button className="border  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-md   " > All </button>
             <button className="border  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-md   " > pending </button>
             <button className="border  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-md   " > Approval </button>
             <button className="border  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-md   " > rate </button>
        </div>
    )
}

export default TrainerMenuPanel

