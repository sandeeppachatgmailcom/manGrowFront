import { TrainerMenuPanel_Component } from "../../../entity/components/trainer/trainerMenuPanel"

const TrainerMenuPanel=(_props:TrainerMenuPanel_Component)=>{

    return(
        <div className="w-full   flex rounded-md    shadow-gray-300 justify-end">
             <button className="  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400   " > All </button>
             <button className="  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400   " > pending </button>
             <button className="  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400   " > Approval </button>
             <button className="  m-1 rounded-md p-1 w-[100px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400   " > rate </button>
        </div>
    )
}

export default TrainerMenuPanel

