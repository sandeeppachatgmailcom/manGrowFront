import React, { useRef, useState } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';
import Webcam from "react-webcam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { BsFillFloppyFill } from "react-icons/bs";
import { faStop } from '@fortawesome/free-solid-svg-icons';
import uploadVideo from '../../services/saveVideo';

const VideoMakerexpired = (props) => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ video: true });
  const webcamRef = useRef(null);
  const [stream, setStream] = useState(null);

  const requestCameraPermission = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (error) {
      console.error('Camera permission denied:', error);
      // Handle permission denial gracefully (e.g., display an error message)
    }
  };
  const [videoChunks, setVideoChunks] = useState([]);
  const [capturedVideo, setCapturedVideo] = useState('');
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const handleStartRecording = async () => {
    
    const stream = webcamRef.current.stream;
    const options = { mimeType: 'video/webm; codecs=vp9' };
    const recorder = new MediaRecorder(stream, options);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setVideoChunks((prev) => [...prev, event.data]);
      }
    };

    recorder.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
      const videoUrl = URL.createObjectURL(videoBlob);
      setCapturedVideo(videoUrl);
    };

    setMediaRecorder(recorder);
    setVideoChunks([]);
    recorder.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorder.stop();
    setRecording(false);
  };









  // const handleRecording = () => {
  //   requestCameraPermission();
  //   startRecording();
  // };

  // const handleStopRecording = () => {
  //   stopRecording();
  //   console.log(status, 'status');
  // };

  const saveVideo = async () => {
    console.log(webcamRef.current,'mediaBlobUrl')
    if (mediaBlobUrl) {
      const video = await uploadVideo(mediaBlobUrl);
      console.log(video, 'xxaxaaxa');
      const e = {
        target: {
          name: 'videolink',
          value: video
        }
      };
      props.onChange(e);
    }
  };

  return (
    <div className="h-[400px]  w-full rounded-xl ">
      <div className="h-full w-full  bg-transparent  relative">
        {mediaBlobUrl && status !== 'recording' ? (
          <video className="absolute top-0 left-0 rounded-xl border-4 border-slate-300 bg-green-400 h-full w-full object-cover" src={mediaBlobUrl} controls autoPlay loop />
        ) : (
         <div className=" rounded-md overflow-hidden  object-contain  ">
           <Webcam audio={false}  ref={webcamRef} className="relative rounded-xl border-4 border-gray-500 shadow-2xl  bg-blue-200  top-0 left-0  w-full object-fill  " />
        </div>
        )}
        
        <div className="flex justify-center absolute bottom-4 w-full">
          {status === 'idle' ? (
            <button className="h-[100px] w-30 bg-transparent rounded-full text-yellow-600" onClick={handleStartRecording}>
              <FontAwesomeIcon icon={faCircleDot} style={{ height: '40px', width: '40px' }} />
            </button>
          ) : status === 'recording' ? (
            <button onClick={handleStopRecording}>
              <FontAwesomeIcon className='text-yellow-400' icon={faStop} style={{ height: '40px', width: '40px',marginBottom:'30px' }} />
            </button>
          ) : (
            <div className="flex items-center justify-center">
              <button className="h-[100px] w-30 bg-transparent rounded-full text-blue-400" onClick={handleStartRecording}>
                <FontAwesomeIcon icon={faCircleDot} style={{ height: '40px', width: '40px' }} />
              </button>
              <button onClick={saveVideo} className="rounded shadow-sm m-2 p-4 w-20 h-full text-blue-500 hover:border-blue-400">
                <BsFillFloppyFill style={{ height: '40px', width: '40px' }} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoMakerexpired;
