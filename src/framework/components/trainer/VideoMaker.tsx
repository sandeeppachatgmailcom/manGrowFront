

import { useState } from 'react';
// import VideoRecorder from 'react-video-recorder'



// const startRecording =async ()=>{
  
// let recorder = new RecordRTCPromisesHandler(stream, {
//     type: 'video'
// });
// recorder.startRecording();

// const sleep = m => new Promise(r => setTimeout(r, m));
// await sleep(3000);

// await recorder.stopRecording();
// let blob = await recorder.getBlob();
// invokeSaveAsDialog(blob);
// }



const VideoMaker = () =>{
  const [vid,setVid] = useState<any>(null)
  const loadVid = async()=>{
    console.log("stream")
    let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    console.log(stream)
    setVid(stream)
  }
  return(
  //   <div className='flex '>
  //     <VideoRecorder key={'i'} 
  //   onRecordingComplete={(videoBlob:any) => {
  //     // Do something with the video...
  //     console.log('videoBlob', videoBlob)
  //   }}
  // />
  
  //   </div>
  <div className="">
    {
      vid && <>
      <video controls src={vid} height={360} width={200}></video>
    
      </>
    }
    <button onClick={()=>{loadVid()}}>play</button>
  </div>
  )
}
export default VideoMaker

