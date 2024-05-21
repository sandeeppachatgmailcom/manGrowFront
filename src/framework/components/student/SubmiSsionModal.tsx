import { Task_model } from "../../../entity/response/task_model";
import TextEditor from "../trainer/TextEditor";
import VedioRecorder from "../trainer/VideoRecorder";
import VideoMaker from "../trainer/VideoMaker"
import VoiceRecorder from "../trainer/VoiceRecorder"
import { FaPowerOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserEntity_Model } from "../../../entity/response/userModel";
import { login } from "../../ReduxStore/activeUser";
import axiosApi from "../../api/axios";
import { userApi } from "../../../entity/constants/api";
import GeneralTask from "../trainer/generalTaskSubmisssion";
import { ToastContainer, toast } from "react-toastify";


const SubmiSsionModal = ({ ScheduledTaskID, task, onclose,studentSubMission }: { ScheduledTaskID: string, task: Task_model, onclose: any ,studentSubMission:any}) => {

  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const user = useSelector((state) => state.activeUser.user)
  
   
  
  
  
  useEffect(() => {
     
    const taskId = task?.taskId;
    const scheduledTask = user?.submission?.[ScheduledTaskID]?.[taskId]?.[0]?user?.submission?.[ScheduledTaskID]?.[taskId]?.[0]:{};

    setFormData({
      ...task,
      tasklink: scheduledTask ? scheduledTask?.tasklink : ''
    })
  }, [task])
  useEffect(() => {
    // !tempUser.submission ?  tempUser?.submission[ScheduledTaskID] = tempsubmission
     console.log(formData, 'formData')
  }, [formData])


  const handleTaskChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }


  const onSaveClick = async () => {
    const tempsubmission = {
      taskName: task.taskName,
      taskSub: task.taskSub,
      taskType: task.taskType,
      tasklink: formData?.tasklink,
      taskId: task.taskId,
      submissionDate:task.subMissionDate ,
      submittedDate:task.taskDate ,
      mark : {
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true,
        "7": true,
        "8": true,
        "9": true,
        "10": true,
      },
      comment:'',
    }
    
    const tempUser: UserEntity_Model | any = JSON.parse(JSON.stringify(user))
    if (!tempUser.submission) { tempUser.submission = {};  }
    if (!tempUser.submission[ScheduledTaskID]) tempUser.submission[ScheduledTaskID] = {}
    if (!tempUser.submission[ScheduledTaskID][task.taskId]) { console.log( tempUser ,'first'), tempUser.submission[ScheduledTaskID][task.taskId] =  []   };
    if (task?.taskId == tempsubmission.taskId) tempUser.submission[ScheduledTaskID][task?.taskId][0]=tempsubmission;
    
    dispatch(login(tempUser))
    
    const saveuser = await axiosApi.post(userApi.saveBasicProfile,tempUser)
    console.log(saveuser,'saved result') 
    if(saveuser.data.status){
       const mess=   toast.success(saveuser.data.message)
    }
    const data = user.subMission ? user.subMission : {}

  }

   


  return (
    <div className={`fixed inset-0 z-50 overflow-auto   flex justify-center items-center`}>
      <ToastContainer  />
      <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-55"></div>

      <div className="     mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content  py-4 text-left px-6">
          <div className="flex  justify-between items-center pb-3">
            <div className=" justify-center  items-center h-full">
              <h1 className='text-2xl text-white' >Submission is on progress !!! </h1>
              <div className="bg-gray-800 rounded-xl p-3 bg-opacity-50 text-white">
                <div className="flex  justify-end">
                  <button onClick={() => onclose(false)} > <FaPowerOff className=" h-5 m-3 text-blue-500 w-5" /> </button>
                  <div className="animate-spin -z-10 rounded-full h-10 w-10 border-t-2 absolute  border-b-3 border-white">
                  </div>
                </div>
                <div className="flex items-center"> <h1 className="font-bold text-2xl " >{task.taskName} </h1> <small className="  " >{task.taskType}</small> </div>
                <h1 className="  " >{task.taskSub}</h1>
                <h1 className="font-semibold  " >{task.taskDiscription} </h1>
                <h1 className="  " >{task.taskLink} </h1>
                <h1 className=" " >{task.validateBy}</h1>
              </div>


              <div className="flex w-[500px]   rounded-full">
                {
                  // task?.taskType == "writing" ?<TextEditor  style={{height:'300px'}}  value={task?.description}  />  :
                  task?.taskType == "writing" ? <GeneralTask name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick}   value={formData.tasklink}  /> :
                    task?.taskType == "listening" ? <GeneralTask name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick}   value={formData.tasklink}   /> :
                      task?.taskType == "Speaking" ?  <GeneralTask name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick}   value={formData.tasklink}   /> :
                        task?.taskType == "OneToOne" ?  <GeneralTask name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick}   value={formData.tasklink}   /> : ''
                }
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}


export default SubmiSsionModal
