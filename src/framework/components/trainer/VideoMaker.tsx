
import { useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from "react-webcam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { BsFillFloppyFill } from "react-icons/bs";

import { faStop } from '@fortawesome/free-solid-svg-icons';
import uploadVideo from '../../services/saveVideo';
const VideoMaker = (props:any) => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl  
  } = useReactMediaRecorder({ video: true });
  const [stream, setStream] = useState<MediaStream | null>(null);
  const requestCameraPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      
    } catch (error) {
      console.error('Camera permission denied:', error);
      // Handle permission denial gracefully (e.g., display an error message)
    }
  };
  const handleRecording = ()=>{
    startRecording()
    requestCameraPermission();
   
  } 
  const handleStopRecording = ()=>{
    stopRecording()
     console.log(status,'staus')
  }
  const saveAudio =async  ()=>{
    const video = await uploadVideo(MediaStream)
    console.log(video,'xxaxaaxa ')
    const e={target:{
        name:'videolink',
        value:video
    }}
    props.onChange(e)
  }

  return (
    <div className='h-full w-[100%] rounded-xl  overflow-hidden  '>
        <div className='xl:w-2/4   bg-transparent '>
        {mediaBlobUrl && status !== 'recording'? <video className='w-full' src={mediaBlobUrl} controls autoPlay loop /> 
        :mediaBlobUrl && status === 'recording' ? <Webcam style={{width:'100%',border: '5px solid black'  }} /> : <Webcam  /> }
        
        <div className='flex justify-center '> {status === 'idle' ? <button className=' h-[100px] w-30   bg-transparent rounded-full  text-red-600  ' onClick={handleRecording }> <FontAwesomeIcon icon={faCircleDot} style={{ height: '40px', width: '40px' }} /> </button>: status === 'recording' ? <button onClick={handleStopRecording}><FontAwesomeIcon icon={faStop} style={{ height: '40px', width: '40px' }} /></button>: <div className='flex  items-center justify-center '> <button className=' h-[100px] w-30    bg-transparent rounded-full  text-red-600  ' onClick={handleRecording }> <FontAwesomeIcon icon={faCircleDot} style={{ height: '40px', width: '40px' }} /> </button> <button onClick={saveAudio}  className="rounded  shadow-sm m-2 p-4 w-20     h-full   text-blue-500 hover:border-blue-400    "><BsFillFloppyFill style={{height:'40px',width:'40px'}}/> </button> </div>} </div>
        {/* {status === 'recording' ? <button onClick={handleStopRecording}><FontAwesomeIcon icon={faStop} style={{ height: '40px', width: '40px' }} /></button>: <button className=' h-[100px] w-30 border bg-transparent rounded-full  text-red-600  ' onClick={handleRecording }> <FontAwesomeIcon icon={faCircleDot} style={{ height: '40px', width: '40px' }} /> </button>} */}
        </div>
    </div>
  );
};

export default VideoMaker;
