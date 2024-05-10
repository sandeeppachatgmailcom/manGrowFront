import { useState } from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import { BsFillFloppyFill } from "react-icons/bs";
import uploadAudio from '../../services/saveAudio';
export default function VoiceRecorder(props:any) {
  const [recordings, setRecordings] = useState([]); // Array to store audio recordings

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const handleRecordComplete = (blob : any) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;

    setRecordings((prevRecordings:any ) => [{ audio, blob }]); // Add recording to state
  };

  const handleDeleteRecording = (index) => {
    setRecordings((prevRecordings) => {
      const updatedRecordings = [...prevRecordings]; // Copy array to avoid mutation
      URL.revokeObjectURL(updatedRecordings[index].audio.src);
      updatedRecordings.splice(index, 1); // Remove recording at specified index

      // Clean up memory associated with the deleted recording (optional)
      // Release the created URL

      return updatedRecordings;
    });
  };

  const saveAudio =async  ()=>{
    const audio = await uploadAudio(recordings[0])
    console.log(audio,'aaaaaaaaaaaaaaaaaaaaaaaa')
    const e={target:{
        name:'audioLink',
        value:audio
    }}
    props.onChange(e)
  }

  return (
    <div className="flex align-middle p-1    border-blue-600 " id="audio">
      {recordings.map((recording, index) => (
        <div key={index} className="recording-item me-1 shadow-md shadow-gray-100 rounded-full  ">
          <audio src={recording.audio.src} controls />
          {/* <button onClick={() => handleDeleteRecording(index)}>Delete</button> */}
        </div>
      ))}
      <AudioRecorder 
        onRecordingComplete={handleRecordComplete}
        recorderControls={recorderControls}
        showVisualizer={true}
      />{recordings.length? <button onClick={saveAudio}  className="ms-1 flex justify-evenly rounded-full shadow-md shadow-gray-100 items-center  border bg-gray-100 text-black  w-10      w-30  hover:border hover:border-blue-400 hover:text-blue-500   "><BsFillFloppyFill /> </button>:''}
    </div>
  );
}
